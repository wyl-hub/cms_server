const Router = require('koa-router')
const swiperController = require('../controller/swiper')

const swiperRouter = new Router({ prefix: '/swiper' })


swiperRouter.post('/getSeqList', swiperController.getSeqList)
swiperRouter.post('/save', swiperController.save)
swiperRouter.post('/getInfo', swiperController.getInfo)
swiperRouter.post('/delete', swiperController.delete)

module.exports = swiperRouter