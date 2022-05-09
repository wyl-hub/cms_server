const Router = require('koa-router')
const loginController = require('../controller/login')
const loginRouter = new Router({ prefix: '/login' })


loginRouter.post('/', loginController.login)

// loginRouter.post('/verifyToken', loginController.verifyToken)

module.exports = loginRouter
