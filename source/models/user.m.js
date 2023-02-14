const db = require('../db/db')

const User = {
    getAllUser: async () => {
        const rs = await db.any('SELECT * FROM Users')
        return rs;
    },

    addUser: async (user) => {
        try {
            const rs = await db.one('INSERT INTO Users(id, username, password) VALUES($1, $2, $3) RETURNING *', [
                user.uid,
                user.username,
                user.password,
            ]);
            return rs;
        } catch (error) {
            console.log(error)
        }
    },

    getUserByName: async(username) => {
        try {
            const rs = await db.oneOrNone('SELECT * FROM Users WHERE username=$1', [username])
            return rs;
        } catch (error) {
            console.log(error)
        }
    },

    getMaxID: async() => {
        try {
            const rs = await db.one('SELECT Max(id) FROM Users');
            return rs;
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = User;