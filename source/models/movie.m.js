const db = require('../db/db')

const Movie = {
    getAllMovies: async () => {
        try {
            const rs = await db.any('SELECT * FROM Movies')
            return rs;
        } catch (error) {
            
        }
    },

    getTopRateMovies: async () => {
        try {
            const rs = await db.any('SELECT * FROM Movies WHERE rating IS NOT NULL ORDER BY rating DESC LIMIT 12')
            return rs;
        } catch (error) {
            
        }
    },

    addMovie: async (movie) => {
        try {
            const rs = await db.one('INSERT INTO Users(id, img, title, topRank, rating, ratingCount, genres) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *', [
               movie.id,
               movie.img,
               movie.title,
               movie.topRank,
               movie.rating,
               movie.ratingCount,
               movie.genres
            ]);
            return rs;
        } catch (error) {
            console.log(error)
        }
    },

    getMovieById: async(id) => {
        try {
            const rs = await db.oneOrNone('SELECT * FROM Movies WHERE id=$1', [id])
            return rs;
        } catch (error) {
            console.log(error)
        }
    },

    searchMovieByTitle: async(title) => {
        try {
            const rs = await db.any(`SELECT * FROM Movies WHERE title ILIKE '%${title}%'`)
            return rs;
        } catch (error) {
            
        }
    },

    getMovieByCastId: async(castid) => {
        try {
            const rs = await db.any('SELECT * FROM Movies, Movie_Cast WHERE movieid = id AND castid = $1', [castid])
            return rs;
        } catch (error) {
            
        }
    },

    getReviewByMovieId: async(movieid) => {
        try {
            const rs = await db.any('SELECT * FROM Reviews WHERE movieid = $1', [movieid])
            return rs;
        } catch (error) {
            
        }
    }
}

module.exports = Movie;