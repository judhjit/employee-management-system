
const db = require("../data/database");
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');

class NewsAdminRequest {
    constructor(requestId, userId, dateOfRequest, request) {
        this.requestId = requestId;
        this.userId = userId;
        this.dateOfRequest = dateOfRequest;
    }

    static async formatNewsAdminRequest(newsAdminRequest) {
        newsAdminRequest.forEach((request) => {
            request.userId = request.user_id;
            request.name = `${request.first_name} ${request.last_name}`;
            request.firstName = request.first_name;
            request.lastName = request.last_name;
            request.requestDate = moment(request.date_of_request).format('YYYY-MM-DD');
            delete request.user_id;
            delete request.first_name;
            delete request.last_name;
            delete request.date_of_request;
        });
    }

    static async getAllNewsAdminRequests() {
        //NewsAdminRequest is a table in the database with the following columns: request_id, user_id, date_of_request, request
        let newsAdminRequests;
        try {
            let result = await db.any(`SELECT public."NewsAdminRequests"."request_id",
            public."NewsAdminRequests"."user_id", public."NewsAdminRequests"."date_of_request",
            public."Users"."first_name", public."Users"."last_name", public."Users"."isNewsAdmin"
            FROM public."NewsAdminRequests"
            INNER JOIN public."Users" ON public."NewsAdminRequests"."user_id" = public."Users"."user_id"
            ORDER BY public."NewsAdminRequests"."date_of_request";`);
            if (!result) return null; //if result is undefined, then return null
            await NewsAdminRequest.formatNewsAdminRequest(result);
            newsAdminRequests = result;
        } catch (error) {
            console.error(error);
        }
        return newsAdminRequests;
    }

    static async findRequestByUserId(userId) {
        if (!userId) return null; //if userId is undefined, then return null
        let request;
        try {
            let result = await db.any('SELECT * FROM public."NewsAdminRequests" WHERE user_id = $1', [userId]);
            request = result[0];
            if (!request) return null; //if request is undefined, then return null
        } catch (error) {
            console.error(error);
        }
        return request;
    }

    static async deleteNewsAdminRequest(userId) {
        if (!userId) return null; //if userId is undefined, then return null
        try {
            await db.any('DELETE FROM public."NewsAdminRequests" WHERE user_id = $1', [userId]);
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = NewsAdminRequest;