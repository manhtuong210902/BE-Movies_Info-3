const Movie = require('../models/movie.m')
const Favorite = require('../models/me.m');


class meController{
    async showStored(req, res, next){
        const { user } = req.session;
        const list = await Favorite.getFavoritesByUser(user.id)
        res.render('me/stored', { list })
    }

    async addFavorite(req, res, next){
        const { id } = req.body;
        const { user } = req.session;
        const exists = await Favorite.getFavorite(user.id, id);
        if(exists){
            return res.json({ success: false, message: 'This movie has been added to favorites !!'})
        }

        const favorite = {
            uid: user.id,
            movieid: id,
        }
        const rs = await Favorite.addFavorite(favorite);
        if(rs){
            return res.json({ success: true, message: 'Add successfully' })
        }else{
            return res.json({ success: false, message: 'Add failed !!' })
        }
    }

    async deleteFavorite(req, res, next){
        //uid
        const { user } = req.session;

        //movieid
        const movieid = req.params.id;
        try {
            await Favorite.deleteFavorite(user.id, movieid)
            return res.json({success: true, message: 'delete successfully'})
        } catch (error) {
            return res.status(400).json({success: false, message: 'delete fail !!!'})
        }
    }
}

module.exports = new meController();