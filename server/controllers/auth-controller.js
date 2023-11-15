const User = require("../models/user");
const createAccessToken = require("../middlewares/create-jwt-token").createAccessToken;
const createRefreshToken = require("../middlewares/create-jwt-token").createRefreshToken;

const logger = require('../logger/index');
const childLogger = logger.child({ module: 'auth-controller' });

let service = "";

async function signup(req, res, next) {
    service = "signup";
    const { userId, firstName, lastName, email, password, confirmPassword } = req.body;
    //verify if all fields are present
    if (!userId || userId === "") {
        childLogger.error("User ID not provided", { service: service });
        return res.status(400).json({ message: "User ID not provided" });
    }
    if (!firstName || firstName === "") {
        childLogger.error("First name not provided", { service: service });
        return res.status(400).json({ message: "First name not provided" });
    }
    if (!lastName || lastName === "") {
        childLogger.error("Last name not provided", { service: service });
        return res.status(400).json({ message: "Last name not provided" });
    }
    if (!email || email === "") {
        childLogger.error("Email not provided", { service: service });
        return res.status(400).json({ message: "Email not provided" });
    }
    if(email.length <= 13) {
        childLogger.error("Email must be more than 13 characters", { service: service });
        return res.status(400).json({ message: "Email must be more than 13 characters" });
    }
    //verify that email belongs to abcgroup domain
    if (!email.endsWith("@abcgroup.com")) {
        childLogger.error("Email must belong to abcgroup domain", { service: service });
        return res.status(400).json({ message: "Email must belong to abcgroup domain" });
    }
    if (!password || password === "") {
        childLogger.error("Password not provided", { service: service });
        return res.status(400).json({ message: "Password not provided" });
    }
    //verify that password contains 6 or more characters
    if (password.length < 6) {
        childLogger.error("Password must contain 6 or more characters", { service: service });
        return res.status(400).json({ message: "Password must contain 6 or more characters" });
    }
    //verify that password contains at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&_-]{8,}$/;
    // if (!passwordRegex.test(password)) {
    //     return res.status(400).json({ message: "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character" });
    // }
    if (!confirmPassword || confirmPassword === "") {
        childLogger.error("Confirm password not provided", { service: service });
        return res.status(400).json({ message: "Confirm password not provided" });
    }
    //verify if password and confirm password are same
    if (password !== confirmPassword) {
        childLogger.error("Password and confirm password do not match", { service: service });
        return res.status(400).json({ message: "Password and confirm password do not match" });
    }
    try {
        childLogger.info("Finding user with same email", { service: service, request: { userId: userId, email: email } });
        const existingUser = await User.findOne(email); //check if user already exists
        childLogger.info("Successfully found user with same email", { service: service, request: { userId: userId, email: email} });
        if (existingUser) {
            childLogger.error("User already exists", { service: service, request: { userId: userId, email: email} });
            return res.status(400).json({ message: "User already exists" });
        }
        childLogger.info("Finding user with same userId", { service: service, request: { userId: userId, email: email } });
        const existingUserWithSameUserId = await User.findById(userId); //check if user already exists
        childLogger.info("Successfully found user with same userId", { service: service, request: { userId: userId, email: email } });
        if (existingUserWithSameUserId) {
            childLogger.error("User already exists", { service: service, request: { userId: userId, email: email } });
            return res.status(400).json({ message: "User already exists" });
        }
        const user = new User(userId, firstName, lastName, email, password);
        try {
            childLogger.info("Creating user", { service: service, request: { userId: userId, email: email} });
            await user.create(); //create user
            childLogger.info("Successfully created user", { service: service, request: { userId: userId, email: email } });
        }
        catch (error) {
            childLogger.error("Failed to create user", { service: service, request: { userId: userId, email: email }, error: error });
            return res.status(500).json({ message: "Internal Server Error" });
        }
        childLogger.info("Successfully signed in user", { service: service, userId: userId, request: { userId: userId, email: email } });
        return res.status(201).json({ message: "User signed in successfully", userId: user.userId, firstName: user.firstName, lastName: user.lastName, isAdmin: false, isNewsAdmin: false });
    } catch (error) {
        childLogger.error("Failed to sign in user", { service: service, request: { userId: userId, email: email }, error: error });
        res.status(500).json({ message: "Internal Server Error" });
    }
};


