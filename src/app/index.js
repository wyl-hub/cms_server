const Koa = require('koa')
const path = require('path')
const bodyParser = require('koa-bodyparser')
const staticServer = require('koa-static')
const useRouters = require('../router')

const app = new Koa()


// 动态注册路由
app.use(bodyParser())
useRouters(app)

app.use(staticServer('./public'))
module.exports = app