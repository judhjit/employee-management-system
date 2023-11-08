const User = require('../models/user');
const NewsAdminRequest = require('../models/news-admin-request');

async function requestNewsAdminAccess(req, res, next) {
    const userId = req.userId;
    if (!userId) {
        return res.status(400).json({ message: "User ID not provided" });
    }
    //check if user is already a news admin
    if (req.isNewsAdmin) {
        return res.status(400).json({ message: "User is already a news admin" });
    }
    //check if user has already requested for news admin access
    let existingRequest;
    try {
        existingRequest = await NewsAdminRequest.findRequestByUserId(userId);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
    if (existingRequest) {
        return res.status(400).json({ message: "User has already requested for news admin access" });
    }
    //create a new request
    try {
        await User.requestNewsAdminAccess(userId);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
    return res.status(201).json({ message: "News admin access requested successfully" });
}

module.exports = {
    requestNewsAdminAccess
}