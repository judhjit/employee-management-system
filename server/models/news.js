const db = require("../data/database");
const dateFns = require('date-fns');
const { v4: uuidv4 } = require('uuid');

class News {
    constructor(newsId, userId, dateOfPosting, news) {
        this.newsId = newsId;
        this.userId = userId;
        this.dateOfPosting = dateOfPosting;
        this.news = news;
    }

    static async formatNews(news) {
        const formattedNews = {
            newsId: news.news_id,
            userId: news.user_id,
            dateOfPosting: dateFns.format(new Date(news.date_of_posting), 'yyyy-MM-dd HH:mm:ss'),
            news: news.news
        };
        return formattedNews;
    }

    static async getAllNews() {
        let news;
        try {
            let result = await db.any('SELECT * FROM public."NewsFeedPosts" ORDER BY "date_of_posting"');
            if (!result) return null; //if result is undefined, then return null
            for (let i = 0; i < result.length; i++) {
                result[i] = await News.formatNews(result[i]);
            }
            news = result;
        } catch (error) {
            console.error(error);
        }
        return news;
    }

    static async createNews(userId, news) {
        if (!userId || !news) return null; //if userId or news is undefined, then return null
        let newsId;
        try {
            newsId = uuidv4();
            await db.any('INSERT INTO public."NewsFeedPosts" (news_id, user_id, date_of_posting, news) VALUES ($1, $2, CURRENT_TIMESTAMP, $3)', [newsId, userId, news]);
        } catch (error) {
            console.error(error);
        }
        return newsId;
    }

    static async updateNews(newsId, news) {
        if (!newsId || !news) return null; //if newsId or news is undefined, then return null
        try {
            await db.any('UPDATE public."NewsFeedPosts" SET news = $1 WHERE news_id = $2', [news, newsId]);
        } catch (error) {
            console.error(error);
        }
    }

    static async deleteNews(newsId) {
        if (!newsId) return null; //if newsId is undefined, then return null
        try {
            await db.any('DELETE FROM public."NewsFeedPosts" WHERE news_id = $1', [newsId]);
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = News;