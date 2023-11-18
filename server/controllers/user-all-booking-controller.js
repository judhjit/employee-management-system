const DeskBookings = require('../models/desk-booking');
const CabBookings = require('../models/cab-booking');
const FoodBookings = require('../models/food-booking');
const dateFns = require('date-fns');
require("dotenv").config("../.env");

const logger = require('../logger/index');
const childLogger = logger.child({ module: 'user-all-booking-controller' });

let service = "";

async function getAllFutureBookingsForUser(req, res, next) { //function to get all bookings for a user
    service = "getAllFutureBookingsForUser";
    const userId = req.userId;
    //is req.body contains startDate and endDate, forward the request to getAllBookingsForUserBetweenDates controller
    if (req.body.startDate && req.body.endDate) {
        childLogger.info("Forwarding request to getAllBookingsForUserBetweenDates controller", { service: service, userId: req.userId, request: { startDate: req.body.startDate, endDate: req.body.endDate } });
        return getAllBookingsForUserBetweenDates(req, res, next);
    }
    const isDeskRequired = req.body.isDeskRequired;
    const isCabRequired = req.body.isCabRequired;
    const isFoodRequired = req.body.isFoodRequired;
    let bookings, deskBookings, cabBookings, foodBookings;
    if ((!isDeskRequired && !isCabRequired) && !isFoodRequired) {
        childLogger.error("Desk, cab and food bookings not required", { service: service, userId: req.userId });
        return res.status(400).json({ message: 'Desk, cab and food bookings not required' });
    }
    try {
        if (isDeskRequired) {
            childLogger.info("Getting all future desk bookings for user", { service: service, userId: req.userId });
            deskBookings = await DeskBookings.getFutureDeskBookingsForUser(userId);
            childLogger.info("Successfully got all future desk bookings for user", { service: service, userId: req.userId });
            //add type to each booking
            for (let i = 0; i < deskBookings.length; i++) {
                deskBookings[i].type = 'Desk';
                deskBookings[i].selected = deskBookings[i].deskId;
                delete deskBookings[i].deskId;
            }
        }
        if (isCabRequired) {
            childLogger.info("Getting all future cab bookings for user", { service: service, userId: req.userId });
            cabBookings = await CabBookings.getFutureCabBookingsForUser(userId);
            childLogger.info("Successfully got all future cab bookings for user", { service: service, userId: req.userId });
            //add type to each booking
            for (let i = 0; i < cabBookings.length; i++) {
                cabBookings[i].type = 'Cab';
                cabBookings[i].selected = cabBookings[i].workSlot;
                delete cabBookings[i].workSlot;
            }
        }
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
        if (isDeskRequired) bookings = bookings.concat(deskBookings);
        if (isCabRequired) bookings = bookings.concat(cabBookings);
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
    const isDeskRequired = req.body.isDeskRequired;
    const isCabRequired = req.body.isCabRequired;
    const isFoodRequired = req.body.isFoodRequired;
    let deskBookingsCount = 0, cabBookingsCount = 0, foodBookingsCount = 0;
    if (!isDeskRequired && !isCabRequired && !isFoodRequired) {
        childLogger.error("Desk, cab and food bookings not required", { service: service, userId: req.userId });
        return res.status(400).json({ message: 'Desk, cab and food bookings not required' });
    }
    try {
        if (isDeskRequired) {
            childLogger.info("Getting count of all future desk bookings for user", { service: service, userId: req.userId });
            deskBookingsCount = await DeskBookings.getCountOfFutureDeskBookingsForUser(userId);
            childLogger.info("Successfully got count of all future desk bookings for user", { service: service, userId: req.userId });
        }
        if (isCabRequired) {
            childLogger.info("Getting count of all future cab bookings for user", { service: service, userId: req.userId });
            cabBookingsCount = await CabBookings.getCountOfFutureCabBookingsForUser(userId);
            childLogger.info("Successfully got count of all future cab bookings for user", { service: service, userId: req.userId });
        }
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
    return res.status(200).json({ deskBookingsCount: deskBookingsCount, cabBookingsCount: cabBookingsCount, foodBookingsCount: foodBookingsCount });
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
    const isDeskRequired = req.body.isDeskRequired;
    const isCabRequired = req.body.isCabRequired;
    const isFoodRequired = req.body.isFoodRequired;
    if (!isDeskRequired && !isCabRequired && !isFoodRequired) {
        childLogger.error("Desk, cab and food bookings not required", { service: service, userId: req.userId });
        return res.status(400).json({ message: 'Desk, cab and food bookings not required' });
    }
    let deskBookingsCount = 0, cabBookingsCount = 0, foodBookingsCount = 0;
    try {
        if (isDeskRequired) {
            childLogger.info("Getting count of all desk bookings for user between two dates", { service: service, userId: req.userId, request: { startDate: startDate, endDate: endDate } });
            deskBookingsCount = await DeskBookings.getCountOfDeskBookingsForUserBetweenDates(userId, startDate, endDate);
            childLogger.info("Successfully got count of all desk bookings for user between two dates", { service: service, userId: req.userId, request: { startDate: startDate, endDate: endDate } });
        }
        if (isCabRequired) {
            childLogger.info("Getting count of all cab bookings for user between two dates", { service: service, userId: req.userId, request: { startDate: startDate, endDate: endDate } });
            cabBookingsCount = await CabBookings.getCountOfCabBookingsForUserBetweenDates(userId, startDate, endDate);
            childLogger.info("Successfully got count of all cab bookings for user between two dates", { service: service, userId: req.userId, request: { startDate: startDate, endDate: endDate } });
        }
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
    return res.status(200).json({ deskBookingsCount: deskBookingsCount, cabBookingsCount: cabBookingsCount, foodBookingsCount: foodBookingsCount });
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
    const isDeskRequired = req.body.isDeskRequired;
    const isCabRequired = req.body.isCabRequired;
    const isFoodRequired = req.body.isFoodRequired;
    if (!isDeskRequired && !isCabRequired && !isFoodRequired) {
        childLogger.error("Desk, cab and food bookings not required", { service: service, userId: req.userId });
        return res.status(400).json({ message: 'Desk, cab and food bookings not required' });
    }
    let deskBookings, cabBookings, foodBookings;
    try {
        if (isDeskRequired) {
            childLogger.info("Getting all desk bookings for user between two dates", { service: service, userId: req.userId, request: { startDate: startDate, endDate: endDate } });
            deskBookings = await DeskBookings.getDeskBookingsForUserBetweenDates(userId, startDate, endDate);
            childLogger.info("Successfully got all desk bookings for user between two dates", { service: service, userId: req.userId, request: { startDate: startDate, endDate: endDate } });
            //add type to each booking
            for (let i = 0; i < deskBookings.length; i++) {
                deskBookings[i].type = 'Desk';
                deskBookings[i].selected = deskBookings[i].deskId;
                delete deskBookings[i].deskId;
            }
        }
        if (isCabRequired) {
            childLogger.info("Getting all cab bookings for user between two dates", { service: service, userId: req.userId, request: { startDate: startDate, endDate: endDate } });
            cabBookings = await CabBookings.getCabBookingsForUserBetweenDates(userId, startDate, endDate);
            childLogger.info("Successfully got all cab bookings for user between two dates", { service: service, userId: req.userId, request: { startDate: startDate, endDate: endDate } });
            //add type to each booking
            for (let i = 0; i < cabBookings.length; i++) {
                cabBookings[i].type = 'Cab';
                cabBookings[i].selected = cabBookings[i].workSlot;
                delete cabBookings[i].workSlot;
            }
        }
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
        if (isDeskRequired) bookings = bookings.concat(deskBookings);
        if (isCabRequired) bookings = bookings.concat(cabBookings);
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
    const isDeskRequired = req.body.isDeskRequired;
    const isCabRequired = req.body.isCabRequired;
    const isFoodRequired = req.body.isFoodRequired;
    let dates;
    let deskId;
    let workSlot;
    let preference;
    if (!req.body.dates || req.body.dates.length === 0) {
        childLogger.error("Dates not provided", { service: service, userId: req.userId });
        return res.status(400).json({ message: 'Dates not provided' });
    } else {
        dates = req.body.dates;
    }
    if (isDeskRequired && (!req.body.deskId || req.body.deskId === '' || req.body.deskId.length === 0)) {
        childLogger.error("Desk id not provided", { service: service, userId: req.userId });
        return res.status(400).json({ message: 'Desk id not provided' });
    } else {
        deskId = req.body.deskId;
        if(!Array.isArray(deskId)) deskId = [deskId];
        if(dates.length !== deskId.length) return res.status(400).json({ message: 'Number of dates and number of desks do not match' });
    }
    if (isCabRequired && (!req.body.workSlot || req.body.workSlot === '' || req.body.workSlot.length === 0)) {
        childLogger.error("Work slot not provided", { service: service, userId: req.userId });
        return res.status(400).json({ message: 'Work slot not provided' });
    } else {
        workSlot = req.body.workSlot;
        if(!Array.isArray(workSlot)) workSlot = [workSlot];
        if(dates.length !== workSlot.length) return res.status(400).json({ message: 'Number of dates and number of work slots do not match' });
    }
    if (isFoodRequired && (!req.body.preference || req.body.preference === '' || req.body.preference.length === 0)) {
        childLogger.error("Preference not provided", { service: service, userId: req.userId });
        return res.status(400).json({ message: 'Preference not provided' });
    } else {
        preference = req.body.preference;
        if(!Array.isArray(preference)) preference = [preference];
        if(dates.length !== preference.length) return res.status(400).json({ message: 'Number of dates and number of preferences do not match' });
    }
    if (!isDeskRequired && !isCabRequired && !isFoodRequired) {
        childLogger.error("Desk, cab and food not required", { service: service, userId: req.userId });
        return res.status(400).json({ message: 'Desk, cab and food not required' });
    }
    if (!Array.isArray(dates)) dates = [dates];
    for (let i = 0; i < dates.length; i++) {
        dates[i] = dateFns.format(new Date(dates[i]), 'yyyy-MM-dd');
    }
    childLogger.info('Formatting dates and checking buffer', { userId: req.userId, service: service, request: { dates: dates, isDeskRequired: isDeskRequired, isCabRequired: isCabRequired, isFoodRequired: isFoodRequired }});
    if (isDeskRequired) {
        //verify if date is in future starting "duration" "units" from now
        const durationUnitsFromNow = dateFns.format(dateFns.addDays(new Date(), Number(process.env.DESK_BUFFER_DURATION)), 'yyyy-MM-dd');
        for (let i = 0; i < dates.length; i++) {
            if (dateFns.isBefore(new Date(dates[i]), new Date(durationUnitsFromNow))) { //if date is before durationUnitsFromNow
                return res.status(400).json({ message: 'Date is not ' + process.env.DESK_BUFFER_DURATION + ' ' + process.env.DESK_BUFFER_UNIT + ' ahead from today for desk booking!' });
            }
        }
    }
    if (isCabRequired) {
        //verify if date is in future starting "duration" "units" from now
        const durationUnitsFromNow = dateFns.format(dateFns.addDays(new Date(), Number(process.env.CAB_BUFFER_DURATION)), 'yyyy-MM-dd');
        for (let i = 0; i < dates.length; i++) {
            if (dateFns.isBefore(new Date(dates[i]), new Date(durationUnitsFromNow))) { //if date is before durationUnitsFromNow
                return res.status(400).json({ message: 'Date is not ' + process.env.CAB_BUFFER_DURATION + ' ' + process.env.CAB_BUFFER_UNIT + ' ahead from today for cab booking!' });
            }
        }
    }
    if (isFoodRequired) {
        //verify if date is in future starting "duration" "units" from now
        const durationUnitsFromNow = dateFns.format(dateFns.addDays(new Date(), Number(process.env.FOOD_BUFFER_DURATION)), 'yyyy-MM-dd');
        for (let i = 0; i < dates.length; i++) {
            if (dateFns.isBefore(new Date(dates[i]), new Date(durationUnitsFromNow))) { //if date is before durationUnitsFromNow
                return res.status(400).json({ message: 'Date is not ' + process.env.FOOD_BUFFER_DURATION + ' ' + process.env.FOOD_BUFFER_UNIT + ' ahead from today for food booking!' });
            }
        }
    }
    if (isDeskRequired) {
        //check if the user has already booked a desk for any of the dates
        let userBookings;
        try {
            childLogger.info("Getting desk bookings for user for dates", { service: service, userId: req.userId, request: { dates: dates } });
            userBookings = await DeskBookings.getDeskBookingsForUserForDates(userId, dates);
            childLogger.info("Successfully got desk bookings for user for dates", { service: service, userId: req.userId, request: { dates: dates } });
        } catch (error) {
            childLogger.error("Failed to get desk bookings for user for dates", { service: service, userId: req.userId, request: { dates: dates }, error: error });
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (userBookings && userBookings.length > 0) {
            childLogger.error("User has already booked a desk for one or more of the dates", { service: service, userId: req.userId });
            return res.status(400).json({ message: 'User has already booked a desk for one or more of the dates' });
        }
        //check if the desks are already booked for corresponding selected dates
        let bookings;
        try {
            childLogger.info("Getting desk bookings by desk id and dates", { service: service, userId: req.userId, request: { deskId: deskId, dates: dates } });
            for (let i = 0; i < deskId.length; i++) {
                bookings = await DeskBookings.getDeskBookingByDeskIdAndDates(deskId[i], dates[i]); //check if desk is already booked for any of the dates
                if (bookings && bookings.length > 0) break;
            }
            childLogger.info("Successfully got desk bookings by desk id and dates", { service: service, userId: req.userId, request: { deskId: deskId, dates: dates } });
        } catch (error) {
            childLogger.error("Failed to get desk bookings by desk id and dates", { service: service, userId: req.userId, request: { deskId: deskId, dates: dates }, error: error });
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (!bookings) bookings = []; //if bookings is undefined, then set bookings to empty array
        if (bookings.length > 0) { //if desk is required but already booked for any of the dates, then return error
            childLogger.error("Desk already booked for one or more of the dates", { service: service, userId: req.userId });
            return res.status(400).json({ message: 'Desk already booked for one or more of the dates' });
        }
    }
    if ((isCabRequired || isFoodRequired) && !isDeskRequired) { //if only cab or food is required, then verify that there is a desk booking for the dates by the user
        let deskBookings;
        try {
            childLogger.info("Getting desk bookings for user for dates", { service: service, userId: req.userId, request: { dates: dates } });
            deskBookings = await DeskBookings.getDeskBookingsForUserForDates(userId, dates);
            childLogger.info("Successfully got desk bookings for user for dates", { service: service, userId: req.userId, request: { dates: dates } });
        } catch (error) {
            childLogger.error("Failed to get desk bookings for user for dates", { service: service, userId: req.userId, request: { dates: dates }, error: error });
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (!deskBookings || deskBookings.length === 0 || deskBookings.length !== dates.length) {
            childLogger.error("No desk booking found for the dates", { service: service, userId: req.userId });
            return res.status(404).json({ message: 'No desk booking found for the dates' });
        }
    }
    if(isCabRequired) { //if cab is required, then verify that there is no cab booking for the dates
        let cabBookings;
        try {
            childLogger.info("Getting cab bookings for user for dates", { service: service, userId: req.userId, request: { dates: dates } });
            cabBookings = await CabBookings.getCabBookingsForUserForDates(userId, dates);
            childLogger.info("Successfully got cab bookings for user for dates", { service: service, userId: req.userId, request: { dates: dates } });
        } catch (error) {
            childLogger.error("Failed to get cab bookings for user for dates", { service: service, userId: req.userId, request: { dates: dates }, error: error });
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (cabBookings && cabBookings.length > 0) {
            childLogger.error("Cab already booked for one or more of the dates", { service: service, userId: req.userId });
            return res.status(400).json({ message: 'Cab already booked for one or more of the dates' });
        }
    }
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
    let deskBooking, cabBooking, foodBooking;
    try {
        if (isDeskRequired) {
            childLogger.info("Booking desk for user", { service: service, userId: req.userId, request: { deskId: deskId, dates: dates } });
            // deskBooking = await DeskBookings.bookDesk(deskId, userId, dates);
            for (let i = 0; i < deskId.length; i++) {
                deskBooking = await DeskBookings.bookDesk(deskId[i], userId, dates[i]);
                if (!deskBooking || deskBooking.length === 0) {
                    childLogger.error("Desk booking failed", { service: service, userId: req.userId });
                    return res.status(400).json({ message: 'Desk booking failed!' });
                }
            }
            childLogger.info("Successfully booked desk for user", { service: service, userId: req.userId, request: { deskId: deskId, dates: dates } });
        }
        if (isCabRequired) {
            childLogger.info("Booking cab for user", { service: service, userId: req.userId, request: { dates: dates, workSlot: workSlot } });
            // cabBooking = await CabBookings.bookCab(userId, dates, workSlot);
            // if (!cabBooking || cabBooking.length === 0) {
            //     childLogger.error("Cab booking failed", { service: service, userId: req.userId });
            //     return res.status(400).json({ message: 'Cab booking failed!' });
            // }
            for (let i = 0; i < dates.length; i++) {
                if(workSlot[i] === 'None' || workSlot[i] === '') continue; //if workSlot is None, then do not book cab for that date
                cabBooking = await CabBookings.bookCab(userId, dates[i], workSlot[i]);
                if (!cabBooking || cabBooking.length === 0) {
                    childLogger.error("Cab booking failed", { service: service, userId: req.userId });
                    return res.status(400).json({ message: 'Cab booking failed!' });
                }
            }
            childLogger.info("Successfully booked cab for user", { service: service, userId: req.userId, request: { dates: dates, workSlot: workSlot } });
        }
        if (isFoodRequired) {
            childLogger.info("Booking food for user", { service: service, userId: req.userId, request: { dates: dates, preference: preference } });
            // foodBooking = await FoodBookings.bookFood(userId, dates, preference);
            // if (!foodBooking || foodBooking.length === 0) {
            //     childLogger.error("Food booking failed", { service: service, userId: req.userId });
            //     return res.status(400).json({ message: 'Food booking failed!' });
            // }
            for (let i = 0; i < dates.length; i++) {
                if(preference[i] === 'None' || preference[i] === '') continue; //if preference is None, then do not book food for that date
                foodBooking = await FoodBookings.bookFood(userId, dates[i], preference[i]);
                if (!foodBooking || foodBooking.length === 0) {
                    childLogger.error("Food booking failed", { service: service, userId: req.userId });
                    return res.status(400).json({ message: 'Food booking failed!' });
                }
            }
            childLogger.info("Successfully booked food for user", { service: service, userId: req.userId, request: { dates: dates, preference: preference } });
        }
    } catch (error) {
        childLogger.error("Failed to book desk, cab or food for user", { service: service, userId: req.userId, error: error });
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    childLogger.info("Booking successfull", { service: service, userId: req.userId, request: { dates: dates} });
    return res.status(201).json({ message: 'Booked successfully', deskBookingId: deskBooking, cabBookingId: cabBooking, foodBookingId: foodBooking });
}

async function modifyAll(req, res, next) { //function to modify a cab or food booking for a user for single date in dates variable
    service = "modifyAll";
    const userId = req.userId;
    const modifyCab = req.body.modifyCab;
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
    if (modifyCab && !req.body.workSlot) {
        childLogger.error("Work slot not provided", { service: service, userId: req.userId });
        return res.status(400).json({ message: 'Work slot not provided' });
    } else {
        workSlot = req.body.workSlot;
    }
    if (modifyFood && !req.body.preference) {
        childLogger.error("Preference not provided", { service: service, userId: req.userId });
        return res.status(400).json({ message: 'Preference not provided' });
    } else {
        preference = req.body.preference;
    }
    if (!modifyCab && !modifyFood) {
        childLogger.error("Cab and food not to be modified", { service: service, userId: req.userId });
        return res.status(400).json({ message: 'Nothing to be modified' });
    }
    if (!Array.isArray(dates)) dates = [dates];
    dates[0] = dateFns.format(new Date(dates[0]), 'yyyy-MM-dd');
    childLogger.info('Formatting dates and checking buffer', { userId: req.userId, service: service, request: { dates: dates, modifyCab: modifyCab, modifyFood: modifyFood }});
    //verify if date is in future starting next day
    const durationUnitsFromNow = dateFns.format(dateFns.addDays(new Date(), 1), 'yyyy-MM-dd');
    if (dateFns.isBefore(new Date(dates[0]), new Date(durationUnitsFromNow))) { //if date is before durationUnitsFromNow
        return res.status(400).json({ message: 'Date should be a day ahead from today for modification!' });
    }
    if (modifyCab) {
        //verify that there is a cab booking for the date
        let cabBookings;
        try {
            childLogger.info("Getting cab bookings for user for dates", { service: service, userId: req.userId, request: { dates: dates } });
            cabBookings = await CabBookings.getCabBookingsForUserForDates(userId, dates);
            childLogger.info("Successfully got cab bookings for user for dates", { service: service, userId: req.userId, request: { dates: dates } });
        } catch (error) {
            childLogger.error("Failed to get cab bookings for user for dates", { service: service, userId: req.userId, request: { dates: dates }, error: error });
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (!cabBookings || cabBookings.length === 0) {
            childLogger.error("No cab booking found for the date", { service: service, userId: req.userId });
            return res.status(404).json({ message: 'No cab booking found for the date' });
        }
        try {
            childLogger.info("Modifying cab booking for user", { service: service, userId: req.userId, request: { dates: dates, workSlot: workSlot } });
            await CabBookings.modifyCabBooking(userId, dates[0], workSlot); //modify cab booking by updating row in cab bookings table
            childLogger.info("Successfully modified cab booking for user", { service: service, userId: req.userId, request: { dates: dates, workSlot: workSlot } });
        }
        catch (error) {
            childLogger.error("Failed to modify cab booking for user", { service: service, userId: req.userId, request: { dates: dates, workSlot: workSlot }, error: error });
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
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
    return res.status(200).json({ message: 'Booking modified successfully!' });
}

async function cancelAll(req, res, next) { //function to cancel a desk, cab and food booking for a user for single date in dates variable
    service = "cancelAll";
    const userId = req.userId;
    let cancelDesk = req.body.cancelDesk;
    let cancelCab = req.body.cancelCab;
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
    if (!cancelDesk && !cancelCab && !cancelFood) {
        childLogger.error("Desk, cab and food not to be cancelled", { service: service, userId: req.userId });
        return res.status(400).json({ message: 'Desk, cab and food not to be cancelled' });
    }
    childLogger.info('Formatting dates and checking buffer', { userId: req.userId, service: service, request: { dates: dates, cancelDesk: cancelDesk, cancelCab: cancelCab, cancelFood: cancelFood }});
    //verify if date is in future starting next day
    const durationUnitsFromNow = dateFns.format(dateFns.addDays(new Date(), 1), 'yyyy-MM-dd');
    if (dateFns.isBefore(new Date(dates[0]), new Date(durationUnitsFromNow))) { //if date is before durationUnitsFromNow
        return res.status(400).json({ message: 'Date should be a day ahead from today for cancellation!' });
    }
    let deskBookings, cabBookings, foodBookings;
    if (cancelDesk || cancelCab || cancelFood) {
        //verify that there is a desk booking for the date
        try {
            childLogger.info("Getting desk bookings for user for dates", { service: service, userId: req.userId, request: { dates: dates } });
            deskBookings = await DeskBookings.getDeskBookingsForUserForDates(userId, dates);
            childLogger.info("Successfully got desk bookings for user for dates", { service: service, userId: req.userId, request: { dates: dates } });
        } catch (error) {
            childLogger.error("Failed to get desk bookings for user for dates", { service: service, userId: req.userId, request: { dates: dates }, error: error });
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (!deskBookings || deskBookings.length === 0) {
            childLogger.error("No desk booking found for the date", { service: service, userId: req.userId });
            return res.status(404).json({ message: 'No desk booking found for the date' });
        }
    }
    if (cancelDesk) {
        //check if there is a cab booking for the date 
        try {
            childLogger.info("Getting cab bookings for user for dates", { service: service, userId: req.userId, request: { dates: dates } });
            cabBookings = await CabBookings.getCabBookingsForUserForDates(userId, dates);
            childLogger.info("Successfully got cab bookings for user for dates", { service: service, userId: req.userId, request: { dates: dates } });
        } catch (error) {
            childLogger.error("Failed to get cab bookings for user for dates", { service: service, userId: req.userId, request: { dates: dates }, error: error });
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        //check if there is a food booking for the date
        try {
            childLogger.info("Getting food bookings for user for dates", { service: service, userId: req.userId, request: { dates: dates } });
            foodBookings = await FoodBookings.getFoodBookingsForUserForDates(userId, dates);
            childLogger.info("Successfully got food bookings for user for dates", { service: service, userId: req.userId, request: { dates: dates } });
        } catch (error) {
            childLogger.error("Failed to get food bookings for user for dates", { service: service, userId: req.userId, request: { dates: dates }, error: error });
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (!foodBookings || foodBookings.length === 0) {
            cancelFood = false;
        } 
        else {
            cancelFood = true;
        }
        if (!cabBookings || cabBookings.length === 0) {
            cancelCab = false;
        }
        else {
            cancelCab = true;
        }
        try {
            childLogger.info("Canceling desk booking for user", { service: service, userId: req.userId, request: { dates: dates } });
            await DeskBookings.cancelDeskBooking(userId, dates[0]); //cancel desk booking by deleting row from desk bookings table
            childLogger.info("Successfully canceled desk booking for user", { service: service, userId: req.userId, request: { dates: dates } });
        } catch (error) {
            childLogger.error("Failed to cancel desk booking for user", { service: service, userId: req.userId, request: { dates: dates }, error: error });
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    if (cancelCab) {
        //verify that there is a cab booking for the date
        try {
            childLogger.info("Getting cab bookings for user for dates", { service: service, userId: req.userId, request: { dates: dates } });
            cabBookings = await CabBookings.getCabBookingsForUserForDates(userId, dates);
            childLogger.info("Successfully got cab bookings for user for dates", { service: service, userId: req.userId, request: { dates: dates } });
        } catch (error) {
            childLogger.error("Failed to get cab bookings for user for dates", { service: service, userId: req.userId, request: { dates: dates }, error: error });
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (!cabBookings || cabBookings.length === 0) {
            childLogger.error("No cab booking found for the date", { service: service, userId: req.userId });
            return res.status(404).json({ message: 'No cab booking found for the date' });
        }
        try {
            childLogger.info("Canceling cab booking for user", { service: service, userId: req.userId, request: { dates: dates } });
            await CabBookings.cancelCabBooking(userId, dates[0]); //cancel cab booking by deleting row from cab bookings table
            childLogger.info("Successfully canceled cab booking for user", { service: service, userId: req.userId, request: { dates: dates } });
        } catch (error) {
            childLogger.error("Failed to cancel cab booking for user", { service: service, userId: req.userId, request: { dates: dates }, error: error });
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
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
            await FoodBookings.cancelFoodBooking(userId, dates[0]); //cancel food booking by deleting row from cab bookings table
            childLogger.info("Successfully canceled food booking for user", { service: service, userId: req.userId, request: { dates: dates } });
        } catch (error) {
            childLogger.error("Failed to cancel food booking for user", { service: service, userId: req.userId, request: { dates: dates }, error: error });
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    childLogger.info("Cancellation successfull", { service: service, userId: req.userId, request: { dates: dates} });
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