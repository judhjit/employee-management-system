const jwt = require('jsonwebtoken');
require('dotenv').config("../.env");
const secretKey = process.env.JWT_SECRET_KEY;


const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization; //access token is sent in the authorization header
    if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ message: 'Access token missing' });
    const token = authHeader.split(' ')[1]; //access token is sent in the authorization header in the format: Bearer <access_token>
    // console.log(token);
    jwt.verify(
        token,
        secretKey,
        (err, decoded) => {
            if (err) return res.status(401).json({ message: 'Invalid access token' });
            // console.log(decoded);   
            req.userId = decoded.UserInfo.userId;
            req.isAdmin = decoded.UserInfo.isAdmin;
            req.isNewsAdmin = decoded.UserInfo.isNewsAdmin;
            next();
        }
    );
}

module.exports = verifyJWT