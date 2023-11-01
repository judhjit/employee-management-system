const User = require("../models/user");
const createAccessToken = require("../middlewares/create-jwt-token").createAccessToken;
const createRefreshToken = require("../middlewares/create-jwt-token").createRefreshToken;

async function signup(req, res, next) {
    const { userId, firstName, lastName, email, password } = req.body;
    try {
        const existingUser = await User.findOne(email); //check if user already exists
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const user = new User(userId, firstName, lastName, email, password);
        try {
            await user.create(); //create user
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        return res.status(201).json({ message: "User signed in successfully", userId: user.userId, firstName: user.firstName, lastName: user.lastName, isAdmin: false, isNewsAdmin: false });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


async function login(req, res, next) {
    const cookies = req.cookies;
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email or password not provided" });
    }

    const user = new User("", "", "", email, password);

    let existingUser;

    try {
        existingUser = await User.findOne(email); //check if user already exists
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }

    if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
    }

    let passwordIsCorrect;

    try {
        passwordIsCorrect = await user.hasSamePassword(existingUser.password);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }

    if (!passwordIsCorrect) {
        return res.status(401).json({ message: "Password is incorrect" });
    }

    const accessToken = createAccessToken(existingUser.user_id, existingUser.isAdmin, existingUser.isNewsAdmin);
    const newRefreshToken = createRefreshToken(existingUser.user_id);

    let newRefreshTokenArray = !cookies?.jwt ? existingUser.refreshTokens : existingUser.refreshTokens.filter((token) => token !== cookies.jwt); //if cookies.jwt is undefined, then set newRefreshTokenArray to existingUser.refreshTokens, else set newRefreshTokenArray to existingUser.refreshTokens.filter((token) => token !== cookies.jwt) i.e. remove cookies.jwt from existingUser.refreshTokens array
    // console.log("newRefreshTokenArray: ", newRefreshTokenArray);
    if (!newRefreshTokenArray) newRefreshTokenArray = []; //if newRefreshTokenArray is undefined, then set newRefreshTokenArray to empty array
    if (cookies?.jwt) { //if cookies.jwt is defined
        const refreshToken = cookies.jwt;
        let foundToken;
        try {
            foundToken = await User.findRefreshToken(refreshToken); //check if refreshToken is present in database
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        if (!foundToken) { //if refreshToken is not present in database
            console.log("Reuse of refresh token detected at login for user: ", existingUser.user_id);
            newRefreshTokenArray = []; //set newRefreshTokenArray to empty array
        }
        res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: 'None' }); //clear cookie
        existingUser.refreshTokens = [...newRefreshTokenArray, newRefreshToken]; //add newRefreshToken to existingUser.refreshTokens array
        try {
            await User.replaceRefreshTokens(existingUser.user_id, existingUser.refreshTokens); //replace all refreshTokens in array of varchar named refreshTokens in the database with newRefreshToken
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        //reuse of refresh token detected so tells user that it is forbidden
        if (!foundToken) {
            return res.status(403).json({ message: "Forbidden! Token reuse detected." });
        }
    }

    existingUser.refreshTokens = [...newRefreshTokenArray, newRefreshToken]; //add newRefreshToken to existingUser.refreshTokens array
    try {
        await User.replaceRefreshTokens(existingUser.user_id, existingUser.refreshTokens); //replace all refreshTokens in array of varchar named refreshTokens in the database with newRefreshToken
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
    res.cookie("jwt", newRefreshToken, {
        withCredentials: true,
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: Number(process.env.JWT_REFRESH_TOKEN_EXPIRATION),
    }); //set cookie with token

    return res.status(200).json({ message: "User logged in successfully", accessToken: accessToken, userId: existingUser.user_id, firstName: existingUser.first_name, lastName: existingUser.last_name, isAdmin: existingUser.isAdmin, isNewsAdmin: existingUser.isNewsAdmin });
}


async function logout(req, res) {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.status(401).json({ message: "You are not logged in" });
    }
    const refreshToken = cookies.jwt;
    let foundUser;
    try {
        foundUser = await User.findRefreshToken(refreshToken); //check if refreshToken is present in database
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
    if (!foundUser) { //if refreshToken is not present in database
        res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: 'None' }); //clear cookie
        // return res.status(401).json({ message: "You are not logged in" });
        return res.status(200).json({ message: "User logged out successfully" });
    }

    foundUser.refreshTokens = foundUser.refreshTokens.filter((token) => token !== refreshToken); //remove refreshToken from foundUser.refreshTokens array
    try {
        await User.replaceRefreshTokens(foundUser.user_id, foundUser.refreshTokens); //replace all refreshTokens in array of varchar named refreshTokens in the database with newRefreshToken
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
    res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: 'None' }); //clear cookie
    return res.status(200).json({ message: "User logged out successfully" });
}


module.exports = {
    signup: signup,
    login: login,
    logout: logout,
}