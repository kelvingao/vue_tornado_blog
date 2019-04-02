
# MIT License

# Copyright (c) 2019 Kelvin Gao

# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:

# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.

# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.

import os
import aiopg
import logging
import tornado.escape
import tornado.ioloop
import tornado.locks
import tornado.web
import jwt
import json
import psycopg2
import datetime
import bcrypt
import unicodedata
import markdown
import re

from auth import authenticated
from utils import createLogger
from tornado.options import define, options
from time import time as timetime

logger = createLogger(__name__, level=logging.DEBUG)

define("port", default=5000, help="run on the given port", type=int)
define("db_host", default="127.0.0.1", help="blog database host")
define("db_port", default=5432, help="blog database port")
define("db_database", default="blog", help="blog database name")
define("db_user", default="blog", help="blog database user")
define("db_password", default="blog", help="blog database password")

SECRET = 'my_secret_key'


class NoResultError(Exception):
    pass


async def maybe_create_tables(db):
    try:
        with (await db.cursor()) as cur:
            await cur.execute("SELECT COUNT(*) FROM entries LIMIT 1")
            await cur.fetchone()
    except psycopg2.ProgrammingError:
        with open("schema.sql") as f:
            schema = f.read()
        with (await db.cursor()) as cur:
            await cur.execute(schema)


class BaseHandler(tornado.web.RequestHandler):
    def row_to_obj(self, row, cur):
        """Convert a SQL row to an object supporting dict and attribute access."""
        obj = tornado.util.ObjectDict()
        for val, desc in zip(row, cur.description):
            obj[desc.name] = val
        return obj

    async def execute(self, stmt, *args):
        """Execute a SQL statement.

        Must be called with ``await self.execute(...)``
        """
        with (await self.application.db.cursor()) as cur:
            await cur.execute(stmt, args)

    async def query(self, stmt, *args):
        """Query for a list of results.

        Typical usage::

            results = await self.query(...)

        Or::

            for row in await self.query(...)
        """
        with (await self.application.db.cursor()) as cur:
            await cur.execute(stmt, args)
            return [self.row_to_obj(row, cur) for row in await cur.fetchall()]

    async def queryone(self, stmt, *args):
        """Query for exactly one result.

        Raises NoResultError if there are no results, or ValueError if
        there are more than one.
        """
        results = await self.query(stmt, *args)
        if len(results) == 0:
            raise NoResultError()
        elif len(results) > 1:
            raise ValueError("Expected 1 result, got %d" % len(results))
        return results[0]

    # decode token, get user
    async def prepare(self):
        # get_current_user cannot be a coroutine, so set
        # self.current_user in prepare instead.
        try:
            token = self.request.headers['Authorization']
            data = jwt.decode(str(token), 'my_secret_key', algorithm='HS256')
            logger.info('decode token...')
            self.current_user = data['user']
            logger.info('current_user has been set: ' + str(data['user']))
        except Exception as e:
            logger.error(e)
        return None

    async def any_author_exists(self):
        return bool(await self.query("SELECT * FROM authors LIMIT 1"))

    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with, content-type, access-token,authorization")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, DELETE, OPTIONS')
        self.set_header('Access-Control-Allow-Credentials', 'true')
        self.set_header("Access-Control-Expose-Headers", "*")

    def options(self):
        # no body
        self.set_status(204)
        self.finish()


class datetimeJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime.datetime):
            return obj.timestamp()
        return json.JSONEncoder.default(self, obj)


class PostsHandler(BaseHandler):
    async def get(self):
        id = self.get_argument("id", None)
        limit = self.get_argument("per_page", None)
        slug = self.get_argument("slug", None)
        entry = None

        if id:
            entry = await self.queryone("SELECT * FROM entries WHERE id = %s", int(id))
            self.write(json.dumps(entry, cls=datetimeJSONEncoder))

        if slug:
            entry = await self.queryone("SELECT * FROM entries WHERE slug = %s", slug)
            self.write(json.dumps(entry, cls=datetimeJSONEncoder))

        else:
            entries = await self.query(
                f"SELECT * FROM entries ORDER BY published DESC LIMIT { limit }"
            )
            if not entries:
                return

            self.write(json.dumps(entries, cls=datetimeJSONEncoder))

    async def delete(self):
        id = self.get_argument("id", None)
        logger.info(f'delete post of id : {id}')

        if id:
            await self.execute("DELETE FROM entries WHERE id = %s", int(id))

    @authenticated
    async def post(self):
        id = self.get_argument("id", None)

        data = json.loads(self.request.body)

        title = data["title"]
        slug = data["slug"]
        text = data["content"]["rendered"]
        html = markdown.markdown(text)

        if id:
            logger.info('edit post...')
            try:
                entry = await self.queryone(
                    "SELECT * FROM entries WHERE id = %s", int(id)
                )
            except NoResultError:
                raise tornado.web.HTTPError(404)
            slug = entry.slug
            await self.execute(
                "UPDATE entries SET title = %s, markdown = %s, html = %s "
                "WHERE id = %s",
                title,
                text,
                html,
                int(id),
            )
        else:
            logger.info('create post...')
            # slug = unicodedata.normalize("NFKD", title)
            # slug = re.sub(r"[^\w]+", " ", slug)
            # slug = "-".join(slug.lower().strip().split())
            # slug = slug.encode("ascii", "ignore").decode("ascii")
            if not slug:
                slug = "entry"
            while True:
                e = await self.query("SELECT * FROM entries WHERE slug = %s", slug)
                if not e:
                    break
                slug += "-2"
            await self.execute(
                "INSERT INTO entries (author_id,title,slug,markdown,html,published,updated)"
                "VALUES (%s,%s,%s,%s,%s,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)",
                self.current_user['id'],
                title,
                slug,
                text,
                html,
            )
        # self.redirect("/entry/" + slug)


