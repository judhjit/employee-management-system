const DeskBookings = require('../models/desk-booking');
const CabBookings = require('../models/cab-booking');
const FoodBookings = require('../models/food-booking');
const dateFns = require('date-fns');
require("dotenv").config("../.env");

async function getAllFutureBookingsForUser(req, res, next) { //function to get all bookings for a user
    const userId = req.userId;
    //is req.body contains startDate and endDate, forward the request to getAllBookingsForUserBetweenDates controller
    if (req.body.startDate && req.body.endDate) {
        return getAllBookingsForUserBetweenDates(req, res, next);
    }
    const isDeskRequired = req.body.isDeskRequired;
    const isCabRequired = req.body.isCabRequired;
    const isFoodRequired = req.body.isFoodRequired;
    let bookings, deskBookings, cabBookings, foodBookings;
    if (!isDeskRequired && !isCabRequired && !isFoodRequired) {
        return res.status(400).json({ message: 'Desk, cab and food bookings not required' });
    }
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
        bookings = [];
        if (isDeskRequired) bookings = bookings.concat(deskBookings);
        if (isCabRequired) bookings = bookings.concat(cabBookings);
        if (isFoodRequired) bookings = bookings.concat(foodBookings);
        bookings.sort((a, b) => {
            return new Date(a.dateBooked) - new Date(b.dateBooked); //sort by dateBooked in ascending order
        });
        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ message: 'No bookings found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    return res.status(200).json(bookings);
}

