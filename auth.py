import jwt


def authenticated(func):
    """
    重写tornado authenticated
    :param func:
    :return:
    """

    async def wrapper(self, *args, **kwargs):
        if not self.current_user:
            res_data = {}
            token = self.request.headers.get("token")
            if token:
                try:
                    send_data = jwt.decode(
                        token, self.settings["secret_key"],
                        leeway=self.settings["jwt_expire"],
                        options={"verify_exp": True}
                    )
                    user_id = send_data["id"]

                    # 从数据库中获取到user并设置给_current_user
                    try:
                        user = await self.application.objects.get(
                            User, id=user_id
                        )
                        self._current_user = user

                        result = await func(self, *args, **kwargs)
                        return result
                    except User.DoesNotExist:
                        res_data["content"] = "用户不存在"
                        self.set_status(401)
                except Exception as e:
                    print(e)
                    self.set_status(401)
                    res_data["content"] = "token不合法或已过期"
            else:
                self.set_status(401)
                res_data["content"] = "缺少token"

            self.write(res_data)

    return wrapper
    