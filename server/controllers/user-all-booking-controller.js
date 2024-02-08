// const DeskBookings = require('../models/desk-booking');
// const CabBookings = require('../models/cab-booking');
const FoodBookings = require('../models/food-booking');
const User = require('../models/user');
const dateFns = require('date-fns');
require("dotenv").config("../.env");

const logger = require('../logger/index');
const childLogger = logger.child({ module: 'user-all-booking-controller' });

const transporter = require('../mail');

let service = "";

async function getAllFutureBookingsForUser(req, res, next) { //function to get all bookings for a user
    service = "getAllFutureBookingsForUser";
    const userId = req.userId;
    //is req.body contains startDate and endDate, forward the request to getAllBookingsForUserBetweenDates controller
    if (req.body.startDate && req.body.endDate) {
        childLogger.info("Forwarding request to getAllBookingsForUserBetweenDates controller", { service: service, userId: req.userId, request: { startDate: req.body.startDate, endDate: req.body.endDate } });
        return getAllBookingsForUserBetweenDates(req, res, next);
    }
    // const isDeskRequired = req.body.isDeskRequired;
    // const isCabRequired = req.body.isCabRequired;
    const isFoodRequired = req.body.isFoodRequired;
    let bookings, foodBookings;
    if (!isFoodRequired) {
        childLogger.error("Food bookings not required", { service: service, userId: req.userId });
        return res.status(400).json({ message: 'Food bookings not required' });
    }
    try {
        // if (isDeskRequired) {
        //     childLogger.info("Getting all future desk bookings for user", { service: service, userId: req.userId });
        //     deskBookings = await DeskBookings.getFutureDeskBookingsForUser(userId);
        //     childLogger.info("Successfully got all future desk bookings for user", { service: service, userId: req.userId });
        //     //add type to each booking
        //     for (let i = 0; i < deskBookings.length; i++) {
        //         deskBookings[i].type = 'Desk';
        //         deskBookings[i].selected = deskBookings[i].deskId;
        //         delete deskBookings[i].deskId;
        //     }
        // }
        // if (isCabRequired) {
        //     childLogger.info("Getting all future cab bookings for user", { service: service, userId: req.userId });
        //     cabBookings = await CabBookings.getFutureCabBookingsForUser(userId);
        //     childLogger.info("Successfully got all future cab bookings for user", { service: service, userId: req.userId });
        //     //add type to each booking
        //     for (let i = 0; i < cabBookings.length; i++) {
        //         cabBookings[i].type = 'Cab';
        //         cabBookings[i].selected = cabBookings[i].workSlot;
        //         delete cabBookings[i].workSlot;
        //     }
        // }
        if (isFoodRequired) {
            childLogger.info("Getting all future food bookings for user", { service: service, userId: req.userId });
            foodBookings = await FoodBookings.getFutureFoodBookingsForUser(userId);
            childLogger.info("Successfully got all future food bookings for user", { service: service, userId: req.userId });
            //add type to each booking
            for (let i = 0; i < foodBookings.length; i++) {
                foodBookings[i].type = 'Food';
                foodBookings[i].selected = foodBookings[i].preference;
                delete foodBookings[i].preference;
            }
        }
        bookings = [];
        // if (isDeskRequired) bookings = bookings.concat(deskBookings);
        // if (isCabRequired) bookings = bookings.concat(cabBookings);
        if (isFoodRequired) bookings = bookings.concat(foodBookings);
        childLogger.info('Sorting all future bookings by dateBooked', { userId: req.userId, service: service });
        bookings.sort((a, b) => {
            return new Date(a.dateBooked) - new Date(b.dateBooked); //sort by dateBooked in ascending order
        });
        if (!bookings || bookings.length === 0) {
            childLogger.info("No bookings found", { service: service, userId: req.userId });
            return res.status(404).json({ message: 'No bookings found' });
        }
    } catch (error) {
        childLogger.error("Failed to get all future bookings for user", { service: service, userId: req.userId, error: error });
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    childLogger.info("Successfully returned all future bookings for user", { service: service, userId: req.userId });
    return res.status(200).json(bookings);
}

async function getCountOfAllFutureBookingsForUser(req, res, next) { //function to get count of all bookings for a user
    service = "getCountOfAllFutureBookingsForUser";
    const userId = req.userId;
    //is req.body contains startDate and endDate, forward the request to getAllBookingsForUserBetweenDates controller
    if (req.body.startDate && req.body.endDate) {
        childLogger.info("Forwarding request to getCountOfAllBookingsForUserBetweenDates controller", { service: service, userId: req.userId, request: { startDate: req.body.startDate, endDate: req.body.endDate } });
        return getCountOfAllBookingsForUserBetweenDates(req, res, next);
    }
    // const isDeskRequired = req.body.isDeskRequired;
    // const isCabRequired = req.body.isCabRequired;
    const isFoodRequired = req.body.isFoodRequired;
    let foodBookingsCount = 0;
    if (!isFoodRequired) {
        childLogger.error("Food bookings not required", { service: service, userId: req.userId });
        return res.status(400).json({ message: 'Food bookings not required' });
    }
    try {
        // if (isDeskRequired) {
        //     childLogger.info("Getting count of all future desk bookings for user", { service: service, userId: req.userId });
        //     deskBookingsCount = await DeskBookings.getCountOfFutureDeskBookingsForUser(userId);
        //     childLogger.info("Successfully got count of all future desk bookings for user", { service: service, userId: req.userId });
        // }
        // if (isCabRequired) {
        //     childLogger.info("Getting count of all future cab bookings for user", { service: service, userId: req.userId });
        //     cabBookingsCount = await CabBookings.getCountOfFutureCabBookingsForUser(userId);
        //     childLogger.info("Successfully got count of all future cab bookings for user", { service: service, userId: req.userId });
        // }
        if (isFoodRequired) {
            childLogger.info("Getting count of all future food bookings for user", { service: service, userId: req.userId });
            foodBookingsCount = await FoodBookings.getCountOfFutureFoodBookingsForUser(userId);
            childLogger.info("Successfully got count of all future food bookings for user", { service: service, userId: req.userId });
        }
    } catch (error) {
        childLogger.error("Failed to get count of all future bookings for user", { service: service, userId: req.userId, error: error });
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    childLogger.info("Successfully returned count of all future bookings for user", { service: service, userId: req.userId });
    return res.status(200).json({ foodBookingsCount: foodBookingsCount });
}

async function getCountOfAllBookingsForUserBetweenDates(req, res, next) { //function to get count of all bookings for a user between two dates
    service = "getCountOfAllBookingsForUserBetweenDates";
    const userId = req.userId;
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    if (!startDate || !endDate) {
        childLogger.error("Start date or end date not provided", { service: service, userId: req.userId });
        return res.status(400).json({ message: 'Start date or end date not provided' });
    }
    childLogger.info('Formatting start date and end date', { userId: req.userId, service: service, request: { startDate: startDate, endDate: endDate }});
    startDate = dateFns.format(new Date(startDate), 'yyyy-MM-dd');
    endDate = dateFns.format(new Date(endDate), 'yyyy-MM-dd');
    // const isDeskRequired = req.body.isDeskRequired;
    // const isCabRequired = req.body.isCabRequired;
    const isFoodRequired = req.body.isFoodRequired;
    if (!isFoodRequired) {
        childLogger.error("Food bookings not required", { service: service, userId: req.userId });
        return res.status(400).json({ message: 'Food bookings not required' });
    }
    let foodBookingsCount = 0;
    try {
        // if (isDeskRequired) {
        //     childLogger.info("Getting count of all desk bookings for user between two dates", { service: service, userId: req.userId, request: { startDate: startDate, endDate: endDate } });
        //     deskBookingsCount = await DeskBookings.getCountOfDeskBookingsForUserBetweenDates(userId, startDate, endDate);
        //     childLogger.info("Successfully got count of all desk bookings for user between two dates", { service: service, userId: req.userId, request: { startDate: startDate, endDate: endDate } });
        // }
        // if (isCabRequired) {
        //     childLogger.info("Getting count of all cab bookings for user between two dates", { service: service, userId: req.userId, request: { startDate: startDate, endDate: endDate } });
        //     cabBookingsCount = await CabBookings.getCountOfCabBookingsForUserBetweenDates(userId, startDate, endDate);
        //     childLogger.info("Successfully got count of all cab bookings for user between two dates", { service: service, userId: req.userId, request: { startDate: startDate, endDate: endDate } });
        // }
        if (isFoodRequired) {
            childLogger.info("Getting count of all food bookings for user between two dates", { service: service, userId: req.userId, request: { startDate: startDate, endDate: endDate } });
            foodBookingsCount = await FoodBookings.getCountOfFoodBookingsForUserBetweenDates(userId, startDate, endDate);
            childLogger.info("Successfully got count of all food bookings for user between two dates", { service: service, userId: req.userId, request: { startDate: startDate, endDate: endDate } });
        }
    } catch (error) {
        childLogger.error("Failed to get count of all bookings for user between two dates", { service: service, userId: req.userId, error: error });
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    childLogger.info("Successfully returned count of all bookings for user between two dates", { service: service, userId: req.userId, request: { startDate: startDate, endDate: endDate } });
    return res.status(200).json({ foodBookingsCount: foodBookingsCount });
}

async function getAllBookingsForUserBetweenDates(req, res, next) { //function to get all bookings for a user between two dates
    service = "getAllBookingsForUserBetweenDates";
    const userId = req.userId;
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    if (!startDate || !endDate) {
        childLogger.error("Start date or end date not provided", { service: service, userId: req.userId });
        return res.status(400).json({ message: 'Start date or end date not provided' });
    }
    childLogger.info('Formatting start date and end date', { userId: req.userId, service: service, request: { startDate: startDate, endDate: endDate }});
    startDate = dateFns.format(new Date(startDate), 'yyyy-MM-dd');
    endDate = dateFns.format(new Date(endDate), 'yyyy-MM-dd');
    // const isDeskRequired = req.body.isDeskRequired;
    // const isCabRequired = req.body.isCabRequired;
    const isFoodRequired = req.body.isFoodRequired;
    if (!isFoodRequired) {
        childLogger.error("Food bookings not required", { service: service, userId: req.userId });
        return res.status(400).json({ message: 'Food bookings not required' });
    }
    let foodBookings;
    try {
        // if (isDeskRequired) {
        //     childLogger.info("Getting all desk bookings for user between two dates", { service: service, userId: req.userId, request: { startDate: startDate, endDate: endDate } });
        //     deskBookings = await DeskBookings.getDeskBookingsForUserBetweenDates(userId, startDate, endDate);
        //     childLogger.info("Successfully got all desk bookings for user between two dates", { service: service, userId: req.userId, request: { startDate: startDate, endDate: endDate } });
        //     //add type to each booking
        //     for (let i = 0; i < deskBookings.length; i++) {
        //         deskBookings[i].type = 'Desk';
        //         deskBookings[i].selected = deskBookings[i].deskId;
        //         delete deskBookings[i].deskId;
        //     }
        // }
        // if (isCabRequired) {
        //     childLogger.info("Getting all cab bookings for user between two dates", { service: service, userId: req.userId, request: { startDate: startDate, endDate: endDate } });
        //     cabBookings = await CabBookings.getCabBookingsForUserBetweenDates(userId, startDate, endDate);
        //     childLogger.info("Successfully got all cab bookings for user between two dates", { service: service, userId: req.userId, request: { startDate: startDate, endDate: endDate } });
        //     //add type to each booking
        //     for (let i = 0; i < cabBookings.length; i++) {
        //         cabBookings[i].type = 'Cab';
        //         cabBookings[i].selected = cabBookings[i].workSlot;
        //         delete cabBookings[i].workSlot;
        //     }
        // }
        if (isFoodRequired) {
            childLogger.info("Getting all food bookings for user between two dates", { service: service, userId: req.userId, request: { startDate: startDate, endDate: endDate } });
            foodBookings = await FoodBookings.getFoodBookingsForUserBetweenDates(userId, startDate, endDate);
            childLogger.info("Successfully got all food bookings for user between two dates", { service: service, userId: req.userId, request: { startDate: startDate, endDate: endDate } });
            //add type to each booking
            for (let i = 0; i < foodBookings.length; i++) {
                foodBookings[i].type = 'Food';
                foodBookings[i].selected = foodBookings[i].preference;
                delete foodBookings[i].preference;
            }
        }
        let bookings = [];
        // if (isDeskRequired) bookings = bookings.concat(deskBookings);
        // if (isCabRequired) bookings = bookings.concat(cabBookings);
        if (isFoodRequired) bookings = bookings.concat(foodBookings);
        childLogger.info('Sorting all bookings by dateBooked', { userId: req.userId, service: service });
        bookings.sort((a, b) => {
            return new Date(a.dateBooked) - new Date(b.dateBooked); //sort by dateBooked in ascending order
        });
        if (!bookings || bookings.length === 0) {
            childLogger.info("No bookings found", { service: service, userId: req.userId });
            return res.status(404).json({ message: 'No bookings found' });
        }
        childLogger.info("Successfully returned all bookings for user between two dates", { service: service, userId: req.userId, request: { startDate: startDate, endDate: endDate } });
        return res.status(200).json(bookings);
    } catch (error) {
        childLogger.error("Failed to get all bookings for user between two dates", { service: service, userId: req.userId, error: error });
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function bookAll(req, res, next) { //function to book a desk, cab and food for a user for multiple dates (array of dates)
    service = "bookAll";
    const userId = req.userId;
    // const isDeskRequired = req.body.isDeskRequired;
    // const isCabRequired = req.body.isCabRequired;
    const isFoodRequired = req.body.isFoodRequired;
    let dates;
    // let deskId;
    // let workSlot;
    let preference;
    if (!req.body.dates || req.body.dates.length === 0) {
        childLogger.error("Dates not provided", { service: service, userId: req.userId });
        return res.status(400).json({ message: 'Dates not provided' });
    } else {
        dates = req.body.dates;
    }
    // if (isDeskRequired && (!req.body.deskId || req.body.deskId === '' || req.body.deskId.length === 0)) {
    //     childLogger.error("Desk id not provided", { service: service, userId: req.userId });
    //     return res.status(400).json({ message: 'Desk id not provided' });
    // } else {
    //     deskId = req.body.deskId;
    //     if(!Array.isArray(deskId)) deskId = [deskId];
    //     if(dates.length !== deskId.length) return res.status(400).json({ message: 'Number of dates and number of desks do not match' });
    // }
    // if (isCabRequired && (!req.body.workSlot || req.body.workSlot === '' || req.body.workSlot.length === 0)) {
    //     childLogger.error("Work slot not provided", { service: service, userId: req.userId });
    //     return res.status(400).json({ message: 'Work slot not provided' });
    // } else {
    //     workSlot = req.body.workSlot;
    //     if(!Array.isArray(workSlot)) workSlot = [workSlot];
    //     if(dates.length !== workSlot.length) return res.status(400).json({ message: 'Number of dates and number of work slots do not match' });
    // }
    if (isFoodRequired && (!req.body.preference || req.body.preference === '' || req.body.preference.length === 0)) {
        childLogger.error("Preference not provided", { service: service, userId: req.userId });
        return res.status(400).json({ message: 'Preference not provided' });
    } else {
        preference = req.body.preference;
        if(!Array.isArray(preference)) preference = [preference];
        if(dates.length !== preference.length) return res.status(400).json({ message: 'Number of dates and number of preferences do not match' });
    }
    if (!isFoodRequired) {
        childLogger.error("Food not required", { service: service, userId: req.userId });
        return res.status(400).json({ message: 'Food not required' });
    }
    if (!Array.isArray(dates)) dates = [dates];
    for (let i = 0; i < dates.length; i++) {
        dates[i] = dateFns.format(new Date(dates[i]), 'yyyy-MM-dd');
    }
    childLogger.info('Formatting dates and checking buffer', { userId: req.userId, service: service, request: { dates: dates, isFoodRequired: isFoodRequired }});
    // if (isDeskRequired) {
    //     //verify if date is in future starting "duration" "units" from now
    //     const durationUnitsFromNow = dateFns.format(dateFns.addDays(new Date(), Number(process.env.DESK_BUFFER_DURATION)), 'yyyy-MM-dd');
    //     for (let i = 0; i < dates.length; i++) {
    //         if (dateFns.isBefore(new Date(dates[i]), new Date(durationUnitsFromNow))) { //if date is before durationUnitsFromNow
    //             return res.status(400).json({ message: 'Date is not ' + process.env.DESK_BUFFER_DURATION + ' ' + process.env.DESK_BUFFER_UNIT + ' ahead from today for desk booking!' });
    //         }
    //     }
    // }
    // if (isCabRequired) {
    //     //verify if date is in future starting "duration" "units" from now
    //     const durationUnitsFromNow = dateFns.format(dateFns.addDays(new Date(), Number(process.env.CAB_BUFFER_DURATION)), 'yyyy-MM-dd');
    //     for (let i = 0; i < dates.length; i++) {
    //         if (dateFns.isBefore(new Date(dates[i]), new Date(durationUnitsFromNow))) { //if date is before durationUnitsFromNow
    //             return res.status(400).json({ message: 'Date is not ' + process.env.CAB_BUFFER_DURATION + ' ' + process.env.CAB_BUFFER_UNIT + ' ahead from today for cab booking!' });
    //         }
    //     }
    // }
    if (isFoodRequired) {
        //verify if date is in future starting "duration" "units" from now
        const durationUnitsFromNow = dateFns.format(dateFns.addDays(new Date(), Number(process.env.FOOD_BUFFER_DURATION)), 'yyyy-MM-dd');
        for (let i = 0; i < dates.length; i++) {
            if (dateFns.isBefore(new Date(dates[i]), new Date(durationUnitsFromNow))) { //if date is before durationUnitsFromNow
                return res.status(400).json({ message: 'Date is not ' + process.env.FOOD_BUFFER_DURATION + ' ' + process.env.FOOD_BUFFER_UNIT + ' ahead from today for food booking!' });
            }
        }
    }
    // if (isDeskRequired) {
    //     //check if the user has already booked a desk for any of the dates
    //     let userBookings;
    //     try {
    //         childLogger.info("Getting desk bookings for user for dates", { service: service, userId: req.userId, request: { dates: dates } });
    //         userBookings = await DeskBookings.getDeskBookingsForUserForDates(userId, dates);
    //         childLogger.info("Successfully got desk bookings for user for dates", { service: service, userId: req.userId, request: { dates: dates } });
    //     } catch (error) {
    //         childLogger.error("Failed to get desk bookings for user for dates", { service: service, userId: req.userId, request: { dates: dates }, error: error });
    //         return res.status(500).json({ message: 'Internal Server Error' });
    //     }
    //     if (userBookings && userBookings.length > 0) {
    //         childLogger.error("User has already booked a desk for one or more of the dates", { service: service, userId: req.userId });
    //         return res.status(400).json({ message: 'User has already booked a desk for one or more of the dates' });
    //     }
    //     //check if the desks are already booked for corresponding selected dates
    //     let bookings;
    //     try {
    //         childLogger.info("Getting desk bookings by desk id and dates", { service: service, userId: req.userId, request: { deskId: deskId, dates: dates } });
    //         for (let i = 0; i < deskId.length; i++) {
    //             bookings = await DeskBookings.getDeskBookingByDeskIdAndDates(deskId[i], dates[i]); //check if desk is already booked for any of the dates
    //             if (bookings && bookings.length > 0) break;
    //         }
    //         childLogger.info("Successfully got desk bookings by desk id and dates", { service: service, userId: req.userId, request: { deskId: deskId, dates: dates } });
    //     } catch (error) {
    //         childLogger.error("Failed to get desk bookings by desk id and dates", { service: service, userId: req.userId, request: { deskId: deskId, dates: dates }, error: error });
    //         return res.status(500).json({ message: 'Internal Server Error' });
    //     }
    //     if (!bookings) bookings = []; //if bookings is undefined, then set bookings to empty array
    //     if (bookings.length > 0) { //if desk is required but already booked for any of the dates, then return error
    //         childLogger.error("Desk already booked for one or more of the dates", { service: service, userId: req.userId });
    //         return res.status(400).json({ message: 'Desk already booked for one or more of the dates' });
    //     }
    // }
    // if (isFoodRequired) { //if only cab or food is required, then verify that there is a desk booking for the dates by the user
        // let deskBookings;
        // try {
        //     childLogger.info("Getting desk bookings for user for dates", { service: service, userId: req.userId, request: { dates: dates } });
        //     deskBookings = await DeskBookings.getDeskBookingsForUserForDates(userId, dates);
        //     childLogger.info("Successfully got desk bookings for user for dates", { service: service, userId: req.userId, request: { dates: dates } });
        // } catch (error) {
        //     childLogger.error("Failed to get desk bookings for user for dates", { service: service, userId: req.userId, request: { dates: dates }, error: error });
        //     return res.status(500).json({ message: 'Internal Server Error' });
        // }
        // if (!deskBookings || deskBookings.length === 0 || deskBookings.length !== dates.length) {
        //     childLogger.error("No desk booking found for the dates", { service: service, userId: req.userId });
        //     return res.status(404).json({ message: 'No desk booking found for the dates' });
        // }
    // }
    // if(isCabRequired) { //if cab is required, then verify that there is no cab booking for the dates
    //     let cabBookings;
    //     try {
    //         childLogger.info("Getting cab bookings for user for dates", { service: service, userId: req.userId, request: { dates: dates } });
    //         cabBookings = await CabBookings.getCabBookingsForUserForDates(userId, dates);
    //         childLogger.info("Successfully got cab bookings for user for dates", { service: service, userId: req.userId, request: { dates: dates } });
    //     } catch (error) {
    //         childLogger.error("Failed to get cab bookings for user for dates", { service: service, userId: req.userId, request: { dates: dates }, error: error });
    //         return res.status(500).json({ message: 'Internal Server Error' });
    //     }
    //     if (cabBookings && cabBookings.length > 0) {
    //         childLogger.error("Cab already booked for one or more of the dates", { service: service, userId: req.userId });
    //         return res.status(400).json({ message: 'Cab already booked for one or more of the dates' });
    //     }
    // }
    if(isFoodRequired) { //if food is required, then verify that there is no food booking for the dates
        let foodBookings;
        try {
            childLogger.info("Getting food bookings for user for dates", { service: service, userId: req.userId, request: { dates: dates } });
            foodBookings = await FoodBookings.getFoodBookingsForUserForDates(userId, dates);
            childLogger.info("Successfully got food bookings for user for dates", { service: service, userId: req.userId, request: { dates: dates } });
        } catch (error) {
            childLogger.error("Failed to get food bookings for user for dates", { service: service, userId: req.userId, request: { dates: dates }, error: error });
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (foodBookings && foodBookings.length > 0) {
            childLogger.error("Food already booked for one or more of the dates", { service: service, userId: req.userId });
            return res.status(400).json({ message: 'Food already booked for one or more of the dates' });
        }
    }
    let foodBooking;
    try {
        // if (isDeskRequired) {
        //     childLogger.info("Booking desk for user", { service: service, userId: req.userId, request: { deskId: deskId, dates: dates } });
        //     // deskBooking = await DeskBookings.bookDesk(deskId, userId, dates);
        //     for (let i = 0; i < deskId.length; i++) {
        //         deskBooking = await DeskBookings.bookDesk(deskId[i], userId, dates[i]);
        //         if (!deskBooking || deskBooking.length === 0) {
        //             childLogger.error("Desk booking failed", { service: service, userId: req.userId });
        //             return res.status(400).json({ message: 'Desk booking failed!' });
        //         }
        //     }
        //     childLogger.info("Successfully booked desk for user", { service: service, userId: req.userId, request: { deskId: deskId, dates: dates } });
        // }
        // if (isCabRequired) {
        //     childLogger.info("Booking cab for user", { service: service, userId: req.userId, request: { dates: dates, workSlot: workSlot } });
        //     // cabBooking = await CabBookings.bookCab(userId, dates, workSlot);
        //     // if (!cabBooking || cabBooking.length === 0) {
        //     //     childLogger.error("Cab booking failed", { service: service, userId: req.userId });
        //     //     return res.status(400).json({ message: 'Cab booking failed!' });
        //     // }
        //     console.log(workSlot);
        //     for (let i = 0; i < dates.length; i++) {
        //         if(!workSlot[i] || workSlot[i] === 'None' || workSlot[i] === 'none' || workSlot[i] === '') continue; //if workSlot is None, then do not book cab for that date
        //         cabBooking = await CabBookings.bookCab(userId, dates[i], workSlot[i]);
        //         if (!cabBooking || cabBooking.length === 0) {
        //             childLogger.error("Cab booking failed", { service: service, userId: req.userId });
        //             return res.status(400).json({ message: 'Cab booking failed!' });
        //         }
        //     }
        //     childLogger.info("Successfully booked cab for user", { service: service, userId: req.userId, request: { dates: dates, workSlot: workSlot } });
        // }
        if (isFoodRequired) {
            childLogger.info("Booking food for user", { service: service, userId: req.userId, request: { dates: dates, preference: preference } });
            // foodBooking = await FoodBookings.bookFood(userId, dates, preference);
            // if (!foodBooking || foodBooking.length === 0) {
            //     childLogger.error("Food booking failed", { service: service, userId: req.userId });
            //     return res.status(400).json({ message: 'Food booking failed!' });
            // }
            for (let i = 0; i < dates.length; i++) {
                if(!preference[i] || preference[i] === 'None' || preference[i] === 'none' || preference[i] === '') continue; //if preference is None, then do not book food for that date
                foodBooking = await FoodBookings.bookFood(userId, dates[i], preference[i]);
                if (!foodBooking || foodBooking.length === 0) {
                    childLogger.error("Food booking failed", { service: service, userId: req.userId });
                    return res.status(400).json({ message: 'Food booking failed!' });
                }
            }
            childLogger.info("Successfully booked food for user", { service: service, userId: req.userId, request: { dates: dates, preference: preference } });
        }
    } catch (error) {
        childLogger.error("Failed to book food for user", { service: service, userId: req.userId, error: error });
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    childLogger.info("Booking successfull", { service: service, userId: req.userId, request: { dates: dates} });

    //get email and name of user
    let user;
    try {
        childLogger.info("Getting user by id", { service: service, userId: req.userId, request: { userId: userId } });
        user = await User.findById(userId);
        childLogger.info("Successfully got user by id", { service: service, userId: req.userId, request: { userId: userId } });
    } catch (error) {
        childLogger.error("Failed to get user by id", { service: service, userId: req.userId, request: { userId: userId }, error: error });
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!user || user.length === 0) {
        childLogger.error("User not found", { service: service, userId: req.userId });
        return res.status(404).json({ message: 'User not found' });
    }
    //send email to user
    try {
        childLogger.info("Sending email to user", { service: service, userId: req.userId});
        await transporter.sendMail({
            from: '"ABC Group EMS" <mybookings@abcgroup.com>', // sender address
            to: user.email,
            subject: 'Booking Successful!',
            //if isDeskRequired is true, then add deskId to email, if isCabRequired is true, then add workSlot to email, if isFoodRequired is true, then add preference to email with corresponding dates
            html: `<p>Hey ${user.first_name},</p><p>Your booking for the following dates has been confirmed:</p><p>${dates.map((date, index) => {
                // let desk = '';
                // let cab = '';
                let food = '';
                // if (isDeskRequired) desk = 'Desk: ' + deskId[index] + '<br>';
                // if (isCabRequired) cab = 'Work Slot: ' + workSlot[index] + '<br>';
                if (isFoodRequired) food = 'Preference: ' + preference[index] + '<br>';
                return ('<b>' + date + ':</b>' + '<br>' + food);
            }).join('<br>')}</p><p>Regards,<br>Employee Management System,<br>ABC Group</p>`
        });
        childLogger.info("Successfully sent email to user", { service: service, userId: req.userId });
    } catch (error) {
        childLogger.error("Failed to send email to user", { service: service, userId: req.userId, error: error });
    }

    return res.status(201).json({ message: 'Booked successfully', foodBookingId: foodBooking });
}

async function modifyAll(req, res, next) { //function to modify a cab or food booking for a user for single date in dates variable
    service = "modifyAll";
    const userId = req.userId;
    // const modifyCab = req.body.modifyCab;
    const modifyFood = req.body.modifyFood;
    let dates;
    let workSlot;
    let preference;
    if (!req.body.dates || req.body.dates.length === 0) {
        childLogger.error("Date not provided", { service: service, userId: req.userId });
        return res.status(400).json({ message: 'Date not provided' });
    } else {
        dates = req.body.dates;
    }
    // if (modifyCab && !req.body.workSlot) {
    //     childLogger.error("Work slot not provided", { service: service, userId: req.userId });
    //     return res.status(400).json({ message: 'Work slot not provided' });
    // } else {
    //     workSlot = req.body.workSlot;
    // }
    if (modifyFood && !req.body.preference) {
        childLogger.error("Preference not provided", { service: service, userId: req.userId });
        return res.status(400).json({ message: 'Preference not provided' });
    } else {
        preference = req.body.preference;
    }
    if (!modifyFood) {
        childLogger.error("Food not to be modified", { service: service, userId: req.userId });
        return res.status(400).json({ message: 'Nothing to be modified' });
    }
    if (!Array.isArray(dates)) dates = [dates];
    dates[0] = dateFns.format(new Date(dates[0]), 'yyyy-MM-dd');
    childLogger.info('Formatting dates and checking buffer', { userId: req.userId, service: service, request: { dates: dates, modifyFood: modifyFood }});
    //verify if date is in future starting next day
    const durationUnitsFromNow = dateFns.format(dateFns.addDays(new Date(), 1), 'yyyy-MM-dd');
    if (dateFns.isBefore(new Date(dates[0]), new Date(durationUnitsFromNow))) { //if date is before durationUnitsFromNow
        return res.status(400).json({ message: 'Date should be a day ahead from today for modification!' });
    }
    // if (modifyCab) {
    //     //verify that there is a cab booking for the date
    //     let cabBookings;
    //     try {
    //         childLogger.info("Getting cab bookings for user for dates", { service: service, userId: req.userId, request: { dates: dates } });
    //         cabBookings = await CabBookings.getCabBookingsForUserForDates(userId, dates);
    //         childLogger.info("Successfully got cab bookings for user for dates", { service: service, userId: req.userId, request: { dates: dates } });
    //     } catch (error) {
    //         childLogger.error("Failed to get cab bookings for user for dates", { service: service, userId: req.userId, request: { dates: dates }, error: error });
    //         return res.status(500).json({ message: 'Internal Server Error' });
    //     }
    //     if (!cabBookings || cabBookings.length === 0) {
    //         childLogger.error("No cab booking found for the date", { service: service, userId: req.userId });
    //         return res.status(404).json({ message: 'No cab booking found for the date' });
    //     }
    //     try {
    //         childLogger.info("Modifying cab booking for user", { service: service, userId: req.userId, request: { dates: dates, workSlot: workSlot } });
    //         await CabBookings.modifyCabBooking(userId, dates[0], workSlot); //modify cab booking by updating row in cab bookings table
    //         childLogger.info("Successfully modified cab booking for user", { service: service, userId: req.userId, request: { dates: dates, workSlot: workSlot } });
    //     }
    //     catch (error) {
    //         childLogger.error("Failed to modify cab booking for user", { service: service, userId: req.userId, request: { dates: dates, workSlot: workSlot }, error: error });
    //         return res.status(500).json({ message: 'Internal Server Error' });
    //     }
    // }
    if (modifyFood) {
        //verify that there is a food booking for the date
        let foodBookings;
        try {
            childLogger.info("Getting food bookings for user for dates", { service: service, userId: req.userId, request: { dates: dates } });
            foodBookings = await FoodBookings.getFoodBookingsForUserForDates(userId, dates);
            childLogger.info("Successfully got food bookings for user for dates", { service: service, userId: req.userId, request: { dates: dates } });
        } catch (error) {
            childLogger.error("Failed to get food bookings for user for dates", { service: service, userId: req.userId, request: { dates: dates }, error: error });
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (!foodBookings || foodBookings.length === 0) {
            childLogger.error("No food booking found for the date", { service: service, userId: req.userId });
            return res.status(404).json({ message: 'No food booking found for the date' });
        }
        try {
            childLogger.info("Modifying food booking for user", { service: service, userId: req.userId, request: { dates: dates, preference: preference } });
            await FoodBookings.modifyFoodBooking(userId, dates[0], preference); //modify food booking by updating row in food bookings table
            childLogger.info("Successfully modified food booking for user", { service: service, userId: req.userId, request: { dates: dates, preference: preference } });
        }
        catch (error) {
            childLogger.error("Failed to modify food booking for user", { service: service, userId: req.userId, request: { dates: dates, preference: preference }, error: error });
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    childLogger.info("Modification successfull", { service: service, userId: req.userId, request: { dates: dates} });

    //get email and name of user
    let user;
    try {
        user = await User.findById(userId);
    } catch (error) {
        childLogger.error("Failed to get user by id", { service: service, userId: req.userId, request: { userId: userId }, error: error });
        return res.status(500).json({ message: 'Internal Server Error' });
    }

    //send email to user
    try {
        childLogger.info("Sending email to user", { service: service, userId: req.userId});
        await transporter.sendMail({
            from: '"ABC Group EMS" <mybookings@abcgroup.com>', // sender address
            to: user.email,
            subject: 'Modification Successful!',
            //if modifyCab is true, then add workSlot to email, if modifyFood is true, then add preference to email with corresponding dates
            html: `<p>Hey ${user.first_name},</p><p>Your booking for the following dates has been modified:</p><p>${dates.map((date, index) => {
                // let cab = '';
                let food = '';
                // if (modifyCab) cab = 'Cab Booking -> Work Slot: ' + workSlot + '<br>';
                if (modifyFood) food = 'Food Booking -> Preference: ' + preference + '<br>';
                return ('<b>' + date + ':</b>' + '<br>' + food);
            }
            ).join('<br>')}</p><p>Regards,<br>Employee Management System,<br>ABC Group</p>`
        });
        childLogger.info("Successfully sent email to user", { service: service, userId: req.userId });
    } catch (error) {
        childLogger.error("Failed to send email to user", { service: service, userId: req.userId, error: error });
    }
    return res.status(200).json({ message: 'Booking modified successfully!' });
}

async function cancelAll(req, res, next) { //function to cancel a desk, cab and food booking for a user for single date in dates variable
    service = "cancelAll";
    const userId = req.userId;
    // let cancelDesk = req.body.cancelDesk;
    // let cancelCab = req.body.cancelCab;
    let cancelFood = req.body.cancelFood;
    let dates;
    if (!req.body.dates || req.body.dates.length === 0) {
        childLogger.error("Date not provided", { service: service, userId: req.userId });
        return res.status(400).json({ message: 'Date not provided' });
    } else {
        dates = req.body.dates;
    }
    if (!Array.isArray(dates)) dates = [dates];
    dates[0] = dateFns.format(new Date(dates[0]), 'yyyy-MM-dd');
    if (!cancelFood) {
        childLogger.error("Food not to be cancelled", { service: service, userId: req.userId });
        return res.status(400).json({ message: 'Food not to be cancelled' });
    }
    childLogger.info('Formatting dates and checking buffer', { userId: req.userId, service: service, request: { dates: dates, cancelFood: cancelFood }});
    //verify if date is in future starting next day
    const durationUnitsFromNow = dateFns.format(dateFns.addDays(new Date(), 1), 'yyyy-MM-dd');
    if (dateFns.isBefore(new Date(dates[0]), new Date(durationUnitsFromNow))) { //if date is before durationUnitsFromNow
        return res.status(400).json({ message: 'Date should be a day ahead from today for cancellation!' });
    }
    let foodBookings;
    if (cancelFood) {
        //verify that there is a food booking for the date
        try {
            childLogger.info("Getting food bookings for user for dates", { service: service, userId: req.userId, request: { dates: dates } });
            foodBookings = await FoodBookings.getFoodBookingsForUserForDates(userId, dates);
            childLogger.info("Successfully got food bookings for user for dates", { service: service, userId: req.userId, request: { dates: dates } });
        } catch (error) {
            childLogger.error("Failed to get food bookings for user for dates", { service: service, userId: req.userId, request: { dates: dates }, error: error });
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (!foodBookings || foodBookings.length === 0) {
            childLogger.error("No food booking found for the date", { service: service, userId: req.userId });
            return res.status(404).json({ message: 'No food booking found for the date' });
        }
        try {
            childLogger.info("Canceling food booking for user", { service: service, userId: req.userId, request: { dates: dates } });
            await FoodBookings.cancelFoodBooking(userId, dates[0]); //cancel food booking by deleting row from food bookings table
            childLogger.info("Successfully canceled food booking for user", { service: service, userId: req.userId, request: { dates: dates } });
        } catch (error) {
            childLogger.error("Failed to cancel food booking for user", { service: service, userId: req.userId, request: { dates: dates }, error: error });
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    childLogger.info("Cancellation successfull", { service: service, userId: req.userId, request: { dates: dates} });

    //get email and name of user
    let user;
    try {
        user = await User.findById(userId);
    } catch (error) {
        childLogger.error("Failed to get user by id", { service: service, userId: req.userId, request: { userId: userId }, error: error });
        return res.status(500).json({ message: 'Internal Server Error' });
    }

    //send email to user
    try {
        childLogger.info("Sending email to user", { service: service, userId: req.userId});
        await transporter.sendMail({
            from: '"ABC Group EMS" <mybookings@abcgroup.com>', // sender address
            to: user.email,
            subject: 'Cancellation Successful!',
            //if cancelDesk is true, then add deskId to email, if cancelCab is true, then add workSlot to email, if cancelFood is true, then add preference to email with corresponding dates
            html: `<p>Hey ${user.first_name},</p><p>Your booking for the following dates has been cancelled:</p><p>${dates.map((date, index) => {
                // let desk = '';
                // let cab = '';
                let food = '';
                // if (cancelDesk) desk = 'Desk Booking Cancelled<br>';
                // if (cancelCab) cab = 'Cab Booking Cancelled<br>';
                if (cancelFood) food = 'Food Booking Cancelled<br>';
                return ('<b>' + date + ':</b>' + '<br>' + food);
            }).join('<br>')}</p><p>Regards,<br>Employee Management System,<br>ABC Group</p>`
        });
        childLogger.info("Successfully sent email to user", { service: service, userId: req.userId });
    }
    catch (error) {
        childLogger.error("Failed to send email to user", { service: service, userId: req.userId, error: error });
    }

    return res.status(200).json({ message: 'Booking canceled successfully' });
}

module.exports = {
    getAllFutureBookingsForUser: getAllFutureBookingsForUser,
    getCountOfAllFutureBookingsForUser: getCountOfAllFutureBookingsForUser,
    getCountOfAllBookingsForUserBetweenDates: getCountOfAllBookingsForUserBetweenDates,
    getAllBookingsForUserBetweenDates: getAllBookingsForUserBetweenDates,
    bookAll: bookAll,
    modifyAll: modifyAll,
    cancelAll: cancelAll
}