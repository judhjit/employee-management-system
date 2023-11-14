const express = require('express');

const router = express.Router();

const newsAdminControllers = require('../controllers/news-controller');

// /newsadmin/news => POST
router.post('/news', newsAdminControllers.createNewsFeedPost); //create a news feed post

// /newsadmin/news => PATCH
router.patch('/news', newsAdminControllers.updateNewsFeedPost); //update a news feed post

// /newsadmin/deletenews => DELETE
router.post('/deletenews', newsAdminControllers.deleteNewsFeedPost); //delete a news feed post

module.exports = router;