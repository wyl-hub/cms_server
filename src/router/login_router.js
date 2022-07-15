const Router = require('koa-router')
const loginController = require('../controller/login')
const loginRouter = new Router({ prefix: '/login' })

const menuList = [
    {
        title: '系统管理',
        type: 1,
        icon: 'Location',
        children: [
            {
                title: '用户管理',
                type: 2,
                icon: '',
                url: '/main/analyse/customer'
            },
            {
                title: '部门管理',
                type: 2,
                icon: '',
                url: '/main/analyse/product'
            }
        ]
    },
    {
        title: 'Home',
        type: 2,
        icon: 'Menu',
        url: '/main/home'
    },
    {
        title: 'Test',
        type: 2,
        icon: 'Menu',
        url: '/main/test'
    }
]
loginRouter.post('/', loginController.login)

loginRouter.post('/getMenu', ctx => {
    ctx.body = menuList
})

loginRouter.post('/verifyToken', loginController.verifyToken, loginController.getMenus, ctx => {
    const user = ctx.user
    const menuList = ctx.menus
    const userInfo = {
        name: user.name,
        role: 'system'
    }
    ctx.body = {
        userInfo,
        menuList
    }
})

module.exports = loginRouter
