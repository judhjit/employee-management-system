const DeskBookings = require('../models/desk-booking');
const CabBookings = require('../models/cab-booking');
const FoodBookings = require('../models/food-booking');
const User = require("../models/user");
require("dotenv").config("../.env");
const dateFns = require('date-fns');

const logger = require('../logger/index');
const childLogger = logger.child({ module: 'admin-all-booking-controller' });

let service = "";

async function getUserList(req, res, next) { //function to get list of all users
    service = "getUserList";
    let users;
    try {
        childLogger.info('Getting list of all users', { userId: req.userId, service: service });
        users = await User.getAllUsers();
        childLogger.info('Successfully got list of all users', { userId: req.userId, service: service });
    } catch (error) {
        childLogger.error('Error getting list of all users', { userId: req.userId, service: service, error: error });
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!users || users.length === 0) {
        childLogger.error('No users found', { userId: req.userId, service: service });
        return res.status(404).json({ message: 'No users found' });
    }
    childLogger.info('Successfully returned list of all users', { userId: req.userId, service: service });
    return res.status(200).json(users);
}

async function getAllFutureBookings(req, res, next) { //function to get all future bookings
    service = "getAllFutureBookings";
    const isDeskRequired = req.body.isDeskRequired;
    const isCabRequired = req.body.isCabRequired;
    const isFoodRequired = req.body.isFoodRequired;
    //if req.body contains userId, forward the request to getAllFutureBookingsForUser controller
    if (req.body.userId) {
        childLogger.info('Forwarding request to get all future bookings for user', { userId: req.userId, service: service, request: { userId: req.body.userId, isDeskRequired: isDeskRequired, isCabRequired: isCabRequired, isFoodRequired: isFoodRequired }});
        return getAllFutureBookingsForUser(req, res, next);
    }
    //is req.body contains startDate and endDate, forward the request to getAllBookingsBetweenDates controller
    if (req.body.startDate && req.body.endDate) {
        childLogger.info('Forwarding request to get all bookings between dates', { userId: req.userId, service: service, request: { startDate: req.body.startDate, endDate: req.body.endDate, isDeskRequired: isDeskRequired, isCabRequired: isCabRequired, isFoodRequired: isFoodRequired }});
        return getAllBookingsBetweenDates(req, res, next);
    }
    if (!isDeskRequired && !isCabRequired && !isFoodRequired) {
        childLogger.error('Desk, cab and food bookings not required', { userId: req.userId, service: service, request: { isDeskRequired: isDeskRequired, isCabRequired: isCabRequired, isFoodRequired: isFoodRequired }});
        return res.status(400).json({ message: 'Desk, cab and food bookings not required' });
    }
    let bookings, deskBookings, cabBookings, foodBookings;
    try {
        if (isDeskRequired) {
            childLogger.info('Getting all future desk bookings', { userId: req.userId, service: service });
            deskBookings = await DeskBookings.getFutureDeskBookings();
            childLogger.info('Successfully got all future desk bookings', { userId: req.userId, service: service });
            //add type to each booking
            for (let i = 0; i < deskBookings.length; i++) {
                deskBookings[i].type = 'Desk';
                deskBookings[i].selected = deskBookings[i].deskId;
                delete deskBookings[i].deskId;
            }
        }
        if (isCabRequired) {
            childLogger.info('Getting all future cab bookings', { userId: req.userId, service: service });
            cabBookings = await CabBookings.getAllFutureCabBookings();
            childLogger.info('Successfully got all future cab bookings', { userId: req.userId, service: service });
            //add type to each booking
            for (let i = 0; i < cabBookings.length; i++) {
                cabBookings[i].type = 'Cab';
                cabBookings[i].selected = cabBookings[i].workSlot;
                delete cabBookings[i].workSlot;
            }
        }
        if (isFoodRequired) {
            childLogger.info('Getting all future food bookings', { userId: req.userId, service: service });
            foodBookings = await FoodBookings.getAllFutureFoodBookings();
            childLogger.info('Successfully got all future food bookings', { userId: req.userId, service: service });
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
        childLogger.info('Sorting all future bookings by dateBooked', { userId: req.userId, service: service });
        bookings.sort((a, b) => {
            return new Date(a.dateBooked) - new Date(b.dateBooked); //sort by dateBooked in ascending order
        });
    } catch (error) {
        childLogger.error('Error getting all future bookings', { userId: req.userId, service: service, error: error });
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!bookings || bookings.length === 0) {
        childLogger.info('No bookings found', { userId: req.userId, service: service });
        return res.status(404).json({ message: 'No bookings found' });
    }
    childLogger.info('Successfully returned all future bookings', { userId: req.userId, service: service });
    return res.status(200).json(bookings);
}

async function getCountOfAllFutureBookings(req, res, next) { //function to get count of all future bookings
    service = "getCountOfAllFutureBookings";
    const isDeskRequired = req.body.isDeskRequired;
    const isCabRequired = req.body.isCabRequired;
    const isFoodRequired = req.body.isFoodRequired;
    //if req.body contains userId, forward the request to getCountOfAllFutureBookingsForUser controller
    if (req.body.userId) {
        childLogger.info('Forwarding request to get count of all future bookings for user', { userId: req.userId, service: service, request: { userId: req.body.userId, isDeskRequired: isDeskRequired, isCabRequired: isCabRequired, isFoodRequired: isFoodRequired }});
        return getCountOfAllFutureBookingsForUser(req, res, next);
    }
    //is req.body contains startDate and endDate, forward the request to getCountOfAllBookingsBetweenDates controller
    if (req.body.startDate && req.body.endDate) {
        childLogger.info('Forwarding request to get count of all bookings between dates', { userId: req.userId, service: service, request: { startDate: req.body.startDate, endDate: req.body.endDate, isDeskRequired: isDeskRequired, isCabRequired: isCabRequired, isFoodRequired: isFoodRequired }});
        return getCountOfAllBookingsBetweenDates(req, res, next);
    }
    if (!isDeskRequired && !isCabRequired && !isFoodRequired) {
        childLogger.error('Desk, cab and food bookings not required', { userId: req.userId, service: service, request: { isDeskRequired: isDeskRequired, isCabRequired: isCabRequired, isFoodRequired: isFoodRequired }});
        return res.status(400).json({ message: 'Desk, cab and food bookings not required' });
    }
    let deskBookingsCount = 0, cabBookingsCount = 0, foodBookingsCount = 0;
    try {
        if (isDeskRequired) {
            childLogger.info('Getting count of all future desk bookings', { userId: req.userId, service: service });
            deskBookingsCount = await DeskBookings.getCountOfFutureDeskBookings();
            childLogger.info('Successfully got count of all future desk bookings', { userId: req.userId, service: service });
        }
        if (isCabRequired) {
            childLogger.info('Getting count of all future cab bookings', { userId: req.userId, service: service });
            cabBookingsCount = await CabBookings.getCountOfAllFutureCabBookings();
            childLogger.info('Successfully got count of all future cab bookings', { userId: req.userId, service: service });
        }
        if (isFoodRequired) {
            childLogger.info('Getting count of all future food bookings', { userId: req.userId, service: service });
            foodBookingsCount = await FoodBookings.getCountOfFutureFoodBookings();
            childLogger.info('Successfully got count of all future food bookings', { userId: req.userId, service: service });
        }
    } catch (error) {
        childLogger.error('Error getting count of all future bookings', { userId: req.userId, service: service, error: error });
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    childLogger.info('Successfully returned count of all future bookings', { userId: req.userId, service: service });
    return res.status(200).json({ deskBookingsCount: deskBookingsCount, cabBookingsCount: cabBookingsCount, foodBookingsCount: foodBookingsCount });
}

async function getCountOfAllBookingsBetweenDates(req, res, next) { //function to get count of all bookings between two dates
    service = "getCountOfAllBookingsBetweenDates";
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    if (!startDate || !endDate) {
        childLogger.error('Start date or end date not provided', { userId: req.userId, service: service });
        return res.status(400).json({ message: 'Start date or end date not provided' });
    }
    childLogger.info('Formatting start date and end date', { userId: req.userId, service: service, request: { startDate: startDate, endDate: endDate }});
    startDate = dateFns.format(new Date(startDate), 'yyyy-MM-dd');
    endDate = dateFns.format(new Date(endDate), 'yyyy-MM-dd');
    const isDeskRequired = req.body.isDeskRequired;
    const isCabRequired = req.body.isCabRequired;
    const isFoodRequired = req.body.isFoodRequired;
    if (!isDeskRequired && !isCabRequired && !isFoodRequired) {
        childLogger.error('Desk, cab and food bookings not required', { userId: req.userId, service: service, request: { isDeskRequired: isDeskRequired, isCabRequired: isCabRequired, isFoodRequired: isFoodRequired }});
        return res.status(400).json({ message: 'Desk, cab and food bookings not required' });
    }
    let deskBookingsCount = 0, cabBookingsCount = 0, foodBookingsCount = 0;
    try {
        if (isDeskRequired) {
            childLogger.info('Getting count of all desk bookings between dates', { userId: req.userId, service: service });
            deskBookingsCount = await DeskBookings.getCountOfDeskBookingsBetweenDates(startDate, endDate);
            childLogger.info('Successfully got count of all desk bookings between dates', { userId: req.userId, service: service });
        }
        if (isCabRequired) {
            childLogger.info('Getting count of all cab bookings between dates', { userId: req.userId, service: service });
            cabBookingsCount = await CabBookings.getCountOfCabBookingsBetweenDates(startDate, endDate);
            childLogger.info('Successfully got count of all cab bookings between dates', { userId: req.userId, service: service });
        }
        if (isFoodRequired) {
            childLogger.info('Getting count of all food bookings between dates', { userId: req.userId, service: service });
            foodBookingsCount = await FoodBookings.getCountOfFoodBookingsBetweenDates(startDate, endDate);
            childLogger.info('Successfully got count of all food bookings between dates', { userId: req.userId, service: service });
        }
    } catch (error) {
        childLogger.error('Error getting count of all bookings between dates', { userId: req.userId, service: service, error: error });
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    childLogger.info('Successfully returned count of all bookings between dates', { userId: req.userId, service: service });
    return res.status(200).json({ deskBookingsCount: deskBookingsCount, cabBookingsCount: cabBookingsCount, foodBookingsCount: foodBookingsCount });
}

async function getAllBookingsBetweenDates(req, res, next) { //function to get all bookings between two dates
    service = "getAllBookingsBetweenDates";
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    if (!startDate || !endDate) {
        childLogger.error('Start date or end date not provided', { userId: req.userId, service: service });
        return res.status(400).json({ message: 'Start date or end date not provided' });
    }
    childLogger.info('Formatting start date and end date', { userId: req.userId, service: service, request: { startDate: startDate, endDate: endDate }});
    startDate = dateFns.format(new Date(startDate), 'yyyy-MM-dd');
    endDate = dateFns.format(new Date(endDate), 'yyyy-MM-dd');
    const isDeskRequired = req.body.isDeskRequired;
    const isCabRequired = req.body.isCabRequired;
    const isFoodRequired = req.body.isFoodRequired;
    if (!isDeskRequired && !isCabRequired && !isFoodRequired) {
        childLogger.error('Desk, cab and food bookings not required', { userId: req.userId, service: service, request: { isDeskRequired: isDeskRequired, isCabRequired: isCabRequired, isFoodRequired: isFoodRequired }});
        return res.status(400).json({ message: 'Desk, cab and food bookings not required' });
    }
    let deskBookings, cabBookings, foodBookings;
    try {
        if (isDeskRequired) {
            childLogger.info('Getting all desk bookings between dates', { userId: req.userId, service: service });
            deskBookings = await DeskBookings.getDeskBookingsBetweenDates(startDate, endDate);
            childLogger.info('Successfully got all desk bookings between dates', { userId: req.userId, service: service });
            //add type to each booking
            for (let i = 0; i < deskBookings.length; i++) {
                deskBookings[i].type = 'Desk';
                deskBookings[i].selected = deskBookings[i].deskId;
                delete deskBookings[i].deskId;
            }
        }
        if (isCabRequired) {
            childLogger.info('Getting all cab bookings between dates', { userId: req.userId, service: service });
            cabBookings = await CabBookings.getCabBookingsBetweenDates(startDate, endDate);
            childLogger.info('Successfully got all cab bookings between dates', { userId: req.userId, service: service });
            //add type to each booking
            for (let i = 0; i < cabBookings.length; i++) {
                cabBookings[i].type = 'Cab';
                cabBookings[i].selected = cabBookings[i].workSlot;
                delete cabBookings[i].workSlot;
            }
        }
        if (isFoodRequired) {
            childLogger.info('Getting all food bookings between dates', { userId: req.userId, service: service });
            foodBookings = await FoodBookings.getFoodBookingsBetweenDates(startDate, endDate);
            childLogger.info('Successfully got all food bookings between dates', { userId: req.userId, service: service });
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
        childLogger.info('Sorting all bookings between dates by dateBooked', { userId: req.userId, service: service });
        bookings.sort((a, b) => {
            return new Date(a.dateBooked) - new Date(b.dateBooked); //sort by dateBooked in ascending order
        });
        if (!bookings || bookings.length === 0) {
            childLogger.info('No bookings found', { userId: req.userId, service: service });
            return res.status(404).json({ message: 'No bookings found' });
        }
        childLogger.info('Successfully returned all bookings between dates', { userId: req.userId, service: service });
        return res.status(200).json(bookings);
    } catch (error) {
        childLogger.error('Error getting all bookings between dates', { userId: req.userId, service: service, error: error });
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function getCountOfAllFutureBookingsForUser(req, res, next) { //function to get count of all future bookings for a user
    service = "getCountOfAllFutureBookingsForUser";
    let userId;
    if (req.body.userId) {
        userId = req.body.userId;
    }
    //verify if userId is exists
    let user;
    try {
        childLogger.info('Verifying if user exists', { userId: req.userId, service: service, request: { userId: userId }});
        user = await User.findById(userId);
        childLogger.info('Successfully verified if user exists', { userId: req.userId, service: service, request: { userId: userId }});
    } catch (error) {
        childLogger.error('Error verifying if user exists', { userId: req.userId, service: service, request: { userId: userId }, error: error });
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!user || user.length === 0) {
        childLogger.error('User not found', { userId: req.userId, service: service, request: { userId: userId }});
        return res.status(404).json({ message: 'User not found' });
    }
    //is req.body contains startDate and endDate, forward the request to getCountOfAllBookingsBetweenDatesForUser controller
    if (req.body.startDate && req.body.endDate) {
        childLogger.info('Forwarding request to get count of all bookings between dates for user', { userId: req.userId, service: service, request: { userId: userId, startDate: req.body.startDate, endDate: req.body.endDate }});
        return getCountOfAllBookingsBetweenDatesForUser(req, res, next);
    }
    const isDeskRequired = req.body.isDeskRequired;
    const isCabRequired = req.body.isCabRequired;
    const isFoodRequired = req.body.isFoodRequired;
    if (!userId || userId === "") {
        childLogger.error('UserId not provided', { userId: req.userId, service: service });
        return res.status(400).json({ message: 'User ID not provided' });
    }
    if (!isDeskRequired && !isCabRequired && !isFoodRequired) {
        childLogger.error('Desk, cab and food bookings not required', { userId: req.userId, service: service, request: { isDeskRequired: isDeskRequired, isCabRequired: isCabRequired, isFoodRequired: isFoodRequired }});
        return res.status(400).json({ message: 'Desk, cab and food bookings not required' });
    }
    let deskBookingsCount = 0, cabBookingsCount = 0, foodBookingsCount = 0;
    try {
        if (isDeskRequired) {
            childLogger.info('Getting count of all future desk bookings for user', { userId: req.userId, service: service, request: { userId: userId }});
            deskBookingsCount = await DeskBookings.getCountOfFutureDeskBookingsForUser(userId);
            childLogger.info('Successfully got count of all future desk bookings for user', { userId: req.userId, service: service, request: { userId: userId }});
        }
        if (isCabRequired) {
            childLogger.info('Getting count of all future cab bookings for user', { userId: req.userId, service: service, request: { userId: userId }});
            cabBookingsCount = await CabBookings.getCountOfFutureCabBookingsForUser(userId);
            childLogger.info('Successfully got count of all future cab bookings for user', { userId: req.userId, service: service, request: { userId: userId }});
        }
        if (isFoodRequired) {
            childLogger.info('Getting count of all future food bookings for user', { userId: req.userId, service: service, request: { userId: userId }});
            foodBookingsCount = await FoodBookings.getCountOfFutureFoodBookingsForUser(userId);
            childLogger.info('Successfully got count of all future food bookings for user', { userId: req.userId, service: service, request: { userId: userId }});
        }
    } catch (error) {
        childLogger.error('Error getting count of all future bookings for user', { userId: req.userId, service: service, request: { userId: userId }, error: error });
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    childLogger.info('Successfully returned count of all future bookings for user', { userId: req.userId, service: service, request: { userId: userId }});
    return res.status(200).json({ deskBookingsCount: deskBookingsCount, cabBookingsCount: cabBookingsCount, foodBookingsCount: foodBookingsCount });
}

async function getCountOfAllBookingsBetweenDatesForUser(req, res, next) { //function to get count of all bookings between two dates for a user
    service = "getCountOfAllBookingsBetweenDatesForUser";
    let userId;
    if (req.body.userId) {
        userId = req.body.userId;
    }
    //verify if userId is exists
    let user;
    try {
        childLogger.info('Verifying if user exists', { userId: req.userId, service: service, request: { userId: userId }});
        user = await User.findById(userId);
        childLogger.info('Successfully verified if user exists', { userId: req.userId, service: service, request: { userId: userId }});
    } catch (error) {
        childLogger.error('Error verifying if user exists', { userId: req.userId, service: service, request: { userId: userId }, error: error });
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!user || user.length === 0) {
        childLogger.error('User not found', { userId: req.userId, service: service, request: { userId: userId }});
        return res.status(404).json({ message: 'User not found' });
    }
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    if (!userId || userId === "") {
        childLogger.error('UserId not provided', { userId: req.userId, service: service, });
        return res.status(400).json({ message: 'User ID not provided' });
    }
    if (!startDate || !endDate) {
        childLogger.error('Start date or end date not provided', { userId: req.userId, service: service });
        return res.status(400).json({ message: 'Start date or end date not provided' });
    }
    startDate = dateFns.format(new Date(startDate), 'yyyy-MM-dd');
    endDate = dateFns.format(new Date(endDate), 'yyyy-MM-dd');
    const isDeskRequired = req.body.isDeskRequired;
    const isCabRequired = req.body.isCabRequired;
    const isFoodRequired = req.body.isFoodRequired;
    if (!isDeskRequired && !isCabRequired && !isFoodRequired) {
        childLogger.error('Desk, cab and food bookings not required', { userId: req.userId, service: service, request: { isDeskRequired: isDeskRequired, isCabRequired: isCabRequired, isFoodRequired: isFoodRequired }});
        return res.status(400).json({ message: 'Desk, cab and food bookings not required' });
    }
    let deskBookingsCount = 0, cabBookingsCount = 0, foodBookingsCount = 0;
    try {
        if (isDeskRequired) {
            childLogger.info('Getting count of all desk bookings between dates for user', { userId: req.userId, service: service, request: { userId: userId, startDate: startDate, endDate: endDate }});
            deskBookingsCount = await DeskBookings.getCountOfDeskBookingsForUserBetweenDates(userId, startDate, endDate);
            childLogger.info('Successfully got count of all desk bookings between dates for user', { userId: req.userId, service: service, request: { userId: userId, startDate: startDate, endDate: endDate }});
        }
        if (isCabRequired) {
            childLogger.info('Getting count of all cab bookings between dates for user', { userId: req.userId, service: service, request: { userId: userId, startDate: startDate, endDate: endDate }});
            cabBookingsCount = await CabBookings.getCountOfCabBookingsForUserBetweenDates(userId, startDate, endDate);
            childLogger.info('Successfully got count of all cab bookings between dates for user', { userId: req.userId, service: service, request: { userId: userId, startDate: startDate, endDate: endDate }});
        }
        if (isFoodRequired) {
            childLogger.info('Getting count of all food bookings between dates for user', { userId: req.userId, service: service, request: { userId: userId, startDate: startDate, endDate: endDate }});
            foodBookingsCount = await FoodBookings.getCountOfFoodBookingsForUserBetweenDates(userId, startDate, endDate);
            childLogger.info('Successfully got count of all food bookings between dates for user', { userId: req.userId, service: service, request: { userId: userId, startDate: startDate, endDate: endDate }});
        }
    } catch (error) {
        childLogger.error('Error getting count of all bookings between dates for user', { userId: req.userId, service: service, request: { userId: userId, startDate: startDate, endDate: endDate }, error: error });
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    childLogger.info('Successfully returned count of all bookings between dates for user', { userId: req.userId, service: service, request: { userId: userId, startDate: startDate, endDate: endDate }});
    return res.status(200).json({ deskBookingsCount: deskBookingsCount, cabBookingsCount: cabBookingsCount, foodBookingsCount: foodBookingsCount });
}

async function getAllFutureBookingsForUser(req, res, next) { //function to get all future bookings for a user
    service = "getAllFutureBookingsForUser";
    let userId;
    if (req.body.userId) {
        userId = req.body.userId;
    }
    //verify if userId is exists
    let user;
    try {
        childLogger.info('Verifying if user exists', { userId: req.userId, service: service, request: { userId: userId }});
        user = await User.findById(userId);
        childLogger.info('Successfully verified if user exists', { userId: req.userId, service: service, request: { userId: userId }});
    } catch (error) {
        childLogger.error('Error verifying if user exists', { userId: req.userId, service: service, request: { userId: userId }, error: error });
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!user || user.length === 0) {
        childLogger.error('User not found', { userId: req.userId, service: service, request: { userId: userId }});
        return res.status(404).json({ message: 'User not found' });
    }
    //if req.body contains startDate and endDate, forward the request to getAllBookingsBetweenDatesForUser controller
    if (req.body.startDate && req.body.endDate) {
        childLogger.info('Forwarding request to get all bookings between dates for user', { userId: req.userId, service: service, request: { userId: userId, startDate: req.body.startDate, endDate: req.body.endDate }});
        return getAllBookingsBetweenDatesForUser(req, res, next);
    }
    const isDeskRequired = req.body.isDeskRequired;
    const isCabRequired = req.body.isCabRequired;
    const isFoodRequired = req.body.isFoodRequired;
    if (!userId || userId === "") {
        childLogger.error('UserId not provided', { userId: req.userId, service: service, });
        return res.status(400).json({ message: 'User ID not provided' });
    }
    if (!isDeskRequired && !isCabRequired && !isFoodRequired) {
        childLogger.error('Desk, cab and food bookings not required', { userId: req.userId, service: service, request: { isDeskRequired: isDeskRequired, isCabRequired: isCabRequired, isFoodRequired: isFoodRequired }});
        return res.status(400).json({ message: 'Desk, cab and food bookings not required' });
    }
    let bookings, deskBookings, cabBookings, foodBookings;
    try {
        if (isDeskRequired) {
            childLogger.info('Getting all future desk bookings for user', { userId: req.userId, service: service, request: { userId: userId }});
            deskBookings = await DeskBookings.getFutureDeskBookingsForUser(userId);
            childLogger.info('Successfully got all future desk bookings for user', { userId: req.userId, service: service, request: { userId: userId }});
            //add type to each booking
            for (let i = 0; i < deskBookings.length; i++) {
                deskBookings[i].type = 'Desk';
                deskBookings[i].selected = deskBookings[i].deskId;
                delete deskBookings[i].deskId;
            }
        }
        if (isCabRequired) {
            childLogger.info('Getting all future cab bookings for user', { userId: req.userId, service: service, request: { userId: userId }});
            cabBookings = await CabBookings.getFutureCabBookingsForUser(userId);
            childLogger.info('Successfully got all future cab bookings for user', { userId: req.userId, service: service, request: { userId: userId }});
            //add type to each booking
            for (let i = 0; i < cabBookings.length; i++) {
                cabBookings[i].type = 'Cab';
                cabBookings[i].selected = cabBookings[i].workSlot;
                delete cabBookings[i].workSlot;
            }
        }
        if (isFoodRequired) {
            childLogger.info('Getting all future food bookings for user', { userId: req.userId, service: service, request: { userId: userId }});
            foodBookings = await FoodBookings.getFutureFoodBookingsForUser(userId);
            childLogger.info('Successfully got all future food bookings for user', { userId: req.userId, service: service, request: { userId: userId }});
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
        childLogger.info('Sorting all future bookings for user by dateBooked', { userId: req.userId, service: service, request: { userId: userId }});
        bookings.sort((a, b) => {
            return new Date(a.dateBooked) - new Date(b.dateBooked); //sort by dateBooked in ascending order
        });
    }
    catch (error) {
        childLogger.error('Error getting all future bookings for user', { userId: req.userId, service: service, request: { userId: userId }, error: error });
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!bookings || bookings.length === 0) {
        childLogger.info('No bookings found', { userId: req.userId, service: service, request: { userId: userId }});
        return res.status(404).json({ message: 'No bookings found' });
    }
    childLogger.info('Successfully returned all future bookings for user', { userId: req.userId, service: service, request: { userId: userId }});
    return res.status(200).json(bookings);
}

async function getAllBookingsBetweenDatesForUser(req, res, next) { //function to get all bookings between two dates for a user
    service = "getAllBookingsBetweenDatesForUser";
    let userId;
    if (req.body.userId) {
        userId = req.body.userId;
    }
    //verify if userId is exists
    let user;
    try {
        childLogger.info('Verifying if user exists', { userId: req.userId, service: service, request: { userId: userId }});
        user = await User.findById(userId);
        childLogger.info('Successfully verified if user exists', { userId: req.userId, service: service, request: { userId: userId }});
    } catch (error) {
        childLogger.error('Error verifying if user exists', { userId: req.userId, service: service, request: { userId: userId }, error: error });
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!user || user.length === 0) {
        childLogger.error('User not found', { userId: req.userId, service: service, request: { userId: userId }});
        return res.status(404).json({ message: 'User not found' });
    }
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    if (!userId || userId === "") {
        childLogger.error('UserId not provided', { userId: req.userId, service: service, });
        return res.status(400).json({ message: 'User ID not provided' });
    }
    if (!startDate || !endDate) {
        childLogger.error('Start date or end date not provided', { userId: req.userId, service: service });
        return res.status(400).json({ message: 'Start date or end date not provided' });
    }
    startDate = dateFns.format(new Date(startDate), 'yyyy-MM-dd');
    endDate = dateFns.format(new Date(endDate), 'yyyy-MM-dd');
    const isDeskRequired = req.body.isDeskRequired;
    const isCabRequired = req.body.isCabRequired;
    const isFoodRequired = req.body.isFoodRequired;
    if (!isDeskRequired && !isCabRequired && !isFoodRequired) {
        childLogger.error('Desk, cab and food bookings not required', { userId: req.userId, service: service, request: { isDeskRequired: isDeskRequired, isCabRequired: isCabRequired, isFoodRequired: isFoodRequired }});
        return res.status(400).json({ message: 'Desk, cab and food bookings not required' });
    }
    let deskBookings, cabBookings, foodBookings;
    try {
        if (isDeskRequired) {
            childLogger.info('Getting all desk bookings between dates for user', { userId: req.userId, service: service, request: { userId: userId, startDate: startDate, endDate: endDate }});
            deskBookings = await DeskBookings.getDeskBookingsForUserBetweenDates(userId, startDate, endDate);
            childLogger.info('Successfully got all desk bookings between dates for user', { userId: req.userId, service: service, request: { userId: userId, startDate: startDate, endDate: endDate }});
            //add type to each booking
            for (let i = 0; i < deskBookings.length; i++) {
                deskBookings[i].type = 'Desk';
                deskBookings[i].selected = deskBookings[i].deskId;
                delete deskBookings[i].deskId;
            }
        }
        if (isCabRequired) {
            childLogger.info('Getting all cab bookings between dates for user', { userId: req.userId, service: service, request: { userId: userId, startDate: startDate, endDate: endDate }});
            cabBookings = await CabBookings.getCabBookingsForUserBetweenDates(userId, startDate, endDate);
            childLogger.info('Successfully got all cab bookings between dates for user', { userId: req.userId, service: service, request: { userId: userId, startDate: startDate, endDate: endDate }});
            //add type to each booking
            for (let i = 0; i < cabBookings.length; i++) {
                cabBookings[i].type = 'Cab';
                cabBookings[i].selected = cabBookings[i].workSlot;
                delete cabBookings[i].workSlot;
            }
        }
        if (isFoodRequired) {
            childLogger.info('Getting all food bookings between dates for user', { userId: req.userId, service: service, request: { userId: userId, startDate: startDate, endDate: endDate }});
            foodBookings = await FoodBookings.getFoodBookingsForUserBetweenDates(userId, startDate, endDate);
            childLogger.info('Successfully got all food bookings between dates for user', { userId: req.userId, service: service, request: { userId: userId, startDate: startDate, endDate: endDate }});
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
        childLogger.info('Sorting all bookings between dates for user by dateBooked', { userId: req.userId, service: service, request: { userId: userId, startDate: startDate, endDate: endDate }});
        bookings.sort((a, b) => {
            return new Date(a.dateBooked) - new Date(b.dateBooked); //sort by dateBooked in ascending order
        });
        if (!bookings || bookings.length === 0) {
            childLogger.info('No bookings found', { userId: req.userId, request: { userId: userId, service: service, startDate: startDate, endDate: endDate }});
            return res.status(404).json({ message: 'No bookings found' });
        }
        childLogger.info('Successfully returned all bookings between dates for user', { userId: req.userId, service: service, request: { userId: userId, startDate: startDate, endDate: endDate }});
        return res.status(200).json(bookings);
    }
    catch (error) {
        childLogger.error('Error getting all bookings between dates for user', { userId: req.userId, service: service, request: { userId: userId, startDate: startDate, endDate: endDate }, error: error });
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