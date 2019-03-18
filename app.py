import tornado.ioloop
import tornado.web
import tornado.locks
import tornado.websocket

import os
from tornado.options import define, options


define("port", default=5000, help="run on the given port", type=int)


# Route decorator
class Route(object):
    urls = []

    def __call__(self, url, name=None):
        def _(cls):
            self.urls.append(tornado.web.URLSpec(url, cls, name=name))
            return cls
        return _


route = Route()


@route('/api/auth/login', name='login')
class HomeHandler(tornado.web.RequestHandler):
    '''
    Handler to serve the template/index.html
    '''
    def get(self):
        '''
        HTTP GET Method handler
        '''
        with open("templates/index.html", 'r') as file:
            self.write(file.read())

    def post(self):
        '''
        HTTP POST Method handler
        '''
        pass


@route('/ws', name='websocket')
class EchoWebSocket(tornado.websocket.WebSocketHandler):
    def open(self):
        print("WebSocket opened")

    def on_message(self, message):
        self.write_message(u"You said: " + message)

    def on_close(self):
        print("WebSocket closed")
 
    def check_origin(self, origin):
        return True


async def main():
    tornado.options.parse_command_line()
    app = tornado.web.Application(
        route.urls,
        template_path=os.path.join(os.path.dirname(__file__), "templates"),
        static_path=os.path.join(os.path.dirname(__file__), "static"),
        xsrf_cookies=True,
        cookie_secret="__TODO:_GENERATE_YOUR_OWN_RANDOM_VALUE_HERE__",
        debug=True,
    )
    app.listen(options.port)

    # In this demo the server will simply run until interrupted
    # with Ctrl-C, but if you want to shut down more gracefully,
    # call shutdown_event.set().
    shutdown_event = tornado.locks.Event()
    await shutdown_event.wait()


if __name__ == "__main__":
    tornado.ioloop.IOLoop.current().run_sync(main)