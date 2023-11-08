const User = require('../models/user');
const NewsAdminAccessRequests = require('../models/news-admin-request');


async function getNewsAdmins(req, res, next) { //function to get all news admins
    let newsAdmins;
    try {
        newsAdmins = await User.getNewsAdmins();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!newsAdmins || newsAdmins.length === 0) {
        return res.status(404).json({ message: 'No news admins found' });
    }
    return res.status(200).json(newsAdmins);
}

async function getNewsAdminAccessRequests(req, res, next) { //function to get all news admin access requests
    let newsAdminAccessRequests;
    try {
        newsAdminAccessRequests = await NewsAdminAccessRequests.getAllNewsAdminRequests();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!newsAdminAccessRequests || newsAdminAccessRequests.length === 0) {
        return res.status(404).json({ message: 'No news admin access requests found' });
    }
    return res.status(200).json(newsAdminAccessRequests);
}

async function toggleNewsAdmin(req, res, next) { //function to toggle news admin status
    const userId = req.body.userId;
    const isNewsAdmin = req.body.isNewsAdmin;
    if (!userId || userId === "") {
        return res.status(400).json({ message: 'User ID not provided' });
    }
    if (isNewsAdmin === undefined) {
        return res.status(400).json({ message: 'News admin status not provided' });
    }
    try {
        await User.toggleNewsAdmin(userId, isNewsAdmin);
        await NewsAdminAccessRequests.deleteNewsAdminRequest(userId);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    return res.status(200).json({ message: 'News admin status updated successfully' });
}

async function deleteNewsAdminAccessRequest(req, res, next) { //function to delete news admin access request
    const userId = req.body.userId;
    if (!userId || userId === "") {
        return res.status(400).json({ message: 'User ID not provided' });
    }
    try {
        await NewsAdminAccessRequests.deleteNewsAdminRequest(userId);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    return res.status(200).json({ message: 'News admin access request deleted successfully' });
}

module.exports = {
    getNewsAdmins,
    getNewsAdminAccessRequests,
    toggleNewsAdmin,
    deleteNewsAdminAccessRequest
}