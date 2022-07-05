const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const useRouters = require('../router')

const app = new Koa()

// 动态注册路由
app.use(bodyParser())
useRouters(app)


module.exports = app