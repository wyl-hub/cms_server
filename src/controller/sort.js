const { throwError } = require('../utils/error')
const sortService = require('../service/sort')

class Sort {
    async getList(ctx) {
        const data = ctx.request.body
        const result = await sortService.getList(data)
        const totalRes = await sortService.getTotal()
        const { total } = totalRes
        ctx.body = {
            list: result,
            total
        }
    }

    async save(ctx) {
        const data = ctx.request.body
        const { id, name } = data
        console.log(data)
        if (!name) {
            throwError(500, '名称不能为空', ctx)
            return
        }

        if (!id) await sortService.save(data)
        else await sortService.update(data)
        ctx.body = 'success'
    }

    async getInfo(ctx) {
        const { id } = ctx.request.body
        const result = await sortService.getInfo(id)
        ctx.body = result[0]
    }

    async delete(ctx) {
        const { id } = ctx.request.body
        await sortService.delete(id)
        ctx.body = 'success'
    }
}

module.exports = new Sort()