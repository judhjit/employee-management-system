const User = require('../models/user');
const NewsAdminRequest = require('../models/news-admin-request');

const logger = require('../logger/index');
const childLogger = logger.child({ module: 'request-controller' });

let service = "";

async function requestNewsAdminAccess(req, res, next) {
    service = "requestNewsAdminAccess";
    const userId = req.userId;
    if (!userId) {
        childLogger.error("User ID not provided", { service: service });
        return res.status(400).json({ message: "User ID not provided" });
    }
    //check if user is already a news admin
    if (req.isNewsAdmin) {
        childLogger.error("User is already a news admin", { service: service });
        return res.status(400).json({ message: "User is already a news admin" });
    }
    //check if user has already requested for news admin access
    let existingRequest;
    try {
        childLogger.info("Finding request by user ID", { service: service, userId: userId });
        existingRequest = await NewsAdminRequest.findRequestByUserId(userId);
        childLogger.info("Successfully found request by user ID", { service: service, userId: userId });
    } catch (error) {
        childLogger.error("Failed to find request by user ID", { service: service, userId: userId, error: error });
        return res.status(500).json({ message: "Internal Server Error" });
    }
    if (existingRequest) {
        childLogger.error("User has already requested for news admin access", { service: service });
        return res.status(400).json({ message: "User has already requested for news admin access" });
    }
    //create a new request
    try {
        childLogger.info("Creating new request", { service: service, userId: userId });
        await User.requestNewsAdminAccess(userId);
        childLogger.info("Successfully created new request", { service: service, userId: userId });
    } catch (error) {
        childLogger.error("Failed to create new request", { service: service, userId: userId, error: error });
        return res.status(500).json({ message: "Internal Server Error" });
    }
    childLogger.info("Successfully requested news admin access and returned", { service: service, userId: userId });
    return res.status(201).json({ message: "News admin access requested successfully" });
}

module.exports = {
    requestNewsAdminAccess
}