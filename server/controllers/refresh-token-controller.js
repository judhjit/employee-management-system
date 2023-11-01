const { createAccessToken, createRefreshToken } = require('../middlewares/create-jwt-token');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config("../.env");
const secretKey = process.env.JWT_SECRET_KEY;

async function handleRefreshToken(req, res) {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.status(401).json({ message: 'You are not logged in' });
    }
    const refreshToken = cookies.jwt;
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    let foundUser;
    try {
        foundUser = await User.findRefreshToken(refreshToken);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!foundUser) { //if refreshToken is not present in 
        jwt.verify(refreshToken, secretKey, async function (err, decoded) { //verify refresh token and check if it is expired or not and if it is expired then err will be set to true and decoded will be undefined else err will be set to null and decoded will be set to the decoded value of refresh token
            if (err) { //if refresh token is expired
                return res.status(403).json({ message: 'Forbidden' });
            }
            console.log("Attempted reuse of refresh token detected");
            let hackedUser;
            try {
                hackedUser = await User.findById(decoded.userId); //check if refreshToken is present in database
                hackedUser.refreshToken = []; //clear all refresh tokens
            } catch (error) {
                console.error(error);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            try {
                await User.replaceRefreshTokens(hackedUser.user_id, hackedUser.refreshToken); //replace all refreshTokens in array of varchar named refreshTokens in the database with newRefreshToken
            } catch (error) {
                console.error(error);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        });
        return res.status(403).json({ message: 'Forbidden! Attempted reuse of token.' });
    }

    const newRefreshTokenArray = foundUser.refreshTokens.filter((token) => token !== refreshToken); //remove refreshToken from foundUser.refreshTokens array
    if(!newRefreshTokenArray) newRefreshTokenArray = []; //if newRefreshTokenArray is undefined, then set newRefreshTokenArray to empty array
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        secretKey,
        async function (err, decoded) {
            if (err) {
                console.log('Expired refresh token')
                foundUser.refreshToken = [...newRefreshTokenArray];
                try {
                    await User.replaceRefreshTokens(foundUser.user_id, foundUser.refreshToken); //replace all refreshTokens in array of varchar named refreshTokens in the database with newRefreshToken
                } catch (error) {
                    console.error(error);
                    return res.status(500).json({ message: 'Internal Server Error' });
                }
            }

            if (err || foundUser.user_id !== decoded.userId) return res.status(403).json({ message: 'Forbidden' });

            // Refresh token was still valid and user is authorized to access the route
            const accessToken = createAccessToken(foundUser.user_id, foundUser.isAdmin, foundUser.isNewsAdmin);

            const newRefreshToken = createRefreshToken(foundUser.user_id);

            // Saving refreshToken with current user
            foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
            // const result = await foundUser.save();
            try {
                await User.replaceRefreshTokens(foundUser.user_id, foundUser.refreshToken); //replace all refreshTokens in array of varchar named refreshTokens in the database with newRefreshToken
            } catch (error) {
                console.error(error);
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            // Creates Secure Cookie with refresh token
            res.cookie("jwt", newRefreshToken, {
                withCredentials: true,
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: Number(process.env.JWT_REFRESH_TOKEN_EXPIRATION),
            });

            res.json({ accessToken, userId: foundUser.user_id, firstName: foundUser.first_name, lastName: foundUser.last_name, isAdmin: foundUser.isAdmin, isNewsAdmin: foundUser.isNewsAdmin });
        }
    );
}

module.exports = { handleRefreshToken }