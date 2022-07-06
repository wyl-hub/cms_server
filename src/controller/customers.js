const { throwError } = require('../utils/error')
const customersService = require('../service/customers')
class Customer {
    async getList(ctx, next) {
        const data = ctx.request.body
        const result = await customersService.getList(data)
        const total = result.length
        ctx.body = {
            total,
            list: result
        }
    }
}

module.exports = new Customer()