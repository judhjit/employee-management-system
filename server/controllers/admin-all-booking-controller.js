const DeskBookings = require('../models/desk-booking');
const CabBookings = require('../models/cab-booking');
const FoodBookings = require('../models/food-booking');
require("dotenv").config("../.env");
const moment = require('moment');


async function getAllFutureBookings(req, res, next) { //function to get all future bookings
    const isDeskRequired = req.body.isDeskRequired;
    const isCabRequired = req.body.isCabRequired;
    const isFoodRequired = req.body.isFoodRequired;
    //if req.body contains userId, forward the request to getAllFutureBookingsForUser controller
    if (req.body.userId) {
        return getAllFutureBookingsForUser(req, res, next);
    }
    //is req.body contains startDate and endDate, forward the request to getAllBookingsBetweenDates controller
    if (req.body.startDate && req.body.endDate) {
        return getAllBookingsBetweenDates(req, res, next);
    }
    if (!isDeskRequired && !isCabRequired && !isFoodRequired) {
        return res.status(400).json({ message: 'Desk, cab and food bookings not required' });
    }
    let bookings, deskBookings, cabBookings, foodBookings;
    try {
        if (isDeskRequired) {
            deskBookings = await DeskBookings.getFutureDeskBookings();
            //add type to each booking
            for (let i = 0; i < deskBookings.length; i++) {
                deskBookings[i].type = 'Desk';
                deskBookings[i].selected = deskBookings[i].deskId;
                delete deskBookings[i].deskId;
            }
        }
        if (isCabRequired) {
            cabBookings = await CabBookings.getAllFutureCabBookings();
            //add type to each booking
            for (let i = 0; i < cabBookings.length; i++) {
                cabBookings[i].type = 'Cab';
                cabBookings[i].selected = cabBookings[i].workSlot;
                delete cabBookings[i].workSlot;
            }
        }
        if (isFoodRequired) {
            foodBookings = await FoodBookings.getAllFutureFoodBookings();
            //add type to each booking
            for (let i = 0; i < foodBookings.length; i++) {
                foodBookings[i].type = 'Food';
                foodBookings[i].selected = foodBookings[i].preference;
                delete foodBookings[i].preference;
            }
        }
        bookings = []
        if (isDeskRequired) bookings = bookings.concat(deskBookings);
        if (isCabRequired) bookings = bookings.concat(cabBookings);
        if (isFoodRequired) bookings = bookings.concat(foodBookings);
        bookings.sort((a, b) => {
            return new Date(a.dateBooked) - new Date(b.dateBooked); //sort by dateBooked in ascending order
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!bookings || bookings.length === 0) {
        return res.status(404).json({ message: 'No bookings found' });
    }
    return res.status(200).json(bookings);
}

async function getAllBookingsBetweenDates(req, res, next) { //function to get all bookings between two dates
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    if (!startDate || !endDate) {
        return res.status(400).json({ message: 'Start date or end date not provided' });
    }
    startDate = moment(startDate).format('YYYY-MM-DD');
    endDate = moment(endDate).format('YYYY-MM-DD');
    const isDeskRequired = req.body.isDeskRequired;
    const isCabRequired = req.body.isCabRequired;
    const isFoodRequired = req.body.isFoodRequired;
    if (!isDeskRequired && !isCabRequired && !isFoodRequired) {
        return res.status(400).json({ message: 'Desk, cab and food bookings not required' });
    }
    let deskBookings, cabBookings, foodBookings;
    try {
        if (isDeskRequired) {
            deskBookings = await DeskBookings.getDeskBookingsBetweenDates(startDate, endDate);
            //add type to each booking
            for (let i = 0; i < deskBookings.length; i++) {
                deskBookings[i].type = 'Desk';
                deskBookings[i].selected = deskBookings[i].deskId;
                delete deskBookings[i].deskId;
            }
        }
        if (isCabRequired) {
            cabBookings = await CabBookings.getCabBookingsBetweenDates(startDate, endDate);
            //add type to each booking
            for (let i = 0; i < cabBookings.length; i++) {
                cabBookings[i].type = 'Cab';
                cabBookings[i].selected = cabBookings[i].workSlot;
                delete cabBookings[i].workSlot;
            }
        }
        if (isFoodRequired) {
            foodBookings = await FoodBookings.getFoodBookingsBetweenDates(startDate, endDate);
            //add type to each booking
            for (let i = 0; i < foodBookings.length; i++) {
                foodBookings[i].type = 'Food';
                foodBookings[i].selected = foodBookings[i].preference;
                delete foodBookings[i].preference;
            }
        }
        let bookings = [];
        if (isDeskRequired) bookings = bookings.concat(deskBookings);
        if (isCabRequired) bookings = bookings.concat(cabBookings);
        if (isFoodRequired) bookings = bookings.concat(foodBookings);
        bookings.sort((a, b) => {
            return new Date(a.dateBooked) - new Date(b.dateBooked); //sort by dateBooked in ascending order
        });
        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ message: 'No bookings found' });
        }
        return res.status(200).json(bookings);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function getAllFutureBookingsForUser(req, res, next) { //function to get all future bookings for a user
    let userId;
    if (req.body.userId) {
        userId = req.body.userId;
    }
    //is req.body contains startDate and endDate, forward the request to getAllBookingsBetweenDatesForUser controller
    if (req.body.startDate && req.body.endDate) {
        return getAllBookingsBetweenDatesForUser(req, res, next);
    }
    const isDeskRequired = req.body.isDeskRequired;
    const isCabRequired = req.body.isCabRequired;
    const isFoodRequired = req.body.isFoodRequired;
    if (!userId || userId === "") {
        return res.status(400).json({ message: 'User ID not provided' });
    }
    if (!isDeskRequired && !isCabRequired && !isFoodRequired) {
        return res.status(400).json({ message: 'Desk, cab and food bookings not required' });
    }
    let bookings, deskBookings, cabBookings, foodBookings;
    try {
        if (isDeskRequired) {
            deskBookings = await DeskBookings.getFutureDeskBookingsForUser(userId);
            //add type to each booking
            for (let i = 0; i < deskBookings.length; i++) {
                deskBookings[i].type = 'Desk';
                deskBookings[i].selected = deskBookings[i].deskId;
                delete deskBookings[i].deskId;
            }
        }
        if (isCabRequired) {
            cabBookings = await CabBookings.getFutureCabBookingsForUser(userId);
            //add type to each booking
            for (let i = 0; i < cabBookings.length; i++) {
                cabBookings[i].type = 'Cab';
                cabBookings[i].selected = cabBookings[i].workSlot;
                delete cabBookings[i].workSlot;
            }
        }
        if (isFoodRequired) {
            foodBookings = await FoodBookings.getFutureFoodBookingsForUser(userId);
            //add type to each booking
            for (let i = 0; i < foodBookings.length; i++) {
                foodBookings[i].type = 'Food';
                foodBookings[i].selected = foodBookings[i].preference;
                delete foodBookings[i].preference;
            }
        }
        bookings = []
        if (isDeskRequired) bookings = bookings.concat(deskBookings);
        if (isCabRequired) bookings = bookings.concat(cabBookings);
        if (isFoodRequired) bookings = bookings.concat(foodBookings);
        bookings.sort((a, b) => {
            return new Date(a.dateBooked) - new Date(b.dateBooked); //sort by dateBooked in ascending order
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!bookings || bookings.length === 0) {
        return res.status(404).json({ message: 'No bookings found' });
    }
    return res.status(200).json(bookings);
}

async function getAllBookingsBetweenDatesForUser(req, res, next) { //function to get all bookings between two dates for a user
    let userId;
    if (req.body.userId) {
        userId = req.body.userId;
    }
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    if (!userId || userId === "") {
        return res.status(400).json({ message: 'User ID not provided' });
    }
    if (!startDate || !endDate) {
        return res.status(400).json({ message: 'Start date or end date not provided' });
    }
    startDate = moment(startDate).format('YYYY-MM-DD');
    endDate = moment(endDate).format('YYYY-MM-DD');
    const isDeskRequired = req.body.isDeskRequired;
    const isCabRequired = req.body.isCabRequired;
    const isFoodRequired = req.body.isFoodRequired;
    if (!isDeskRequired && !isCabRequired && !isFoodRequired) {
        return res.status(400).json({ message: 'Desk, cab and food bookings not required' });
    }
    let deskBookings, cabBookings, foodBookings;
    try {
        if (isDeskRequired) {
            deskBookings = await DeskBookings.getDeskBookingsForUserBetweenDates(userId, startDate, endDate);
            //add type to each booking
            for (let i = 0; i < deskBookings.length; i++) {
                deskBookings[i].type = 'Desk';
                deskBookings[i].selected = deskBookings[i].deskId;
                delete deskBookings[i].deskId;
            }
        }
        if (isCabRequired) {
            cabBookings = await CabBookings.getCabBookingsForUserBetweenDates(userId, startDate, endDate);
            //add type to each booking
            for (let i = 0; i < cabBookings.length; i++) {
                cabBookings[i].type = 'Cab';
                cabBookings[i].selected = cabBookings[i].workSlot;
                delete cabBookings[i].workSlot;
            }
        }
        if (isFoodRequired) {
            foodBookings = await FoodBookings.getFoodBookingsForUserBetweenDates(userId, startDate, endDate);
            //add type to each booking
            for (let i = 0; i < foodBookings.length; i++) {
                foodBookings[i].type = 'Food';
                foodBookings[i].selected = foodBookings[i].preference;
                delete foodBookings[i].preference;
            }
        }
        let bookings = [];
        if (isDeskRequired) bookings = bookings.concat(deskBookings);
        if (isCabRequired) bookings = bookings.concat(cabBookings);
        if (isFoodRequired) bookings = bookings.concat(foodBookings);
        bookings.sort((a, b) => {
            return new Date(a.dateBooked) - new Date(b.dateBooked); //sort by dateBooked in ascending order
        });
        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ message: 'No bookings found' });
        }
        return res.status(200).json(bookings);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    getAllFutureBookings,
    getAllBookingsBetweenDates,
    getAllFutureBookingsForUser,
    getAllBookingsBetweenDatesForUser
};