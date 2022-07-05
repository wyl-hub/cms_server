const jwt = require('jsonwebtoken')
const loginService = require('../service/login')
const { throwError } = require('../utils/error')
const PRIVATE_KEY = 'wyl'

class Login {
    // 登陆 校验账号密码是否正确
    async login(ctx, next) {
        const user = ctx.request.body
        console.log('user', user)
        const result = await loginService.checkAccount(user)
        // 如果有结果 代表账号密码正确
        if (result.length > 0) {
            const token = jwt.sign({ ...user }, PRIVATE_KEY, {
                expiresIn: 60 * 60
            })
            ctx.body = {
                result: 'login success',
                token,
                userInfo: {
                    name: user.name,
                    role: 'system'
                }
            }
        } else {
            throwError(500, '用户名或密码错误', ctx)
        }
    }

    // 判断token是否过期
    async verifyToken(ctx, next) {
        const { authorization } = ctx.request.header
        if (!authorization) return throwError(500, '用户未登陆', ctx)
        try {
            const result = jwt.verify(authorization, PRIVATE_KEY)
            ctx.user = result
        } catch {
            return throwError(500, '登陆失效', ctx)
        }
        await next()
    }
}

module.exports = new Login()