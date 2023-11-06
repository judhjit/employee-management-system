const express = require('express');

const router = express.Router();

const newsAdminControllers = require('../controllers/news-controller');

// /newsAdmin/news => POST
router.post('/news', newsAdminControllers.createNewsFeedPost); //create a news feed post

// /newsAdmin/news => PATCH
router.patch('/news', newsAdminControllers.updateNewsFeedPost); //update a news feed post

// /newsAdmin/news => DELETE
router.delete('/news', newsAdminControllers.deleteNewsFeedPost); //delete a news feed post

module.exports = router;