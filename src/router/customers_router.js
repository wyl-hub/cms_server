const Router = require('koa-router')
const customerController = require('../controller/customers')
const upload = require('../middleware/upload')
const customerRouter = new Router({ prefix: '/customer' })

customerRouter.post('/getCustomerList', customerController.getList)

customerRouter.post('/upload', upload.single('file'), async ctx => {
    console.log(ctx.req.file)
    ctx.body = 'test'
})

module.exports = customerRouter