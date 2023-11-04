const express = require('express');

const router = express.Router();

const foodControllers = require('../controllers/food-controller');

// /food/user => GET
router.get('/user', foodControllers.getFutureFoodBookingsForUser); //get future food bookings for a user

// /food/user/all => GET
router.get('/user/all', foodControllers.getFoodBookingsForUser); //get all food bookings for a user

// /food/book => POST
router.post('/book', foodControllers.bookFood); //book a food using user id and preference for multiple dates (array of dates) by inserting them into food bookings table

// /food/update => PATCH
router.patch('/update', foodControllers.modifyFoodBooking); //modify a food booking using dates, preference and user id

// /food/cancel => DELETE
router.delete('/cancel', foodControllers.deleteFoodBooking); //cancel a food booking using dates and user id

module.exports = router;