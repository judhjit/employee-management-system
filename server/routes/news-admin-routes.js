const express = require('express');

const router = express.Router();

const newsControllers = require('../controllers/news-controller');

// /newsAdmin?newsId=newsId => POST
router.post('/', newsControllers.createNewsFeedPost);

// /newsAdmin?newsId=newsId => PUT
router.put('/', newsControllers.updateNewsFeedPost);

// /newsAdmin?newsId=newsId => DELETE
router.delete('/', newsControllers.deleteNewsFeedPost);

module.exports = router;