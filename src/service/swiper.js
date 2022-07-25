const connection = require('../app/database')

class Swiper {
    async getList(data) {
        const { size, offset } = data
        const statement = `SELECT * FROM swipers LIMIT ? OFFSET ?;`
        const result = await connection.execute(statement, [size, offset])
        return result[0]
    }
    
    async getTotal() {
        const statement = `SELECT count(*) as total FROM swipers;`
        const result = await connection.execute(statement)
        return result[0][0]
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

    async update(data) {
        const { id, name, seq, url } = data
        const statement = `UPDATE swipers SET name = ?, seq = ?, url = ? WHERE id = ?;`
        const result = await connection.execute(statement, [name, seq, url, id])
        return result[0]
    }

    async getInfo(id) {
        const statement = `SELECT * FROM swipers WHERE id = ?;`
        const result = await connection.execute(statement, [id])
        return result[0]
    }

    async delete(id) {
        const statement = `DELETE FROM swipers WHERE id = ?;`
        const result = await connection.execute(statement, [id])
        return result[0]
    }
}

module.exports = new Swiper()