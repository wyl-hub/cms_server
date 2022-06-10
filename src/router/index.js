const Router = require('koa-router')
const loginController = require('../controller/login')
const loginRouter = new Router({ prefix: '/login' })

const menuList = [
    {
        title: 'Analyse',
        type: 1,
        icon: 'Location',
        children: [
            {
                title: 'customer',
                type: 2,
                icon: '',
                url: '/main/analyse/customer'
            },
            {
                title: 'product',
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

loginRouter.post('/verifyToken', loginController.verifyToken, ctx => {
    const user = ctx.user
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
