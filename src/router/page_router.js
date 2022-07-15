const Router = require('koa-router')
const pageRouter = new Router({ prefix: '/page' })
const swiperController = require('../controller/swiper')

pageRouter.post('/getSwiperList', swiperController.getList)

module.exports = pageRouter