const db = require('../db/db')

const Favorite = {
    getAllFavorite: async () => {
        try {
            const rs = await db.any('SELECT * FROM Favorite')
            return rs;
        } catch (error) {
            
        }
    },

    getFavoritesByUser: async (uid) => {
        try {
            const rs = await db.any('SELECT * FROM Favorite, Movies WHERE uid = $1 and movieid = id', [uid])
            return rs;
        } catch (error) {
            
        }
    },

    addFavorite: async (favorite) => {
        try {
            const rs = await db.one('INSERT INTO Favorite(uid, movieid) VALUES($1, $2) RETURNING *', [
               favorite.uid,
               favorite.movieid,
            ]);
            return rs;
        } catch (error) {
            console.log(error)
        }
    },

    getFavorite: async(uid, movieid) => {
        try {
            const rs = await db.oneOrNone('SELECT * FROM Favorite WHERE uid=$1 AND movieid=$2', [uid, movieid])
            return rs;
        } catch (error) {
            console.log(error)
        }
    },

    deleteFavorite: async (uid, movieid) => {
        try {
            await db.none('DELETE FROM Favorite WHERE uid = $1 and movieid = $2', [uid, movieid])
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = Favorite;