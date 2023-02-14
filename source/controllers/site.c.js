// const addDatafromJson = require('../db/importDb')
const Movie = require('../models/movie.m')
const Cast = require('../models/cast.m')

class siteController{
    async showHome(req, res, next){
        const movies = await Movie.getTopRateMovies()
        res.render('home', { movies })
    }

    async showDetail(req, res, next){
        const movieid = req.params.id;
        const details = await Movie.getMovieById(movieid)
        const reviews = await Movie.getReviewByMovieId(movieid)
        const casts = await Cast.getCastByMovieid(movieid)

        const page = req.query.page || 1
        const perpage = 4

        const nPage = Math.ceil(reviews.length / perpage);
        const list = []
        const links = []
        for(let i = 0; i < nPage; i++){
            list.push(reviews.splice(0, perpage))
            links.push({
                page: i + 1,
                href: `/details/${movieid}?page=${i + 1}`,
                active: page
            })
        }

        if(details){
            console.log(details)
            return res.render('details', {details, casts, reviews: list[page-1], links})
        }else{
            return res.status(404).json({ message: 'Not found movie' })
        }
    }

    async searchMovie(req, res, next){
        const { q } = req.query;
        let listSearch = await Movie.searchMovieByTitle(q)

        const page = req.query.page || 1
        const perpage = 8

        const nPage = Math.ceil(listSearch.length / perpage);
        const list = []
        const links = []
        for(let i = 0; i < nPage; i++){
            list.push(listSearch.splice(0, perpage))
            links.push({
                page: i + 1,
                href: `/search?q=${q}&page=${i + 1}`,
                active: page
            })
        }

        res.render('search', { listSearch: list[page - 1], keyword: q, links})
    }

    async showActor(req, res, next){
        const castid = req.params.id;
        const details = await Cast.getCastById(castid)

        //get các movie có liên quan
        const movies = await Movie.getMovieByCastId(castid)

        if(details){
            res.render('actor', {details, movies})
        }else{
            res.status(404).json({ message: 'Not found movie' })
        }
    }
}

module.exports = new siteController();