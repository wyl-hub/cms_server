const Router = require('koa-router')
const sortController = require('../controller/sort')
const sortRouter = new Router({ prefix: '/sort' })

sortRouter.post('/save', sortController.save)
sortRouter.post('/getInfo', sortController.getInfo)
sortRouter.post('/delete', sortController.delete)
module.exports = sortRouter