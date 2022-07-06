const connection = require('../app/database')

class Customer {
    async getList(data) {
        const { size, offset } = data
        const statement = `SELECT * FROM customers LIMIT ? OFFSET ?;`
        const result = await connection.execute(statement, [size, offset])
        return result[0]
    }
}

module.exports = new Customer()