async function login(req, res, next) {
    service = "login";
    const cookies = req.cookies;
    const { email, password } = req.body;
    if (!email || !password) {
        childLogger.error("Email or password not provided", { service: service, request: { email: email } });
        return res.status(400).json({ message: "Email or password not provided" });
    }

    childLogger.info("Creating user object", { service: service, request: { email: email } });
    const user = new User("", "", "", email, password);
    childLogger.info("Successfully created user object", { service: service, request: { email: email } });

    let existingUser;

    try {
        childLogger.info("Finding user with same email", { service: service, request: { email: email } });
        existingUser = await User.findOne(email); //check if user already exists
        childLogger.info("Successfully found user with same email", { service: service, request: { email: email } });
    } catch (error) {
        childLogger.error("Failed to find user with same email", { service: service, error: error, request: { email: email } });
        return res.status(500).json({ message: "Internal Server Error" });
    }

    if (!existingUser) {
        childLogger.error("User not found", { service: service, request: { email: email } });
        return res.status(404).json({ message: "User not found" });
    }

    let passwordIsCorrect;

    try {
        childLogger.info("Checking if password is correct", { service: service, request: { email: email } });
        passwordIsCorrect = await user.hasSamePassword(existingUser.password);
        childLogger.info("Successfully checked if password is correct", { service: service, request: { email: email } });
    } catch (error) {
        childLogger.error("Failed to check if password is correct", { service: service, error: error, request: { email: email } });
        return res.status(500).json({ message: "Internal Server Error" });
    }

    if (!passwordIsCorrect) {
        childLogger.error("Password is incorrect", { service: service, request: { email: email } });
        return res.status(401).json({ message: "Password is incorrect" });
    }

    childLogger.info("Creating access and refresh tokens", { service: service, userId: existingUser.user_id });
    const accessToken = createAccessToken(existingUser.user_id, existingUser.isAdmin, existingUser.isNewsAdmin);
    const newRefreshToken = createRefreshToken(existingUser.user_id);
    childLogger.info("Successfully created access and refresh tokens", { service: service, userId: existingUser.user_id });

    let newRefreshTokenArray = !cookies?.jwt ? existingUser.refreshTokens : existingUser.refreshTokens.filter((token) => token !== cookies.jwt); //if cookies.jwt is undefined, then set newRefreshTokenArray to existingUser.refreshTokens, else set newRefreshTokenArray to existingUser.refreshTokens.filter((token) => token !== cookies.jwt) i.e. remove cookies.jwt from existingUser.refreshTokens array
    if (!newRefreshTokenArray) newRefreshTokenArray = []; //if newRefreshTokenArray is undefined, then set newRefreshTokenArray to empty array
    if (cookies?.jwt) { //if cookies.jwt is defined
        const refreshToken = cookies.jwt;
        let foundToken;
        try {
            childLogger.info("Finding refresh token", { service: service, userId: existingUser.user_id });
            foundToken = await User.findRefreshToken(refreshToken); //check if refreshToken is present in database
            childLogger.info("Successfully found refresh token", { service: service, userId: existingUser.user_id });
        } catch (error) {
            childLogger.error("Failed to find refresh token", { service: service, userId: existingUser.user_id, error: error });
            return res.status(500).json({ message: "Internal Server Error" });
        }
        if (!foundToken) { //if refreshToken is not present in database
            childLogger.error("Reuse of refresh token detected at login", { service: service, userId: existingUser.user_id });
            newRefreshTokenArray = []; //set newRefreshTokenArray to empty array
        }
        res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: 'None' }); //clear cookie
        existingUser.refreshTokens = [...newRefreshTokenArray, newRefreshToken]; //add newRefreshToken to existingUser.refreshTokens array
        try {
            childLogger.info("Replacing refresh tokens", { service: service, userId: existingUser.user_id });
            await User.replaceRefreshTokens(existingUser.user_id, existingUser.refreshTokens); //replace all refreshTokens in array of varchar named refreshTokens in the database with newRefreshToken
            childLogger.info("Successfully replaced refresh tokens", { service: service, userId: existingUser.user_id });
        } catch (error) {
            childLogger.error("Failed to replace refresh tokens", { service: service, userId: existingUser.user_id, error: error });
            return res.status(500).json({ message: "Internal Server Error" });
        }
        //reuse of refresh token detected so tell user that it is forbidden
        if (!foundToken) {
            childLogger.error("Forbidden! Reuse of refresh token detected", { service: service, userId: existingUser.user_id });
            return res.status(403).json({ message: "Forbidden! Token reuse detected." });
        }
    }

    existingUser.refreshTokens = [...newRefreshTokenArray, newRefreshToken]; //add newRefreshToken to existingUser.refreshTokens array
    try {
        childLogger.info("Replacing refresh tokens", { service: service, userId: existingUser.user_id });
        await User.replaceRefreshTokens(existingUser.user_id, existingUser.refreshTokens); //replace all refreshTokens in array of varchar named refreshTokens in the database with newRefreshToken
        childLogger.info("Successfully replaced refresh tokens", { service: service, userId: existingUser.user_id });
    } catch (error) {
        childLogger.error("Failed to replace refresh tokens", { service: service, userId: existingUser.user_id, error: error });
        return res.status(500).json({ message: "Internal Server Error" });
    }
    childLogger.info("Setting cookie", { service: service, userId: existingUser.user_id });
    res.cookie("jwt", newRefreshToken, {
        withCredentials: true,
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: Number(process.env.JWT_REFRESH_TOKEN_EXPIRATION),
    }); //set cookie with token
    childLogger.info("Successfully logged in user", { service: service, userId: existingUser.user_id });
    return res.status(200).json({ message: "User logged in successfully", accessToken: accessToken, userId: existingUser.user_id, firstName: existingUser.first_name, lastName: existingUser.last_name, email: existingUser.email, isAdmin: existingUser.isAdmin, isNewsAdmin: existingUser.isNewsAdmin });
}


