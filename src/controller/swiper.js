const { throwError } = require('../utils/error')
const swiperService = require('../service/swiper')

class Swiper {
    async getList(ctx) {
        const data = ctx.request.body
        const result = await swiperService.getList(data)
        ctx.body = result
    }

    async getSeqList(ctx) {
        const result = await swiperService.getSeqList()
        const initArr = [1, 2, 3, 4, 5]
        if (result.length === 5) {
            ctx.body = []
            return
        }
        if (result.length === 0) {
            ctx.body = initArr
            return
        }
        const arr = result.map(item => item.seq)
        arr.forEach(item => {
            const index = initArr.indexOf(item)
            initArr.splice(index, 1)
        })
        ctx.body = initArr
    }

    async save(ctx) {
        const data = ctx.request.body
        const { name, url } = data
        if (!name || !url) {
            throwError(500, '名称和图片不能为空', ctx)
            return
        }
        await swiperService.save(data)
        ctx.body = 'success'
    }

    async getInfo(ctx) {
        const { id } = ctx.request.body
        const result = await swiperService.getInfo(id)
        ctx.body = result[0]
    }

    async delete(ctx) {
        const { id } = ctx.request.body
        await swiperService.delete(id)
        ctx.body = 'success'
    }
}

module.exports = new Swiper()