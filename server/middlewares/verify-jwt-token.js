const jwt = require('jsonwebtoken');
require('dotenv').config("../.env");
const secretKey = process.env.JWT_SECRET_KEY;

const logger = require('../logger/index');
const childLogger = logger.child({ module: 'verify-jwt-token' });

let service = "";

const verifyJWT = (req, res, next) => {
    service = "verifyJWT";
    const authHeader = req.headers.authorization || req.headers.Authorization; //access token is sent in the authorization header
    if (!authHeader?.startsWith('Bearer ')){
        childLogger.error("Access token missing", { service: service });
        return res.status(401).json({ message: 'Access token missing' });
    }
    const token = authHeader.split(' ')[1]; //access token is sent in the authorization header in the format: Bearer <access_token>
    jwt.verify(
        token,
        secretKey,
        (err, decoded) => {
            if (err) {
                childLogger.error("Access token invalid", { service: service });
                return res.status(401).json({ message: 'Access token invalid' });
            }
            req.userId = decoded.UserInfo.userId;
            req.isAdmin = decoded.UserInfo.isAdmin;
            req.isNewsAdmin = decoded.UserInfo.isNewsAdmin;
            childLogger.info("Access token verified", { service: service, userId: req.userId });
            next();
        }
    );
}

module.exports = verifyJWT