require("dotenv").config("../.env");
const jwt = require("jsonwebtoken");

function createAccessToken(userId, isAdmin, isNewsAdmin) {
    return jwt.sign(
        {
            "UserInfo": {
                "userId": userId,
                "isAdmin": isAdmin,
                "isNewsAdmin": isNewsAdmin
            },
            exp: Math.floor(Date.now() / 1000) + Number(process.env.JWT_ACCESS_TOKEN_EXPIRATION)
        }, process.env.JWT_SECRET_KEY);
};

function createRefreshToken(userId) {
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