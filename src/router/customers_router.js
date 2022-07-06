const Router = require('koa-router')
const customerController = require('../controller/customers')
const customerRouter = new Router({ prefix: '/customer' })

customerRouter.post('/getCustomerList', customerController.getList)
customerRouter.post('/setAvatar', ctx => {
    console.log(ctx)
})
module.exports = customerRouter