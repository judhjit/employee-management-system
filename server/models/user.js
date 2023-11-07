//User Model - User.js for POSTGRES

const db = require("../data/database");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
// const jwt = require("jsonwebtoken");

class User {
    constructor(userId, firstName, lastName, email, password) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    static async formatUser(user) {
        if (!user) return null; //if user is undefined, then return null
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
        return user;
    }

    async create() {
        try {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            const result = await db.any(
                'INSERT INTO public."Users" VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
                [this.userId, this.firstName, this.lastName, this.email, hashedPassword, false, false]
            );
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    async hasSamePassword(password) {
        try {
            return await bcrypt.compare(this.password, password);
        } catch (error) {
            console.error(error);
        }
    }

    static async findOne(email) {
        if (!email) return null; //if email is undefined, then return null
        try {
            const result = await db.any('SELECT * FROM public."Users" WHERE email = $1', [email]);
            const user = result[0];
            // console.log(user);
            return user;
        } catch (error) {
            console.error(error);
        }
    }

    static async findById(userId) {
        if (!userId) return null; //if userId is undefined, then return null
        try {
            const result = await db.any('SELECT * FROM public."Users" WHERE user_id = $1', [userId]);
            const user = result[0];
            return user;
        } catch (error) {
            console.error(error);
        }
    }

    static async getNewsAdmins() {
        let newsAdmins;
        try {
            newsAdmins = await db.any('SELECT * FROM public."Users" WHERE "isNewsAdmin" = true');
        } catch (error) {
            console.error(error);
        }
        try {
            newsAdmins = await this.formatUser(newsAdmins);
        } catch (error) {
            console.error(error);
        }
        return newsAdmins;
    }

    static async requestNewsAdminAccess(userId) {
        if (!userId) return null; //if userId is undefined, then return null
        let requestId;
        try {
            requestId = uuidv4();
            await db.any('INSERT INTO public."NewsAdminRequests" (request_id, user_id, date_of_request) VALUES ($1, $2, CURRENT_TIMESTAMP)', [requestId, userId]);
        } catch (error) {
            console.error(error);
        }
    }

    static async toggleNewsAdmin(userId, isNewsAdmin) {
        if (!userId) return null; //if userId is undefined, then return null
        try {
            await db.any('UPDATE public."Users" SET "isNewsAdmin" = $1 WHERE "user_id" = $2', [isNewsAdmin, userId]);
        } catch (error) {
            console.error(error);
        }
    }

    static async findRefreshToken(refreshToken) {  //function to check if refreshToken is present in array of varchar named refreshTokens in the database
        if (!refreshToken) return null; //if refreshToken is undefined, then return null
        try {
            const result = await db.any('SELECT * FROM public."Users" WHERE $1 = ANY ("refreshTokens")', [refreshToken]);
            const user = result[0]; //if refreshToken is not present in database, then result will be an empty array and result[0] will be undefined
            return user;
        } catch (error) {
            console.error(error);
        }
    }

    static async replaceRefreshTokens(userId, newRefreshTokens) { //function to replace all refreshTokens in array of varchar named refreshTokens in the database with newRefreshToken
        if (!userId) return null; //if userId is undefined, then return null
        if (!newRefreshTokens) newRefreshTokens = []; //if newRefreshTokens is undefined, then set newRefreshTokens to empty array
        try {
            await db.any('UPDATE public."Users" SET "refreshTokens" = $1 WHERE "user_id" = $2', [newRefreshTokens, userId]);
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = User;