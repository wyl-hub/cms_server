const jwt = require('jsonwebtoken')
const loginService = require('../service/login')
const { throwError } = require('../utils/error')
const PRIVATE_KEY = 'wyl'

class Login {
    // 登陆 校验账号密码是否正确
    async login(ctx, next) {
        const user = ctx.request.body
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

    async getMenus(ctx, next) {
        const result = await loginService.getMenus()
        const menus = result.filter(item => !item.parentId).map(item => ({
            id: item.id,
            title: item.title,
            icon: item.icon,
            type: item.type,
            url: item.url
        }))
        const childrenMenus = result.filter(item => item.parentId)
        childrenMenus.forEach(item => {
            const pId = item.parentId
            let parentItem = null
            menus.some(p => {
                if (p.id === pId) {
                    parentItem = p
                    return true
                }
            })
            if (parentItem) {
                if (parentItem.children) {
                    parentItem.children.push({
                        id: item.id,
                        title: item.title,
                        icon: item.icon,
                        type: item.type,
                        url: item.url
                    })
                } else {
                    parentItem.children = [{
                        id: item.id,
                        title: item.title,
                        icon: item.icon,
                        type: item.type,
                        url: item.url
                    }]
                }
            }
        })
        ctx.menus = menus
        next()
    }
}

module.exports = new Login()