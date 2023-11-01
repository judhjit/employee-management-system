const express = require('express');

const router = express.Router();

const authControllers = require('../controllers/auth-controller');

// /signup => POST
router.post('/signup', authControllers.signup);

// /login => POST
router.post('/login', authControllers.login);

// /logout => POST
router.post('/logout', authControllers.logout);


module.exports = router;