async function logout(req, res) {
    service = "logout";
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        childLogger.error("User not logged in", { service: service });
        return res.status(401).json({ message: "You are not logged in" });
    }
    const refreshToken = cookies.jwt;
    let foundUser;
    try {
        childLogger.info("Finding refresh token", { service: service });
        foundUser = await User.findRefreshToken(refreshToken); //check if refreshToken is present in database
        childLogger.info("Successfully found refresh token", { service: service });
    } catch (error) {
        childLogger.error("Failed to find refresh token", { service: service, error: error });
        return res.status(500).json({ message: "Internal Server Error" });
    }
    if (!foundUser) { //if refreshToken is not present in database then user is not logged in
        childLogger.info("Clearing cookie", { service: service });
        res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: 'None' }); //clear cookie
        childLogger.error("User not logged in", { service: service });
        return res.status(401).json({ message: "You are not logged in" });
        // return res.status(200).json({ message: "User logged out successfully" });
    }

    foundUser.refreshTokens = foundUser.refreshTokens.filter((token) => token !== refreshToken); //remove refreshToken from foundUser.refreshTokens array
    try {
        childLogger.info("Replacing refresh tokens", { service: service, userId: foundUser.user_id });
        await User.replaceRefreshTokens(foundUser.user_id, foundUser.refreshTokens); //replace all refreshTokens in array of varchar named refreshTokens in the database with newRefreshToken
        childLogger.info("Successfully replaced refresh tokens", { service: service, userId: foundUser.user_id });
    } catch (error) {
        childLogger.error("Failed to replace refresh tokens", { service: service, userId: foundUser.user_id, error: error });
        return res.status(500).json({ message: "Internal Server Error" });
    }
    childLogger.info("Clearing cookie", { service: service, userId: foundUser.user_id });
    res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: 'None' }); //clear cookie
    childLogger.info("Successfully logged out user", { service: service, userId: foundUser.user_id });
    return res.status(200).json({ message: "User logged out successfully" });
}


module.exports = {
    signup: signup,
    login: login,
    logout: logout,
}