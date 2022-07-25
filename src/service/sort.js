const connection = require('../app/database')

class Sort {
    async getList(data) {
        const { size, offset } = data
        const statement = `SELECT * FROM sorts LIMIT ? OFFSET ?;`
        const result = await connection.execute(statement, [size, offset])
        return result[0]
    }

    async getTotal() {
        const statement = `SELECT count(*) as total FROM sorts;`
        const result = await connection.execute(statement)
        return result[0][0]
    }
    
    async save(data) {
        const { name, ifShow } = data
        console.log(name)
        console.log(ifShow)
        const statement = `INSERT INTO sorts (name, ifShow) VALUES (?, ?);`
        const result = await connection.execute(statement, [name, ifShow])
        return result[0]
    }

    async update(data) {
        const { id, name, ifShow } = data
        const statement = `UPDATE sorts SET name = ?, ifShow = ? WHERE id = ?;`
        const result = await connection.execute(statement, [name, ifShow, id])
        return result[0]
    }

    async getInfo(id) {
        const statement = `SELECT * FROM sorts WHERE id = ?;`
        const result = await connection.execute(statement, [id])
        return result[0]
    }

    async delete(id) {
        const statement = `DELETE FROM sorts WHERE id = ?;`
        const result = await connection.execute(statement, [id])
        return result[0]
    }
}

module.exports = new Sort()