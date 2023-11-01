//User Model - User.js for POSTGRES

const db = require("../data/database");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

class User {
    constructor(userId, firstName, lastName, email, password) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
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

    // async createToken() {
    //     try {
    //         const token = jwt.sign({ userId: this.userId }, process.env.JWT_SECRET_KEY, {
    //             expiresIn: process.env.JWT_TOKEN_EXPIRATION,
    //         });
    //         return token;
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    static async findOne(email) {
        if(!email) return null; //if email is undefined, then return null
        try {
            // console.log(email);
            // const result = await db.query('SELECT * FROM public."Users" WHERE email = $1', [email]);
            const result = await db.any('SELECT * FROM public."Users" WHERE email = $1', [email]);
            // console.log(result.rows);
            const user = result[0];
            // console.log(user);
            return user;
        } catch (error) {
            console.error(error);
        }
    }

    static async findById(userId) {
        if(!userId) return null; //if userId is undefined, then return null
        try {
            const result = await db.any('SELECT * FROM public."Users" WHERE user_id = $1', [userId]);
            const user = result[0];
            return user;
        } catch (error) {
            console.error(error);
        }
    }

    static async toggleAdmin(userId, isAdmin) {
        if(!userId) return null; //if userId is undefined, then return null
        try {
            await db.any('UPDATE public."Users" SET "isAdmin" = $1 WHERE "user_id" = $2', [isAdmin, userId]);
        } catch (error) {
            console.error(error);
        }
    }

    static async toggleNewsAdmin(userId, isNewsAdmin) {
        if(!userId) return null; //if userId is undefined, then return null
        try {
            await db.any('UPDATE public."Users" SET "isNewsAdmin" = $1 WHERE "user_id" = $2', [isNewsAdmin, userId]);
        } catch (error) {
            console.error(error);
        }
    }

    static async findRefreshToken(refreshToken) {  //function to check if refreshToken is present in array of varchar named refreshTokens in the database
        if(!refreshToken) return null; //if refreshToken is undefined, then return null
        try {
            const result = await db.any('SELECT * FROM public."Users" WHERE $1 = ANY ("refreshTokens")', [refreshToken]);
            const user = result[0]; //if refreshToken is not present in database, then result will be an empty array and result[0] will be undefined
            return user;
        } catch (error) {
            console.error(error);
        }
    }

    static async replaceRefreshTokens(userId, newRefreshTokens) { //function to replace all refreshTokens in array of varchar named refreshTokens in the database with newRefreshToken
        if(!userId) return null; //if userId is undefined, then return null
        if(!newRefreshTokens) newRefreshTokens = []; //if newRefreshTokens is undefined, then set newRefreshTokens to empty array
        try {
            await db.any('UPDATE public."Users" SET "refreshTokens" = $1 WHERE "user_id" = $2', [newRefreshTokens, userId]);
        } catch (error) {
            console.error(error);
        }
    }

    // static async addRefreshToken(userId, refreshToken) { //function to add refreshToken to array of varchar named refreshTokens in the database
    //     try {
    //         await db.any('UPDATE public."Users" SET "refreshTokens" = array_append("refreshTokens", $1) WHERE "user_id" = $2', [refreshToken, userId]);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // static async deleteRefreshToken(userId, refreshToken) { //function to delete refreshToken from array of varchar named refreshTokens in the database
    //     try {
    //         await db.any('UPDATE public."Users" SET "refreshTokens" = array_remove("refreshTokens", $1) WHERE "user_id" = $2', [refreshToken, userId]);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // static async deleteAllRefreshTokens(userId) { //function to delete all refreshTokens from array of varchar named refreshTokens in the database
    //     try {
    //         await db.any('UPDATE public."Users" SET "refreshTokens" = NULL WHERE "user_id" = $1', [userId]);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

}

module.exports = User;