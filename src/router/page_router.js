const Router = require('koa-router')
const pageRouter = new Router({ prefix: '/page' })
const upload = require('../middleware/upload')
const swiperController = require('../controller/swiper')
const sortController = require('../controller/sort')

pageRouter.post('/getSwiperList', swiperController.getList)
pageRouter.post('/getSortList', sortController.getList)
pageRouter.post('/upload', upload.single('file'), async ctx => {
    const file = ctx.req.file
    const name = file.originalname.split('.')[0]
    let url = file.path.slice(6)
    url = url.replace(/\\/g, '/')
    url = 'http://localhost:3000' + url
    const uid = file.filename.split('.')[0]
    ctx.body = {
        uid,
        name,
        url
    }
})
module.exports = pageRouter