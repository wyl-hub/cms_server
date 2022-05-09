const connection = require('../app/database')

class Login {
    async checkAccount(user) {
        const { name, password } = user
        const statement = `SELECT * FROM users WHERE name = ? AND password = ?`
        const result = await connection.execute(statement, [name, password])
        return result[0]
    }
}

module.exports = new Login()