const db = require("../data/database");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');

const logger = require('../logger/index');
const childLogger = logger.child({ module: 'user' });

let service = "";

class User {
    constructor(userId, firstName, lastName, email, password) {
        service = "User constructor";
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        childLogger.info("User object created", { service: service });
    }

    static async formatUser(user) {
        service = "formatUser";
        if (!user) {
            childLogger.error("User not found", { service: service });
            return null;
        }
        if (!Array.isArray(user)) user = [user]; //if user is not an array, then set user to an array containing user
        user.forEach((user) => {
            user.userId = user.user_id;
            user.name = `${user.first_name} ${user.last_name}`;
            user.firstName = user.first_name;
            user.lastName = user.last_name;
            delete user.user_id;
            delete user.first_name;
            delete user.last_name;
            delete user.password;
            delete user.refreshTokens;
        });
        childLogger.info("Successfully formatted user", { service: service });
        return user;
    
    }

    async create() {
        service = "create";
        try {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            childLogger.info("Hashed password", { service: service, userId: this.userId });
            const result = await db.any(
                'INSERT INTO public."Users" VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
                [this.userId, this.firstName, this.lastName, this.email, hashedPassword, false, false]
            );
            childLogger.info("Successfully created user", { service: service, userId: this.userId });
            return result;
        } catch (error) {
            childLogger.error("Failed to create user", { service: service, userId: this.userId, error: error });
        }
    }

    async hasSamePassword(password) {
        service = "hasSamePassword";
        try {
            childLogger.info("Comparing passwords", { service: service, userId: this.userId });
            return await bcrypt.compare(this.password, password);
        } catch (error) {
            childLogger.error("Failed to compare passwords", { service: service, userId: this.userId, error: error });
        }
    }

    static async findOne(email) {
        service = "findOne";
        if (!email) {
            childLogger.error("Email not provided", { service: service });
            return null; //if email is undefined, then return null
        }
        try {
            const result = await db.any('SELECT * FROM public."Users" WHERE email = $1', [email]);
            const user = result[0];
            childLogger.info("Successfully got user by email", { service: service, request: {email: email} });
            return user;
        } catch (error) {
            childLogger.error("Failed to get user by email", { service: service, request: {email: email}, error: error });
        }
    }

    static async findById(userId) {
        service = "findById";
        if (!userId) {
            childLogger.error("User id not provided", { service: service });
            return null; //if userId is undefined, then return null
        }
        try {
            const result = await db.any('SELECT * FROM public."Users" WHERE user_id = $1', [userId]);
            const user = result[0];
            childLogger.info("Successfully got user by user id", { service: service, request: {userId: userId} });
            return user;
        } catch (error) {
            childLogger.error("Failed to get user by user id", { service: service, request: {userId: userId}, error: error });
        }
    }

    static async getNewsAdmins() {
        service = "getNewsAdmins";
        let newsAdmins;
        try {
            newsAdmins = await db.any('SELECT * FROM public."Users" WHERE "isNewsAdmin" = true');
            childLogger.info("Successfully got all news admins", { service: service });
        } catch (error) {
            childLogger.error("Failed to get all news admins", { service: service, error: error });
        }
        try {
            newsAdmins = await this.formatUser(newsAdmins);
            childLogger.info("Successfully formatted all news admins", { service: service });
        } catch (error) {
            childLogger.error("Failed to format all news admins", { service: service, error: error });
        }
        childLogger.info("Successfully returned all news admins", { service: service });
        return newsAdmins;
    }

    static async getAllUsers() {
        service = "getAllUsers";
        let users;
        try {
            users = await db.any('SELECT * FROM public."Users"');
            childLogger.info("Successfully got all users", { service: service });
        } catch (error) {
            childLogger.error("Failed to get all users", { service: service, error: error });
        }
        try {
            users = await this.formatUser(users);
            childLogger.info("Successfully formatted all users", { service: service });
        } catch (error) {
            childLogger.error("Failed to format all users", { service: service, error: error });
        }
        childLogger.info("Successfully returned all users", { service: service });
        return users;
    }

    static async requestNewsAdminAccess(userId) {
        service = "requestNewsAdminAccess";
        if (!userId) {
            childLogger.error("User id not provided", { service: service });
            return null; //if userId is undefined, then return null
        }
        let requestId;
        try {
            requestId = uuidv4();
            await db.any('INSERT INTO public."NewsAdminRequests" (request_id, user_id, date_of_request) VALUES ($1, $2, CURRENT_TIMESTAMP)', [requestId, userId]);
            childLogger.info("Successfully requested news admin access", { service: service, userId: userId, requestId: requestId });
        } catch (error) {
            childLogger.error("Failed to request news admin access", { service: service, userId: userId, requestId: requestId, error: error });
        }
    }

    static async toggleNewsAdmin(userId, isNewsAdmin) {
        service = "toggleNewsAdmin";
        if (!userId) {
            childLogger.error("User id not provided", { service: service });
            return null; //if userId is undefined, then return null
        }
        try {
            await db.any('UPDATE public."Users" SET "isNewsAdmin" = $1 WHERE "user_id" = $2', [isNewsAdmin, userId]);
            childLogger.info("Successfully toggled news admin", { service: service, userId: userId });
        } catch (error) {
            childLogger.error("Failed to toggle news admin", { service: service, userId: userId, error: error });
        }
    }

    static async findRefreshToken(refreshToken) {  //function to check if refreshToken is present in array of varchar named refreshTokens in the database
        service = "findRefreshToken";
        if (!refreshToken) {
            childLogger.error("Refresh token not provided", { service: service });
            return null; //if refreshToken is undefined, then return null
        }
        try {
            const result = await db.any('SELECT * FROM public."Users" WHERE $1 = ANY ("refreshTokens")', [refreshToken]);
            const user = result[0]; //if refreshToken is not present in database, then result will be an empty array and result[0] will be undefined
            if (!user) {
                childLogger.error("User with same refresh token not found", { service: service });
                return null;
            }
            childLogger.info("Successfully found user having refresh token", { service: service, userId: user.user_id });
            return user;
        } catch (error) {
            childLogger.error("Failed to find user having refresh token", { service: service, error: error });
        }
    }

    static async replaceRefreshTokens(userId, newRefreshTokens) { //function to replace all refreshTokens in array of varchar named refreshTokens in the database with newRefreshToken
        service = "replaceRefreshTokens";
        if (!userId) {
            childLogger.error("User id not provided", { service: service });
            return null; //if userId is undefined, then return null
        }
        if (!newRefreshTokens) newRefreshTokens = []; //if newRefreshTokens is undefined, then set newRefreshTokens to empty array
        try {
            await db.any('UPDATE public."Users" SET "refreshTokens" = $1 WHERE "user_id" = $2', [newRefreshTokens, userId]);
            childLogger.info("Successfully replaced refresh tokens", { service: service, userId: userId });
        } catch (error) {
            childLogger.error("Failed to replace refresh tokens", { service: service, userId: userId, error: error });
        }
    }
}

module.exports = User;