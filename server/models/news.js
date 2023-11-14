const db = require("../data/database");
const dateFns = require('date-fns');
const { v4: uuidv4 } = require('uuid');

const logger = require('../logger/index');
const childLogger = logger.child({ module: 'news' });

let service = "";

class News {
    constructor(newsId, userId, dateOfPosting, news) {
        service = "News constructor";
        this.newsId = newsId;
        this.userId = userId;
        this.dateOfPosting = dateOfPosting;
        this.title = title;
        this.body = body;
        childLogger.info("News object created", { service: service });
    }

    static async formatNews(news) {
        service = "formatNews";
        const formattedNews = {
            newsId: news.news_id,
            userId: news.user_id,
            dateOfPosting: dateFns.format(new Date(news.date_of_posting), 'yyyy-MM-dd HH:mm:ss'),
            title: news.title,
            body: news.body
        };
        childLogger.info("Successfully formatted news", { service: service });
        return formattedNews;
    }

    static async getAllNews() {
        service = "getAllNews";
        let news;
        try {
            let result = await db.any('SELECT * FROM public."NewsFeedPosts" ORDER BY "date_of_posting"');
            if (!result) {
                childLogger.error("No news found", { service: service });
                return null;
            }
            for (let i = 0; i < result.length; i++) {
                result[i] = await News.formatNews(result[i]);
            }
            news = result;
            childLogger.info("Successfully formatted all news", { service: service });
        } catch (error) {
            childLogger.error("Failed to get all news", { service: service, error: error });
        }
        childLogger.info("Successfully returned all news", { service: service });
        return news;
    }

    static async createNews(userId, title, body) {
        service = "createNews";
        if (!userId || !title || !body) {
            childLogger.error("News title, body or userId not provided", { service: service });
            return null; //if userId, news title or news body is undefined, then return null
        }
        let newsId;
        try {
            newsId = uuidv4();
            await db.any('INSERT INTO public."NewsFeedPosts" (news_id, user_id, date_of_posting, title, body) VALUES ($1, $2, CURRENT_TIMESTAMP, $3, $4)', [newsId, userId, title, body]);
            childLogger.info("Successfully created news", { service: service, userId: userId, newsId: newsId });
        } catch (error) {
            childLogger.error("Failed to create news", { service: service, userId: userId, newsId: newsId, error: error });
        }
        childLogger.info("Successfully created news and returned news id", { service: service, userId: userId, newsId: newsId });
        return newsId;
    }

    static async updateNews(newsId, title, body) {
        if (!newsId || !title || !body) {
            childLogger.error("News id, title or body not provided", { service: service });
            return null; //if newsId, news title or news body is undefined, then return null
        }
        try {
            await db.any('UPDATE public."NewsFeedPosts" SET title = $1, body = $2 WHERE news_id = $3', [title, body, newsId]);
            childLogger.info("Successfully updated news", { service: service, newsId: newsId });
        } catch (error) {
            childLogger.error("Failed to update news", { service: service, newsId: newsId, error: error });
        }
    }

    static async deleteNews(newsId) {
        service = "deleteNews";
        if (!newsId) {
            childLogger.error("News id not provided", { service: service });
            return null; //if newsId is undefined, then return null
        }
        try {
            await db.any('DELETE FROM public."NewsFeedPosts" WHERE news_id = $1', [newsId]);
            childLogger.info("Successfully deleted news", { service: service, newsId: newsId });
        } catch (error) {
            childLogger.error("Failed to delete news", { service: service, newsId: newsId, error: error });
        }
    }
}

module.exports = News;