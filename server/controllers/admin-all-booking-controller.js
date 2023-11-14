const DeskBookings = require('../models/desk-booking');
const CabBookings = require('../models/cab-booking');
const FoodBookings = require('../models/food-booking');
const User = require("../models/user");
require("dotenv").config("../.env");
const dateFns = require('date-fns');

async function getUserList(req, res, next) { //function to get list of all users
    let users;
    try {
        users = await User.getAllUsers();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!users || users.length === 0) {
        return res.status(404).json({ message: 'No users found' });
    }
    return res.status(200).json(users);
}

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

async function getCountOfAllFutureBookings(req, res, next) { //function to get count of all future bookings
    const isDeskRequired = req.body.isDeskRequired;
    const isCabRequired = req.body.isCabRequired;
    const isFoodRequired = req.body.isFoodRequired;
    //if req.body contains userId, forward the request to getCountOfAllFutureBookingsForUser controller
    if (req.body.userId) {
        return getCountOfAllFutureBookingsForUser(req, res, next);
    }
    //is req.body contains startDate and endDate, forward the request to getCountOfAllBookingsBetweenDates controller
    if (req.body.startDate && req.body.endDate) {
        return getCountOfAllBookingsBetweenDates(req, res, next);
    }
    if (!isDeskRequired && !isCabRequired && !isFoodRequired) {
        return res.status(400).json({ message: 'Desk, cab and food bookings not required' });
    }
    let deskBookingsCount = 0, cabBookingsCount = 0, foodBookingsCount = 0;
    try {
        if (isDeskRequired) {
            deskBookingsCount = await DeskBookings.getCountOfFutureDeskBookings();
        }
        if (isCabRequired) {
            cabBookingsCount = await CabBookings.getCountOfAllFutureCabBookings();
        }
        if (isFoodRequired) {
            foodBookingsCount = await FoodBookings.getCountOfFutureFoodBookings();
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    return res.status(200).json({ deskBookingsCount: deskBookingsCount, cabBookingsCount: cabBookingsCount, foodBookingsCount: foodBookingsCount });
}

async function getCountOfAllBookingsBetweenDates(req, res, next) { //function to get count of all bookings between two dates
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    if (!startDate || !endDate) {
        return res.status(400).json({ message: 'Start date or end date not provided' });
    }
    startDate = dateFns.format(new Date(startDate), 'yyyy-MM-dd');
    endDate = dateFns.format(new Date(endDate), 'yyyy-MM-dd');
    const isDeskRequired = req.body.isDeskRequired;
    const isCabRequired = req.body.isCabRequired;
    const isFoodRequired = req.body.isFoodRequired;
    if (!isDeskRequired && !isCabRequired && !isFoodRequired) {
        return res.status(400).json({ message: 'Desk, cab and food bookings not required' });
    }
    let deskBookingsCount = 0, cabBookingsCount = 0, foodBookingsCount = 0;
    try {
        if (isDeskRequired) {
            deskBookingsCount = await DeskBookings.getCountOfDeskBookingsBetweenDates(startDate, endDate);
        }
        if (isCabRequired) {
            cabBookingsCount = await CabBookings.getCountOfCabBookingsBetweenDates(startDate, endDate);
        }
        if (isFoodRequired) {
            foodBookingsCount = await FoodBookings.getCountOfFoodBookingsBetweenDates(startDate, endDate);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    return res.status(200).json({ deskBookingsCount: deskBookingsCount, cabBookingsCount: cabBookingsCount, foodBookingsCount: foodBookingsCount });
}

async function getAllBookingsBetweenDates(req, res, next) { //function to get all bookings between two dates
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    if (!startDate || !endDate) {
        return res.status(400).json({ message: 'Start date or end date not provided' });
    }
    startDate = dateFns.format(new Date(startDate), 'yyyy-MM-dd');
    endDate = dateFns.format(new Date(endDate), 'yyyy-MM-dd');
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

async function getCountOfAllFutureBookingsForUser(req, res, next) { //function to get count of all future bookings for a user
    let userId;
    if (req.body.userId) {
        userId = req.body.userId;
    }
    //verify if userId is exists
    let user;
    try {
        user = await User.findById(userId);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!user || user.length === 0) {
        return res.status(404).json({ message: 'User not found' });
    }
    //is req.body contains startDate and endDate, forward the request to getCountOfAllBookingsBetweenDatesForUser controller
    if (req.body.startDate && req.body.endDate) {
        return getCountOfAllBookingsBetweenDatesForUser(req, res, next);
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
    let deskBookingsCount = 0, cabBookingsCount = 0, foodBookingsCount = 0;
    try {
        if (isDeskRequired) {
            deskBookingsCount = await DeskBookings.getCountOfFutureDeskBookingsForUser(userId);
        }
        if (isCabRequired) {
            cabBookingsCount = await CabBookings.getCountOfFutureCabBookingsForUser(userId);
        }
        if (isFoodRequired) {
            foodBookingsCount = await FoodBookings.getCountOfFutureFoodBookingsForUser(userId);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    return res.status(200).json({ deskBookingsCount: deskBookingsCount, cabBookingsCount: cabBookingsCount, foodBookingsCount: foodBookingsCount });
}

async function getCountOfAllBookingsBetweenDatesForUser(req, res, next) { //function to get count of all bookings between two dates for a user
    let userId;
    if (req.body.userId) {
        userId = req.body.userId;
    }
    //verify if userId is exists
    let user;
    try {
        user = await User.findById(userId);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!user || user.length === 0) {
        return res.status(404).json({ message: 'User not found' });
    }
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    if (!userId || userId === "") {
        return res.status(400).json({ message: 'User ID not provided' });
    }
    if (!startDate || !endDate) {
        return res.status(400).json({ message: 'Start date or end date not provided' });
    }
    startDate = dateFns.format(new Date(startDate), 'yyyy-MM-dd');
    endDate = dateFns.format(new Date(endDate), 'yyyy-MM-dd');
    const isDeskRequired = req.body.isDeskRequired;
    const isCabRequired = req.body.isCabRequired;
    const isFoodRequired = req.body.isFoodRequired;
    if (!isDeskRequired && !isCabRequired && !isFoodRequired) {
        return res.status(400).json({ message: 'Desk, cab and food bookings not required' });
    }
    let deskBookingsCount = 0, cabBookingsCount = 0, foodBookingsCount = 0;
    try {
        if (isDeskRequired) {
            deskBookingsCount = await DeskBookings.getCountOfDeskBookingsForUserBetweenDates(userId, startDate, endDate);
        }
        if (isCabRequired) {
            cabBookingsCount = await CabBookings.getCountOfCabBookingsForUserBetweenDates(userId, startDate, endDate);
        }
        if (isFoodRequired) {
            foodBookingsCount = await FoodBookings.getCountOfFoodBookingsForUserBetweenDates(userId, startDate, endDate);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    return res.status(200).json({ deskBookingsCount: deskBookingsCount, cabBookingsCount: cabBookingsCount, foodBookingsCount: foodBookingsCount });
}

async function getAllFutureBookingsForUser(req, res, next) { //function to get all future bookings for a user
    let userId;
    if (req.body.userId) {
        userId = req.body.userId;
    }
    //verify if userId is exists
    let user;
    try {
        user = await User.findById(userId);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!user || user.length === 0) {
        return res.status(404).json({ message: 'User not found' });
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
    //verify if userId is exists
    let user;
    try {
        user = await User.findById(userId);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!user || user.length === 0) {
        return res.status(404).json({ message: 'User not found' });
    }
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    if (!userId || userId === "") {
        return res.status(400).json({ message: 'User ID not provided' });
    }
    if (!startDate || !endDate) {
        return res.status(400).json({ message: 'Start date or end date not provided' });
    }
    startDate = dateFns.format(new Date(startDate), 'yyyy-MM-dd');
    endDate = dateFns.format(new Date(endDate), 'yyyy-MM-dd');
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
    getUserList: getUserList,
    getAllFutureBookings: getAllFutureBookings,
    getCountOfAllFutureBookings: getCountOfAllFutureBookings,
    getCountOfAllBookingsBetweenDates: getCountOfAllBookingsBetweenDates,
    getAllBookingsBetweenDates: getAllBookingsBetweenDates,
    getCountOfAllFutureBookingsForUser: getCountOfAllFutureBookingsForUser,
    getCountOfAllBookingsBetweenDatesForUser: getCountOfAllBookingsBetweenDatesForUser,
    getAllFutureBookingsForUser: getAllFutureBookingsForUser,
    getAllBookingsBetweenDatesForUser: getAllBookingsBetweenDatesForUser
};