async function getCountOfAllFutureBookingsForUser(req, res, next) { //function to get count of all bookings for a user
    const userId = req.userId;
    //is req.body contains startDate and endDate, forward the request to getAllBookingsForUserBetweenDates controller
    if (req.body.startDate && req.body.endDate) {
        return getCountOfAllBookingsForUserBetweenDates(req, res, next);
    }
    const isDeskRequired = req.body.isDeskRequired;
    const isCabRequired = req.body.isCabRequired;
    const isFoodRequired = req.body.isFoodRequired;
    let deskBookingsCount = 0, cabBookingsCount = 0, foodBookingsCount = 0;
    if (!isDeskRequired && !isCabRequired && !isFoodRequired) {
        return res.status(400).json({ message: 'Desk, cab and food bookings not required' });
    }
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

async function getCountOfAllBookingsForUserBetweenDates(req, res, next) { //function to get count of all bookings for a user between two dates
    const userId = req.userId;
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

async function getAllBookingsForUserBetweenDates(req, res, next) { //function to get all bookings for a user between two dates
    const userId = req.userId;
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
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function bookAll(req, res, next) { //function to book a desk, cab and food for a user for multiple dates (array of dates)
    const userId = req.userId;
    const isDeskRequired = req.body.isDeskRequired;
    const isCabRequired = req.body.isCabRequired;
    const isFoodRequired = req.body.isFoodRequired;
    let dates;
    let deskId;
    let workSlot;
    let preference;
    if (!req.body.dates || req.body.dates.length === 0) {
        return res.status(400).json({ message: 'Dates not provided' });
    } else {
        dates = req.body.dates;
    }
    if (isDeskRequired && !req.body.deskId) {
        return res.status(400).json({ message: 'Desk id not provided' });
    } else {
        deskId = req.body.deskId;
    }
    if (isCabRequired && !req.body.workSlot) {
        return res.status(400).json({ message: 'Work slot not provided' });
    } else {
        workSlot = req.body.workSlot;
    }
    if (isFoodRequired && !req.body.preference) {
        return res.status(400).json({ message: 'Preference not provided' });
    } else {
        preference = req.body.preference;
    }
    if (!isDeskRequired && !isCabRequired && !isFoodRequired) {
        return res.status(400).json({ message: 'Desk, cab and food not required' });
    }
    if (!Array.isArray(dates)) dates = [dates];
    for (let i = 0; i < dates.length; i++) {
        dates[i] = dateFns.format(new Date(dates[i]), 'yyyy-MM-dd');
    }
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
            userBookings = await DeskBookings.getDeskBookingsForUserForDates(userId, dates);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (userBookings && userBookings.length > 0) {
            return res.status(400).json({ message: 'User has already booked a desk for one or more of the dates' });
        }
        //check if desk is already booked for any of the dates
        let bookings;
        try {
            bookings = await DeskBookings.getDeskBookingByDeskIdAndDates(deskId, dates); //check if desk is already booked for any of the dates
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (!bookings) bookings = []; //if bookings is undefined, then set bookings to empty array
        if (bookings.length > 0) { //if desk is required but already booked for any of the dates, then return error
            return res.status(400).json({ message: 'Desk already booked for one or more of the dates' });
        }
    }
    if ((isCabRequired || isFoodRequired) && !isDeskRequired) { //if only cab or food is required, then verify that there is a desk booking for the dates by the user
        let deskBookings;
        try {
            deskBookings = await DeskBookings.getDeskBookingsForUserForDates(userId, dates);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (!deskBookings || deskBookings.length === 0 || deskBookings.length !== dates.length) {
            return res.status(404).json({ message: 'No desk booking found for the dates' });
        }
    }
    if(isCabRequired) { //if cab is required, then verify that there is no cab booking for the dates
        let cabBookings;
        try {
            cabBookings = await CabBookings.getCabBookingsForUserForDates(userId, dates);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (cabBookings && cabBookings.length > 0) {
            return res.status(400).json({ message: 'Cab already booked for one or more of the dates' });
        }
    }
    if(isFoodRequired) { //if food is required, then verify that there is no food booking for the dates
        let foodBookings;
        try {
            foodBookings = await FoodBookings.getFoodBookingsForUserForDates(userId, dates);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (foodBookings && foodBookings.length > 0) {
            return res.status(400).json({ message: 'Food already booked for one or more of the dates' });
        }
    }
    let deskBooking, cabBooking, foodBooking;
    try {
        if (isDeskRequired) {
            deskBooking = await DeskBookings.bookDesk(deskId, userId, dates);
            if (!deskBooking || deskBooking.length === 0) {
                return res.status(400).json({ message: 'Desk booking failed!' });
            }
        }
        if (isCabRequired) {
            cabBooking = await CabBookings.bookCab(userId, dates, workSlot);
            if (!cabBooking || cabBooking.length === 0) {
                return res.status(400).json({ message: 'Cab booking failed!' });
            }
        }
        if (isFoodRequired) {
            foodBooking = await FoodBookings.bookFood(userId, dates, preference);
            if (!foodBooking || foodBooking.length === 0) {
                return res.status(400).json({ message: 'Food booking failed!' });
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    return res.status(201).json({ message: 'Booked successfully', deskBookingId: deskBooking, cabBookingId: cabBooking, foodBookingId: foodBooking });
}

async function modifyAll(req, res, next) { //function to modify a cab or food booking for a user for single date in dates variable
    const userId = req.userId;
    const modifyCab = req.body.modifyCab;
    const modifyFood = req.body.modifyFood;
    let dates;
    let workSlot;
    let preference;
    if (!req.body.dates || req.body.dates.length === 0) {
        return res.status(400).json({ message: 'Date not provided' });
    } else {
        dates = req.body.dates;
    }
    if (modifyCab && !req.body.workSlot) {
        return res.status(400).json({ message: 'Work slot not provided' });
    } else {
        workSlot = req.body.workSlot;
    }
    if (modifyFood && !req.body.preference) {
        return res.status(400).json({ message: 'Preference not provided' });
    } else {
        preference = req.body.preference;
    }
    if (!modifyCab && !modifyFood) {
        return res.status(400).json({ message: 'Nothing to be modified' });
    }
    if (!Array.isArray(dates)) dates = [dates];
    dates[0] = dateFns.format(new Date(dates[0]), 'yyyy-MM-dd');
    //verify if date is in future starting next day
    const durationUnitsFromNow = dateFns.format(dateFns.addDays(new Date(), 1), 'yyyy-MM-dd');
    if (dateFns.isBefore(new Date(dates[0]), new Date(durationUnitsFromNow))) { //if date is before durationUnitsFromNow
        return res.status(400).json({ message: 'Date should be a day ahead from today for modification!' });
    }
    if (modifyCab) {
        //verify that there is a cab booking for the date
        let cabBookings;
        try {
            cabBookings = await CabBookings.getCabBookingsForUserForDates(userId, dates);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (!cabBookings || cabBookings.length === 0) {
            return res.status(404).json({ message: 'No cab booking found for the date' });
        }
        try {
            await CabBookings.modifyCabBooking(userId, dates[0], workSlot); //modify cab booking by updating row in cab bookings table
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    if (modifyFood) {
        //verify that there is a food booking for the date
        let foodBookings;
        try {
            foodBookings = await FoodBookings.getFoodBookingsForUserForDates(userId, dates);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (!foodBookings || foodBookings.length === 0) {
            return res.status(404).json({ message: 'No food booking found for the date' });
        }
        try {
            await FoodBookings.modifyFoodBooking(userId, dates[0], preference); //modify food booking by updating row in food bookings table
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    return res.status(200).json({ message: 'Booking modified successfully!' });
}

async function cancelAll(req, res, next) { //function to cancel a desk, cab and food booking for a user for single date in dates variable
    const userId = req.userId;
    let cancelDesk = req.body.cancelDesk;
    let cancelCab = req.body.cancelCab;
    let cancelFood = req.body.cancelFood;
    let dates;
    if (!req.body.dates || req.body.dates.length === 0) {
        return res.status(400).json({ message: 'Date not provided' });
    } else {
        dates = req.body.dates;
    }
    if (!Array.isArray(dates)) dates = [dates];
    dates[0] = dateFns.format(new Date(dates[0]), 'yyyy-MM-dd');
    if (!cancelDesk && !cancelCab && !cancelFood) {
        return res.status(400).json({ message: 'Desk, cab and food not to be cancelled' });
    }
    //verify if date is in future starting next day
    const durationUnitsFromNow = dateFns.format(dateFns.addDays(new Date(), 1), 'yyyy-MM-dd');
    if (dateFns.isBefore(new Date(dates[0]), new Date(durationUnitsFromNow))) { //if date is before durationUnitsFromNow
        return res.status(400).json({ message: 'Date should be a day ahead from today for cancellation!' });
    }
    let deskBookings, cabBookings, foodBookings;
    if (cancelDesk || cancelCab || cancelFood) {
        //verify that there is a desk booking for the date
        try {
            deskBookings = await DeskBookings.getDeskBookingsForUserForDates(userId, dates);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (!deskBookings || deskBookings.length === 0) {
            return res.status(404).json({ message: 'No desk booking found for the date' });
        }
    }
    if (cancelDesk) {
        //check if there is a cab booking for the date 
        try {
            cabBookings = await CabBookings.getCabBookingsForUserForDates(userId, dates);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        //check if there is a food booking for the date
        try {
            foodBookings = await FoodBookings.getFoodBookingsForUserForDates(userId, dates);
        } catch (error) {
            console.error(error);
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
            await DeskBookings.cancelDeskBooking(userId, dates[0]); //cancel desk booking by deleting row from desk bookings table
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    if (cancelCab) {
        //verify that there is a cab booking for the date
        try {
            cabBookings = await CabBookings.getCabBookingsForUserForDates(userId, dates);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (!cabBookings || cabBookings.length === 0) {
            return res.status(404).json({ message: 'No cab booking found for the date' });
        }
        try {
            await CabBookings.cancelCabBooking(userId, dates[0]); //cancel cab booking by deleting row from cab bookings table
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    if (cancelFood) {
        //verify that there is a food booking for the date
        try {
            foodBookings = await FoodBookings.getFoodBookingsForUserForDates(userId, dates);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (!foodBookings || foodBookings.length === 0) {
            return res.status(404).json({ message: 'No food booking found for the date' });
        }
        try {
            await FoodBookings.cancelFoodBooking(userId, dates[0]); //cancel food booking by deleting row from cab bookings table
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
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