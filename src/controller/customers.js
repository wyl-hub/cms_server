const { throwError } = require('../utils/error')

class Customer {
    getList(ctx, next) {
        const data = ctx.request.body
        console.log('data', data)
        ctx.body = 'success'
    }
}

module.exports = new Customer()