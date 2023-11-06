const NewsFeedPostsModel = require('../models/news');

async function getNewsFeedPosts(req, res, next) { //function to get all news feed posts
    let news;
    try {
        news = await NewsFeedPostsModel.getAllNews();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!news || news.length === 0) {
        return res.status(404).json({ message: 'No news found' });
    }
    return res.status(200).json(news);
}

async function createNewsFeedPost(req, res, next) { //function to create a news feed post
    const userId = req.userId;
    const news = req.body.news;
    if (!userId || !news) {
        return res.status(400).json({ message: 'Bad Request!' });
    }
    let newsId;
    try {
        newsId = await NewsFeedPostsModel.createNews(userId, news);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!newsId) {
        return res.status(400).json({ message: 'Bad Request' });
    }
    return res.status(201).json({ message: 'News created successfully', newsId: newsId });
}

async function deleteNewsFeedPost(req, res, next) { //function to delete a news feed post
    const newsId = req.body.newsId;
    if (!newsId) {
        return res.status(400).json({ message: 'NewsId missing' });
    }
    try {
        await NewsFeedPostsModel.deleteNews(newsId);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    return res.status(200).json({ message: 'News deleted successfully' });
}

async function updateNewsFeedPost(req, res, next) { //function to update a news feed post
    const newsId = req.body.newsId;
    const news = req.body.news;
    if (!newsId || !news) {
        return res.status(400).json({ message: 'Bad Request!' });
    }
    try {
        await NewsFeedPostsModel.updateNews(newsId, news);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    return res.status(200).json({ message: 'News updated successfully' });
}


module.exports = {
    getNewsFeedPosts,
    createNewsFeedPost,
    deleteNewsFeedPost,
    updateNewsFeedPost
}