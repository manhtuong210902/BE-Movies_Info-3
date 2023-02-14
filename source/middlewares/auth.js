function isAuthenticated (req, res, next) {
    if (req.session.user){
        return res.redirect('/')
    }
    return next();
}

function isNotAuthenticated(req, res, next){
    if(req.session.user){
        return next();
    }
    return res.redirect('/user/login')
}

module.exports = { isAuthenticated, isNotAuthenticated }