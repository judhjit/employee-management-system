const express = require('express');

const router = express.Router();

const adminBookingsControllers = require('../controllers/admin-all-booking-controller');
const adminHolidayController = require('../controllers/admin-holiday-controller');
// const adminNewsAdminControllers = require('../controllers/admin-news-admin-request-controller');

//Users list related routes
// /admin/getallusers => GET
router.get('/allusers', adminBookingsControllers.getUserList); //get all users

//Bookings related routes
// /admin/getallbookings => POST
router.post('/getallbookings', adminBookingsControllers.getAllFutureBookings); //get all or any of desk, cab, meal future bookings or bookings between dates based on request body parameters startDate and endDate (if present) for a particular userId (if present)

// /admin/countallbookings => POST
router.post('/countallbookings', adminBookingsControllers.getCountOfAllFutureBookings); //count all or any of desk, cab, meal future bookings or bookings between dates based on request body parameters startDate and endDate (if present) for a particular userId (if present)


//holiday routes
// /admin/getholidaysofthisandupcomingyears => GET
router.get('/getholidaysofthisandupcomingyears', adminHolidayController.getAllHolidaysOfThisAndUpcomingYears); //get all holidays of this and upcoming years

// /admin/createholiday => POST
router.post('/createholiday', adminHolidayController.createHoliday); //create a holiday

// /admin/updateholidaydate => POST
router.post('/updateholidaydate', adminHolidayController.updateHolidayDate); //update a holiday

// /admin/updateholidayname => POST
router.post('/updateholidayname', adminHolidayController.updateHolidayName); //update a holiday

// /admin/deleteholiday => POST
router.post('/deleteholiday', adminHolidayController.deleteHoliday); //delete a holiday

module.exports = router;