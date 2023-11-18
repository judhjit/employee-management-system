const { createAccessToken, createRefreshToken } = require('../middlewares/create-jwt-token');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config("../.env");
const secretKey = process.env.JWT_SECRET_KEY;

const logger = require('../logger/index');
const childLogger = logger.child({ module: 'refresh-token-controller' });

let service = "";

async function handleRefreshToken(req, res) {
    service = "handleRefreshToken";
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        childLogger.error("You are not logged in", { service: service });
        return res.status(401).json({ message: 'You are not logged in' });
    }
    const refreshToken = cookies.jwt;
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    let foundUser;
    try {
        childLogger.info("Finding user with refresh token", { service: service });
        foundUser = await User.findRefreshToken(refreshToken);
        childLogger.info("Successfully found user with refresh token", { service: service });
    } catch (error) {
        childLogger.error("Failed to find user with refresh token", { service: service, error: error });
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!foundUser) { //if refreshToken is not present in database
        jwt.verify(refreshToken, secretKey, async function (err, decoded) { //verify refresh token and check if it is expired or not and if it is expired then err will be set to true and decoded will be undefined else err will be set to null and decoded will be set to the decoded value of refresh token
            if (err) { //if refresh token is expired
                childLogger.error("Expired refresh token detected", { service: service, error: err });
                return res.status(403).json({ message: 'Forbidden' });
            }
            childLogger.error("Attempted reuse of refresh token detected", { service: service, userId: decoded.userId });
            let hackedUser;
            try {
                childLogger.info("Finding user with user ID", { service: service, userId: decoded.userId });
                hackedUser = await User.findById(decoded.userId); //check if refreshToken is present in database
                childLogger.info("Successfully found user with user ID", { service: service, userId: decoded.userId });
                hackedUser.refreshToken = []; //clear all refresh tokens
            } catch (error) {
                childLogger.error("Failed to find user with user ID", { service: service, userId: decoded.userId, error: error });
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            try {
                childLogger.info("Replacing all refresh tokens with new refresh token", { service: service, userId: decoded.userId });
                await User.replaceRefreshTokens(hackedUser.user_id, hackedUser.refreshToken); //replace all refreshTokens in array of varchar named refreshTokens in the database with newRefreshToken
                childLogger.info("Successfully replaced all refresh tokens with new refresh token", { service: service, userId: decoded.userId });
            } catch (error) {
                childLogger.error("Failed to replace all refresh tokens with new refresh token", { service: service, userId: decoded.userId, error: error });
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        });
        childLogger.error("Forbidden! Attempted reuse of token.", { service: service });
        return res.status(403).json({ message: 'Forbidden! Attempted reuse of token.' });
    }

    const newRefreshTokenArray = foundUser.refreshTokens.filter((token) => token !== refreshToken); //remove refreshToken from foundUser.refreshTokens array
    if (!newRefreshTokenArray) newRefreshTokenArray = []; //if newRefreshTokenArray is undefined, then set newRefreshTokenArray to empty array
    // evaluate jwt 
    childLogger.info("Verifying refresh token", { service: service });
    jwt.verify(
        refreshToken,
        secretKey,
        async function (err, decoded) {
            if (err) {
                childLogger.error("Expired refresh token detected", { service: service, error: err });
                foundUser.refreshToken = [...newRefreshTokenArray];
                try {
                    childLogger.info("Replacing all refresh tokens with new refresh token", { service: service, userId: decoded.userId });
                    await User.replaceRefreshTokens(foundUser.user_id, foundUser.refreshToken); //replace all refreshTokens in array of varchar named refreshTokens in the database with newRefreshToken
                    childLogger.info("Successfully replaced all refresh tokens with new refresh token", { service: service, userId: decoded.userId });
                } catch (error) {
                    childLogger.error("Failed to replace all refresh tokens with new refresh token", { service: service, userId: decoded.userId, error: error });
                    return res.status(500).json({ message: 'Internal Server Error' });
                }
            }

            if (err || foundUser.user_id !== decoded.userId){
                childLogger.error("Forbidden", { service: service, error: err, userId: decoded.userId });
                return res.status(403).json({ message: 'Forbidden' });
            }

            childLogger.info("Creating new access and refresh tokens", { service: service, userId: decoded.userId });
            // Refresh token was still valid and user is authorized to access the route
            const accessToken = createAccessToken(foundUser.user_id, foundUser.isAdmin, foundUser.isNewsAdmin);

            const newRefreshToken = createRefreshToken(foundUser.user_id);
            childLogger.info("Successfully created new access and refresh tokens", { service: service, userId: decoded.userId });

            // Saving refreshToken with current user
            foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
            // const result = await foundUser.save();
            try {
                childLogger.info("Replacing all refresh tokens with new refresh token", { service: service, userId: decoded.userId });
                await User.replaceRefreshTokens(foundUser.user_id, foundUser.refreshToken); //replace all refreshTokens in array of varchar named refreshTokens in the database with newRefreshToken
                childLogger.info("Successfully replaced all refresh tokens with new refresh token", { service: service, userId: decoded.userId });
            } catch (error) {
                childLogger.error("Failed to replace all refresh tokens with new refresh token", { service: service, userId: decoded.userId, error: error });
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            childLogger.info("Setting cookies", { service: service, userId: decoded.userId });
            // Creates Secure Cookie with refresh token
            res.cookie("jwt", newRefreshToken, {
                withCredentials: true,
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: Number(process.env.JWT_REFRESH_TOKEN_EXPIRATION),
            });

            childLogger.info("Successfully set refresh token in cookies and returned the access token", { service: service, userId: decoded.userId });
            res.status(200).json({ message: 'Access token refreshed successfully', accessToken, ttl: process.env.JWT_ACCESS_TOKEN_EXPIRATION });
        }
    );
}

module.exports = { handleRefreshToken }