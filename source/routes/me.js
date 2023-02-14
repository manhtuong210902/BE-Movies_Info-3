const express = require('express');
const router = express.Router();

const meController = require('../controllers/me.c')
const { isNotAuthenticated } = require('../middlewares/auth')

router.get('/stored', isNotAuthenticated, meController.showStored)
router.post('/add', meController.addFavorite)
router.delete('/delete/:id', meController.deleteFavorite)

module.exports = router