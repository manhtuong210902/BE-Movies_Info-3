const siteRouter = require('./site')
const userRouter = require('./user')
const meRouter = require('./me')

function route(app){
    app.use('/', siteRouter);
    app.use('/user', userRouter);
    app.use('/me', meRouter);
}

module.exports = route