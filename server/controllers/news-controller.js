const NewsFeedPostsModel = require('../models/news');

const logger = require('../logger/index');
const childLogger = logger.child({ module: 'news-controller' });

let service = "";

async function getNewsFeedPosts(req, res, next) { //function to get all news feed posts
    service = "getNewsFeedPosts";
    let news;
    try {
        childLogger.info("Getting all news feed posts", { service: service, userId: req.userId });
        news = await NewsFeedPostsModel.getAllNews();
        childLogger.info("Successfully got all news feed posts", { service: service, userId: req.userId });
    } catch (error) {
        childLogger.error("Failed to get all news feed posts", { service: service, userId: req.userId, error: error });
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!news || news.length === 0) {
        childLogger.info("No news found", { service: service, userId: req.userId });
        return res.status(404).json({ message: 'No news found' });
    }
    childLogger.info("Successfully returned all news feed posts", { service: service, userId: req.userId });
    return res.status(200).json(news);
}

async function createNewsFeedPost(req, res, next) { //function to create a news feed post
    service = "createNewsFeedPost";
    const userId = req.userId;
    const title = req.body.title;
    const body = req.body.body;
    if (!userId || !title || !body) {
        childLogger.error("UserId, title or body not present", { service: service, userId: req.userId });
        return res.status(400).json({ message: 'Bad Request!' });
    }
    let newsId;
    try {
        childLogger.info("Creating a news feed post", { service: service, userId: req.userId });
        newsId = await NewsFeedPostsModel.createNews(userId, title, body);
        childLogger.info("Successfully created a news feed post", { service: service, userId: req.userId });
    } catch (error) {
        childLogger.error("Failed to create a news feed post", { service: service, userId: req.userId, error: error });
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!newsId) {
        childLogger.error("Failed to create a news feed post", { service: service, userId: req.userId });
        return res.status(400).json({ message: 'Bad Request' });
    }
    childLogger.info("Successfully created a news feed post and returned", { service: service, userId: req.userId });
    return res.status(201).json({ message: 'News created successfully', newsId: newsId });
}

async function deleteNewsFeedPost(req, res, next) { //function to delete a news feed post
    service = "deleteNewsFeedPost";
    const newsId = req.body.newsId;
    if (!newsId) {
        childLogger.error("NewsId not present", { service: service, userId: req.userId });
        return res.status(400).json({ message: 'NewsId missing' });
    }
    try {
        childLogger.info("Deleting a news feed post", { service: service, userId: req.userId });
        await NewsFeedPostsModel.deleteNews(newsId);
        childLogger.info("Successfully deleted a news feed post", { service: service, userId: req.userId });
    } catch (error) {
        childLogger.error("Failed to delete a news feed post", { service: service, userId: req.userId, error: error });
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    childLogger.info("Successfully deleted a news feed post and returned", { service: service, userId: req.userId });
    return res.status(200).json({ message: 'News deleted successfully' });
}

async function updateNewsFeedPost(req, res, next) { //function to update a news feed post
    service = "updateNewsFeedPost";
    const newsId = req.body.newsId;
    const title = req.body.title;
    const body = req.body.body;
    if (!newsId || !title || !body) {
        childLogger.error("NewsId, title or body not present", { service: service, userId: req.userId });
        return res.status(400).json({ message: 'Bad Request!' });
    }
    try {
        childLogger.info("Updating a news feed post", { service: service, userId: req.userId });
        await NewsFeedPostsModel.updateNews(newsId, title, body);
        childLogger.info("Successfully updated a news feed post", { service: service, userId: req.userId });
    } catch (error) {
        childLogger.error("Failed to update a news feed post", { service: service, userId: req.userId, error: error });
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    childLogger.info("Successfully updated a news feed post and returned", { service: service, userId: req.userId });
    return res.status(200).json({ message: 'News updated successfully' });
}


module.exports = {
    getNewsFeedPosts,
    createNewsFeedPost,
    deleteNewsFeedPost,
    updateNewsFeedPost
}