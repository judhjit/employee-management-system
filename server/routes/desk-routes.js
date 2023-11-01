const express = require('express');

const router = express.Router();

const deskControllers = require('../controllers/desk-controller');

// /desks => GET
router.get('/', deskControllers.getFutureDeskBookings); //get all future desk bookings

// /desks/all => GET
router.get('/all', deskControllers.getAllDeskBookings); //get all desk bookings

// /desks/obj => GET
router.get('/obj', deskControllers.getDesksObj); //get all desk bookings as an object with deskId as key and array of objects containing userId, dateBooked and name as values

// /desks/availability => GET
router.get('/availability', deskControllers.getDesksAvailabilityByDatesObj); //get availability of all desks for all dates in dates array

// /desks/user => GET
router.get('/user', deskControllers.getFutureDeskBookingsForUser); //get future desk bookings for a user

// /desks/user/all => GET
router.get('/user/all', deskControllers.getAllDeskBookingsForUser); //get all desk bookings for a user

// /desks/getdesk?deskId=:deskId => GET
router.get('/getdesk', deskControllers.getDeskByDeskId); //get future desk bookings for a desk id

// /desks/book?deskId=:deskId => POST
router.post('/book', deskControllers.bookDesk); //book a desk using desk id and user id for multiple dates (array of dates) by inserting them into desk bookings table

// /desks/cancel?deskId=:deskId => DELETE
router.delete('/cancel', deskControllers.cancelDeskBooking); //cancel a desk booking using desk id and user id for multiple dates (array of dates) by deleting them from desk bookings table

module.exports = router;