
const db = require("../data/database");
const dateFns = require('date-fns');

const logger = require('../logger/index');
const childLogger = logger.child({ module: 'news-admin-request' });

let service = "";

class NewsAdminRequest {
    constructor(requestId, userId, dateOfRequest, request) {
        service = "NewsAdminRequest constructor";
        this.requestId = requestId;
        this.userId = userId;
        this.dateOfRequest = dateOfRequest;
        childLogger.info("NewsAdminRequest object created", { service: service });
    }

    static async formatNewsAdminRequest(newsAdminRequest) {
        service = "formatNewsAdminRequest";
        newsAdminRequest.forEach((request) => {
            request.userId = request.user_id;
            request.name = `${request.first_name} ${request.last_name}`;
            request.firstName = request.first_name;
            request.lastName = request.last_name;
            request.requestDate = dateFns.format(new Date(request.date_of_request), 'yyyy-MM-dd');
            delete request.user_id;
            delete request.first_name;
            delete request.last_name;
            delete request.date_of_request;
        });
        childLogger.info("Successfully formatted news admin request", { service: service });
    }

    static async getAllNewsAdminRequests() {
        service = "getAllNewsAdminRequests";
        let newsAdminRequests;
        try {
            let result = await db.any(`SELECT public."NewsAdminRequests"."request_id",
            public."NewsAdminRequests"."user_id", public."NewsAdminRequests"."date_of_request",
            public."Users"."first_name", public."Users"."last_name", public."Users"."isNewsAdmin"
            FROM public."NewsAdminRequests"
            INNER JOIN public."Users" ON public."NewsAdminRequests"."user_id" = public."Users"."user_id"
            ORDER BY public."NewsAdminRequests"."date_of_request";`);
            childLogger.info("Successfully got all news admin requests", { service: service });
            if (!result) {
                childLogger.error("Failed to get all news admin requests", { service: service });
                return null;
            }
            await NewsAdminRequest.formatNewsAdminRequest(result);
            childLogger.info("Successfully formatted all news admin requests", { service: service });
            newsAdminRequests = result;
        } catch (error) {
            childLogger.error("Failed to get all news admin requests", { service: service, error: error });
        }
        childLogger.info("Successfully returned all news admin requests", { service: service });
        return newsAdminRequests;
    }

    static async findRequestByUserId(userId) {
        service = "findRequestByUserId";
        if (!userId) {
            childLogger.error("User id not provided", { service: service });
            return null; //if userId is undefined, then return null
        }
        let request;
        try {
            let result = await db.any('SELECT * FROM public."NewsAdminRequests" WHERE user_id = $1', [userId]);
            childLogger.info("Successfully got news admin request by user id", { service: service, userId: userId });
            request = result[0];
            if (!request) {
                childLogger.error("Did not get any news admin request by the user id", { service: service, userId: userId });
                return null;
            }
        } catch (error) {
            childLogger.error("Failed to get news admin request by user id", { service: service, userId: userId, error: error });
        }
        childLogger.info("Successfully returned news admin request by user id", { service: service, userId: userId });
        return request;
    }

    static async deleteNewsAdminRequest(userId) {
        service = "deleteNewsAdminRequest";
        if (!userId) {
            childLogger.error("User id not provided", { service: service });
            return null; //if userId is undefined, then return null
        }
        try {
            await db.any('DELETE FROM public."NewsAdminRequests" WHERE user_id = $1', [userId]);
            childLogger.info("Successfully deleted news admin request", { service: service, userId: userId });
        } catch (error) {
            childLogger.error("Failed to delete news admin request", { service: service, userId: userId, error: error });
        }
        childLogger.info("Successfully deleted news admin request", { service: service, userId: userId });
    }
}

module.exports = NewsAdminRequest;