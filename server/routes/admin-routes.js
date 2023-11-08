const express = require('express');

const router = express.Router();

const adminBookingsControllers = require('../controllers/admin-all-booking-controller');
const adminNewsAdminControllers = require('../controllers/admin-news-admin-request-controller');

//Bookings related routes
// /admin/allBookings => GET
router.get('/allBookings', adminBookingsControllers.getAllFutureBookings); //get all or any of desk, cab, meal future bookings or bookings between dates based on request body parameters startDate and endDate (if present)

//News Admin Access Related routes
// /admin/allNewsAdmins => GET
router.get('/allNewsAdmins', adminNewsAdminControllers.getNewsAdmins); //get all news admins

// /admin/allNewsAdminAccessRequests => GET
router.get('/allNewsAdminAccessRequests', adminNewsAdminControllers.getNewsAdminAccessRequests); //get all news admin access requests

// /admin/toggleNewsAdmin => PATCH
router.patch('/toggleNewsAdmin', adminNewsAdminControllers.toggleNewsAdmin); //toggle news admin status

// /admin/deleteNewsAdminAccessRequest => DELETE
router.delete('/deleteNewsAdminAccessRequest', adminNewsAdminControllers.deleteNewsAdminAccessRequest); //delete news admin access request


module.exports = router;