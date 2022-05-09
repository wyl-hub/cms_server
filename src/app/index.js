const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const loginRouter = require('../router/index')

const app = new Koa()

app.use(bodyParser())
app.use(loginRouter.routes())
app.use(loginRouter.allowedMethods())

module.exports = app