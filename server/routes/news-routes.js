const express = require('express');
const router = express.Router();

const newsControllers = require('../controllers/news-controller');

// /news => GET
router.get('/', newsControllers.getNewsFeedPosts);

// /news/id?newsId=newsId => GET
router.get('/id', newsControllers.getNewsFeedPostByNewsId);

module.exports = router;