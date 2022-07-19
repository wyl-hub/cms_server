const connection = require('../app/database')

class Swiper {
    async getList(data) {
        const { size, offset } = data
        const statement = `SELECT * FROM swipers LIMIT ? OFFSET ?;`
        const result = await connection.execute(statement, [size, offset])
        return result[0]
    }
    
    async getSeqList() {
        const statement = `SELECT seq FROM swipers WHERE seq != ''`
        const result = await connection.execute(statement)
        return result[0]
    }

    async save(data) {
        const { name, seq, url } = data
        const statement = `INSERT INTO swipers (name, seq, url) VALUES (?, ?, ?);`
        const result = await connection.execute(statement, [name, seq, url])
        return result[0]
    }
}

module.exports = new Swiper()