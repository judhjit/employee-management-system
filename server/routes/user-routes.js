const express = require('express');

const router = express.Router();

const userAllBookingsControllers = require('../controllers/user-all-booking-controller');
// const newsFeedControllers = require('../controllers/news-controller');
// const newsAdminRequestControllers = require('../controllers/request-controller');
// const userDeskAvailabilityControllers = require('../controllers/user-desk-controller');

//Bookings related routes
// /user/getbookings => POST
router.post('/getbookings', userAllBookingsControllers.getAllFutureBookingsForUser); //get all or any of desk, cab, meal future bookings or bookings between dates for user based on request body parameters startDate and endDate (if present)

// /user/bookings => POST
router.post('/bookings', userAllBookingsControllers.bookAll); //book all or any of desk, cab and food

// /user/bookings => PATCH
router.patch('/bookings', userAllBookingsControllers.modifyAll); //update all or any of cab and food

// /user/deletebookings => POST
router.post('/deletebookings', userAllBookingsControllers.cancelAll); //cancel all or any of desk, cab and food

// /user/getcountofallbookings => POST
router.post('/getcountofallbookings', userAllBookingsControllers.getCountOfAllFutureBookingsForUser); //count all or any of desk, cab, meal future bookings or bookings between dates for user based on request body parameters startDate and endDate (if present)

//Desk availability related routes
// /user/getdesks => POST
// router.post('/getdesks', userDeskAvailabilityControllers.getDesksAvailabilityByDatesObj); //get all desks availability with booked by name for multiple dates


// //News Feed related routes
// // /user/news => GET
// router.get('/news', newsFeedControllers.getNewsFeedPosts); //get all news feed posts

// //News Admin Request related routes
// // /user/requestnewsadminaccess => POST
// router.post('/requestnewsadminaccess', newsAdminRequestControllers.requestNewsAdminAccess); //create a news admin request

module.exports = router;