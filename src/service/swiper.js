const connection = require('../app/database')

class Swiper {
    async getList(data) {
        const { size, offset } = data
        const statement = `SELECT * FROM swipers LIMIT ? OFFSET ?;`
        const result = await connection.execute(statement, [size, offset])
        return result[0]
    }
}

module.exports = new Swiper()