const express = require('express');
const router = express.Router();

const siteController = require('../controllers/site.c')
const { isNotAuthenticated } = require('../middlewares/auth')

router.get('/', isNotAuthenticated, siteController.showHome)
router.get('/details/:id', isNotAuthenticated, siteController.showDetail)
router.get('/search', isNotAuthenticated, siteController.searchMovie)
router.get('/actor/:id', isNotAuthenticated, siteController.showActor)

module.exports = router