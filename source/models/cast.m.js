const db = require('../db/db')

const Cast = {
    getCastByMovieid: async (movieid) => {
        try {
            const rs = await db.any('SELECT * FROM Casts, Movie_Cast WHERE id = castid AND movieid = $1', [movieid])
            return rs;
        } catch (error) {
            
        }
    },

    getCastById: async (id) => {
        try {
            const rs = await db.oneOrNone('SELECT * FROM Casts WHERE id = $1', [id])
            return rs;
        } catch (error) {
            
        }
    }
}

module.exports = Cast;