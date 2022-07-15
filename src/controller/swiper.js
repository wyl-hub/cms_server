const { throwError } = require('../utils/error')
const swiperService = require('../service/swiper')

class Swiper {
    async getList(ctx) {
        const data = ctx.request.body
        const result = await swiperService.getList(data)
        ctx.body = result
    }
}

module.exports = new Swiper()