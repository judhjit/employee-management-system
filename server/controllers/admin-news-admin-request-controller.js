const User = require('../models/user');
const NewsAdminAccessRequests = require('../models/news-admin-request');

const logger = require('../logger/index');
const childLogger = logger.child({ module: 'admin-news-admin-request-controller' });

let service = "";

async function getNewsAdmins(req, res, next) { //function to get all news admins
    service = "getNewsAdmins";
    let newsAdmins;
    try {
        childLogger.info("Getting all news admins", { service: service, userId: req.userId });
        newsAdmins = await User.getNewsAdmins();
        childLogger.info("Successfully got all news admins", { service: service, userId: req.userId });
    } catch (error) {
        childLogger.error("Failed to get all news admins", { service: service, userId: req.userId, error: error });
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!newsAdmins || newsAdmins.length === 0) {
        childLogger.info("No news admins found", { service: service, userId: req.userId });
        return res.status(404).json({ message: 'No news admins found' });
    }
    childLogger.info("Successfully returned all news admins", { service: service, userId: req.userId });
    return res.status(200).json(newsAdmins);
}

async function getNewsAdminAccessRequests(req, res, next) { //function to get all news admin access requests
    service = "getNewsAdminAccessRequests";
    let newsAdminAccessRequests;
    try {
        childLogger.info("Getting all news admin access requests", { service: service, userId: req.userId });
        newsAdminAccessRequests = await NewsAdminAccessRequests.getAllNewsAdminRequests();
        childLogger.info("Successfully got all news admin access requests", { service: service, userId: req.userId });
    } catch (error) {
        childLogger.error("Failed to get all news admin access requests", { service: service, userId: req.userId, error: error });
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!newsAdminAccessRequests || newsAdminAccessRequests.length === 0) {
        childLogger.info("No news admin access requests found", { service: service, userId: req.userId });
        return res.status(404).json({ message: 'No news admin access requests found' });
    }
    childLogger.info("Successfully returned all news admin access requests", { service: service, userId: req.userId });
    return res.status(200).json(newsAdminAccessRequests);
}

async function toggleNewsAdmin(req, res, next) { //function to toggle news admin status
    service = "toggleNewsAdmin";
    const userId = req.body.userId;
    const isNewsAdmin = req.body.isNewsAdmin;
    if (!userId || userId === "") {
        childLogger.error("User ID not provided", { service: service, userId: req.userId });
        return res.status(400).json({ message: 'User ID not provided' });
    }
    if (isNewsAdmin === undefined) {
        childLogger.error("News admin status not provided", { service: service, userId: req.userId });
        return res.status(400).json({ message: 'News admin status not provided' });
    }
    try {
        childLogger.info("Toggling news admin status", { service: service, userId: req.userId, request: {userId: req.body.userId, isNewsAdmin: req.body.isNewsAdmin} });
        await User.toggleNewsAdmin(userId, isNewsAdmin);
        childLogger.info("Successfully toggled news admin status", { service: service, userId: req.userId, request: {userId: req.body.userId, isNewsAdmin: req.body.isNewsAdmin} });
        childLogger.info("Deleting news admin access request", { service: service, userId: req.userId, request: {userId: req.body.userId, isNewsAdmin: req.body.isNewsAdmin} });
        await NewsAdminAccessRequests.deleteNewsAdminRequest(userId);
        childLogger.info("Successfully deleted news admin access request", { service: service, userId: req.userId, request: {userId: req.body.userId, isNewsAdmin: req.body.isNewsAdmin} });
    } catch (error) {
        childLogger.error("Failed to toggle news admin status", { service: service, userId: req.userId, request: {userId: req.body.userId, isNewsAdmin: req.body.isNewsAdmin}, error: error });
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    childLogger.info("Successfully toggled news admin status and returned", { service: service, userId: req.userId, request: {userId: req.body.userId, isNewsAdmin: req.body.isNewsAdmin} });
    return res.status(200).json({ message: 'News admin status updated successfully' });
}

async function deleteNewsAdminAccessRequest(req, res, next) { //function to delete news admin access request
    service = "deleteNewsAdminAccessRequest";
    const userId = req.body.userId;
    if (!userId || userId === "") {
        childLogger.error("User ID not provided", { service: service, userId: req.userId });
        return res.status(400).json({ message: 'User ID not provided' });
    }
    try {
        childLogger.info("Deleting news admin access request", { service: service, userId: req.userId, request: {userId: req.body.userId} });
        await NewsAdminAccessRequests.deleteNewsAdminRequest(userId);
        childLogger.info("Successfully deleted news admin access request", { service: service, userId: req.userId, request: {userId: req.body.userId} });
    } catch (error) {
        childLogger.error("Failed to delete news admin access request", { service: service, userId: req.userId, request: {userId: req.body.userId}, error: error });
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    childLogger.info("Successfully deleted news admin access request and returned", { service: service, userId: req.userId, request: {userId: req.body.userId} });
    return res.status(200).json({ message: 'News admin access request deleted successfully' });
}

module.exports = {
    getNewsAdmins,
    getNewsAdminAccessRequests,
    toggleNewsAdmin,
    deleteNewsAdminAccessRequest
}