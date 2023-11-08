const express = require('express');

const router = express.Router();

const userAllBookingsControllers = require('../controllers/user-all-booking-controller');
const newsFeedControllers = require('../controllers/news-controller');
const newsAdminRequestControllers = require('../controllers/request-controller');
const userDeskAvailabilityControllers = require('../controllers/user-desk-controller');

//Bookings related routes
// /user/bookings => GET
router.get('/bookings', userAllBookingsControllers.getAllFutureBookingsForUser); //get all or any of desk, cab, meal future bookings or bookings between dates for user based on request body parameters startDate and endDate (if present)

// /user/bookings => POST
router.post('/bookings', userAllBookingsControllers.bookAll); //book all or any of desk, cab and food

// /user/bookings => PATCH
router.patch('/bookings', userAllBookingsControllers.modifyAll); //update all or any of cab and food

// /user/bookings => DELETE
router.delete('/bookings', userAllBookingsControllers.cancelAll); //cancel all or any of desk, cab and food


//Desk availability related routes
// /user/desks => GET
router.get('/desks', userDeskAvailabilityControllers.getDesksAvailabilityByDatesObj); //get all desks availability with booked by name for multiple dates


//News Feed related routes
// /user/news => GET
router.get('/news', newsFeedControllers.getNewsFeedPosts); //get all news feed posts

//News Admin Request related routes
// /user/requestNewsAdminAccess => POST
router.post('/requestNewsAdminAccess', newsAdminRequestControllers.requestNewsAdminAccess); //create a news admin request

module.exports = router;