const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.c')
const { isAuthenticated } = require('../middlewares/auth')

router.post('/login', userController.login)
router.post('/register', userController.register)
router.get('/logout', userController.logout)
router.get('/login', isAuthenticated, userController.showLogin)
router.get('/register', isAuthenticated, userController.showRegister)

module.exports = router