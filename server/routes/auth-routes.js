const express = require('express');

const router = express.Router();

const authControllers = require('../controllers/auth-controller');
const refreshTokenController = require('../controllers/refresh-token-controller');

// /signup => POST
router.post('/signup', authControllers.signup); //create a new user

// /login => POST
router.post('/login', authControllers.login); //login a user

// /logout => POST
router.post('/logout', authControllers.logout); //logout a user

// /refresh => POST
router.post('/refresh', refreshTokenController.handleRefreshToken);


module.exports = router;