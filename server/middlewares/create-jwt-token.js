require("dotenv").config("../.env");
const jwt = require("jsonwebtoken");

const logger = require('../logger/index');
const childLogger = logger.child({ module: 'create-jwt-token' });

let service = "";

function createAccessToken(userId, isAdmin) {
    service = "createAccessToken";
    childLogger.info("Creating access token", { service: service, userId: userId });
    return jwt.sign(
        {
            "UserInfo": {
                "userId": userId,
                "isAdmin": isAdmin,
            },
            exp: Math.floor(Date.now() / 1000) + Number(process.env.JWT_ACCESS_TOKEN_EXPIRATION)
        }, process.env.JWT_SECRET_KEY);
};

function createRefreshToken(userId) {
    service = "createRefreshToken";
    childLogger.info("Creating refresh token", { service: service, userId: userId });
    return jwt.sign(
        {
            "userId": userId,
            exp: Math.floor(Date.now() / 1000) + Number(process.env.JWT_REFRESH_TOKEN_EXPIRATION)
        }, process.env.JWT_SECRET_KEY);
};

module.exports = {
    createAccessToken: createAccessToken,
    createRefreshToken: createRefreshToken,
}