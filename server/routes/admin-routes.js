const express = require('express');

const router = express.Router();

const adminBookingsControllers = require('../controllers/admin-all-booking-controller');
const adminNewsAdminControllers = require('../controllers/admin-news-admin-request-controller');


//Users list related routes
// /admin/getallusers => GET
router.get('/allusers', adminBookingsControllers.getUserList); //get all users

//Bookings related routes
// /admin/getallbookings => POST
router.post('/getallbookings', adminBookingsControllers.getAllFutureBookings); //get all or any of desk, cab, meal future bookings or bookings between dates based on request body parameters startDate and endDate (if present) for a particular userId (if present)

// /admin/countallbookings => POST
router.post('/countallbookings', adminBookingsControllers.getCountOfAllFutureBookings); //count all or any of desk, cab, meal future bookings or bookings between dates based on request body parameters startDate and endDate (if present) for a particular userId (if present)

//News Admin Access Related routes
// /admin/allnewsadmins => GET
router.get('/allnewsadmins', adminNewsAdminControllers.getNewsAdmins); //get all news admins

// /admin/allnewsadminaccessrequests => GET
router.get('/allnewsadminaccessrequests', adminNewsAdminControllers.getNewsAdminAccessRequests); //get all news admin access requests

// /admin/togglenewsadmin => PATCH
router.patch('/togglenewsadmin', adminNewsAdminControllers.toggleNewsAdmin); //toggle news admin status

// /admin/deletenewsadminaccessrequest => POST
router.post('/deletenewsadminaccessrequest', adminNewsAdminControllers.deleteNewsAdminAccessRequest); //delete news admin access request


module.exports = router;