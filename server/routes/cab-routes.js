const express = require('express');

const router = express.Router();

const cabControllers = require('../controllers/cab-controller');

// /cabs/user => GET
router.get('/user', cabControllers.getFutureCabBookingsForUser); //get future cab bookings for a user

// /cabs/user/all => GET
router.get('/user/all', cabControllers.getCabBookingsForUser); //get all cab bookings for a user

// /cabs/book => POST
router.post('/book', cabControllers.bookCab); //book a cab using user id and work slot for multiple dates (array of dates) by inserting them into cab bookings table

// /cabs/update => PATCH
router.patch('/update', cabControllers.modifyCabBooking); //modify a cab booking using dates, work slot and user id

// /cabs/cancel => DELETE
router.delete('/cancel', cabControllers.deleteCabBooking); //cancel a cab booking using date and user id

module.exports = router;