class PostHandler(BaseHandler):
    async def get(self, slug):
        entry = await self.queryone("SELECT * FROM entries WHERE slug = %s", slug)
        if not entry:
            raise tornado.web.HTTPError(404)

        self.write(json.dumps(entry, cls=datetimeJSONEncoder))


class ComposeHandler(BaseHandler):
    @authenticated
    async def post(self):
        id = self.get_argument("id", None)

        title = self.get_argument("title")
        slug = self.get_argument("slug")
        text = self.get_argument("content")
        html = markdown.markdown(text)
        if id:
            logger.info('edit post...')
            try:
                entry = await self.queryone(
                    "SELECT * FROM entries WHERE id = %s", int(id)
                )
            except NoResultError:
                raise tornado.web.HTTPError(404)
            slug = entry.slug
            await self.execute(
                "UPDATE entries SET title = %s, markdown = %s, html = %s "
                "WHERE id = %s",
                title,
                text,
                html,
                int(id),
            )
        else:
            logger.info('new posting...')
            # slug = unicodedata.normalize("NFKD", title)
            # slug = re.sub(r"[^\w]+", " ", slug)
            # slug = "-".join(slug.lower().strip().split())
            # slug = slug.encode("ascii", "ignore").decode("ascii")
            if not slug:
                slug = "entry"
            while True:
                e = await self.query("SELECT * FROM entries WHERE slug = %s", slug)
                if not e:
                    break
                slug += "-2"
            await self.execute(
                "INSERT INTO entries (author_id,title,slug,markdown,html,published,updated)"
                "VALUES (%s,%s,%s,%s,%s,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)",
                self.current_user['id'],
                title,
                slug,
                text,
                html,
            )
        # self.redirect("/entry/" + slug)


class RegisterHandler(BaseHandler):
    async def post(self):
        if await self.any_author_exists():
            raise tornado.web.HTTPError(400, "author already created")

        hashed_password = await tornado.ioloop.IOLoop.current().run_in_executor(
            None,
            bcrypt.hashpw,
            tornado.escape.utf8(self.get_argument("password")),
            bcrypt.gensalt(),
        )
        author = await self.queryone(
            "INSERT INTO authors (email, name, hashed_password) "
            "VALUES (%s, %s, %s) RETURNING id",
            self.get_argument("email"),
            self.get_argument("name"),
            tornado.escape.to_unicode(hashed_password),
        )
        encoded_jwt = jwt.encode({
            'user': {'id': author.id, 'name': author.name},
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)},
            SECRET,
            algorithm='HS256'
        )
        resp = {'token': str(encoded_jwt, encoding='utf-8')}
        self.write(resp)


class LoginHandler(BaseHandler):
    async def post(self):
        try:
            author = await self.queryone(
                "SELECT * FROM authors WHERE email = %s", self.get_argument("email")
            )
        except NoResultError:
            # FIXME: two error
            raise tornado.web.HTTPError(401, "email not found")
        hashed_password = await tornado.ioloop.IOLoop.current().run_in_executor(
            None,
            bcrypt.hashpw,
            tornado.escape.utf8(self.get_argument("password")),
            tornado.escape.utf8(author.hashed_password),
        )
        hashed_password = tornado.escape.to_unicode(hashed_password)

        logger.info('login, author founded')

        if hashed_password == author.hashed_password:
            encoded_jwt = jwt.encode({
                'user': {'id': author.id, 'name': author.name},
                'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)},
                SECRET,
                algorithm='HS256'
            )
            resp = {'token': str(encoded_jwt, encoding='utf-8')}
            self.write(resp)

        else:
            raise tornado.web.HTTPError(401, "password error")


class Application(tornado.web.Application):
    def __init__(self, db):
        self.db = db
        handlers = [
            (r"/login", LoginHandler),
            (r"/register", RegisterHandler),
            (r"/compose", ComposeHandler),
            (r"/posts", PostsHandler),
            (r"/blog/([^/]+)", PostHandler)
        ]
        settings = dict(
            blog_title=u"Tornado Blog",
            template_path=os.path.join(os.path.dirname(__file__), "templates"),
            static_path=os.path.join(os.path.dirname(__file__), "static"),
            xsrf_cookies=False,
            cookie_secret="__TODO:_GENERATE_YOUR_OWN_RANDOM_VALUE_HERE__",
            debug=True,
        )
        super(Application, self).__init__(handlers, **settings)


async def main():
    tornado.options.parse_command_line()

    # Create the global connection pool.
    async with aiopg.create_pool(
        host=options.db_host,
        port=options.db_port,
        user=options.db_user,
        password=options.db_password,
        dbname=options.db_database,
    ) as db:
        await maybe_create_tables(db)
        app = Application(db)
        app.listen(options.port)

        logger.info(f"http://127.0.0.1:{options.port}/")
        logger.info("Press Ctrl+C to quit")

        # In this demo the server will simply run until interrupted
        # with Ctrl-C, but if you want to shut down more gracefully,
        # call shutdown_event.set().
        shutdown_event = tornado.locks.Event()
        await shutdown_event.wait()


if __name__ == "__main__":
    tornado.ioloop.IOLoop.current().run_sync(main)