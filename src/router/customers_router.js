const Router = require('koa-router')
const customerController = require('../controller/customers')
const customerRouter = new Router({ prefix: '/customer' })

customerRouter.post('/getCustomerList', customerController.getList)

module.exports = customerRouter