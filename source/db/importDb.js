const db = require('./db')

function addDatafromJson(movies, casts){
    try {
        movies.forEach(async (movie) => {
            try {
                await db.one('INSERT INTO Movies(id, img, title, year, topRank, rating, ratingCount, genres) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [
                    movie.id,
                    movie.img,
                    movie.title,
                    movie.year,
                    movie.topRank,
                    movie.rating,
                    movie.ratingCount,
                    movie.genres.toString()
                ]);
            } catch (error) {
                
            }
        })

        casts.forEach(async (cast) => {
            try {
                await db.one('INSERT INTO Casts(id, image, legacyNameText, name, birthDay, birthPlace, gender, heightCentimeters) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING*', [
                    cast.id,
                    cast.image,
                    cast.legacyNameText,
                    cast.name,
                    cast.birthDate,
                    cast.birthPlace,
                    cast.gender,
                    cast.heightCentimeters,
                ])
            } catch (error) {
                
            }
        })

        movies.forEach((movie) => {
            movie.casts.forEach(async (movie_cast) => {
                try {
                    await db.one('INSERT INTO Movie_Cast(movieid, castid, characters) VALUES ($1, $2, $3)', [
                        movie.id,
                        movie_cast.id,
                        movie_cast.characters ? movie_cast.characters.toString() : ""
                    ])
                } catch (error) {
                   
                }
            })
        })

        movies.forEach((movie) => {
            movie.reviews.forEach(async (review) => {
                try {
                    await db.one('INSERT INTO Reviews(movieid, author, reviewText, reviewTitle) VALUES ($1, $2, $3, $4)', [
                        movie.id,
                        review.author,
                        review.reviewText,
                        review.reviewTitle,
                    ])
                } catch (error) {
                    
                }
            })
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = addDatafromJson

