// const DeskBookings = require('../models/desk-booking');
// const CabBookings = require('../models/cab-booking');
const FoodBookings = require('../models/food-booking');
const User = require('../models/user');
const Holiday = require('../models/holiday');
const dateFns = require('date-fns');
require("dotenv").config("../.env");

const logger = require('../logger/index');
const childLogger = logger.child({ module: 'user-all-booking-controller' });

const transporter = require('../mail');

let service = "";

async function ifDateIsOneDayAheadAndTodayIsHoliday(selectedDateStr) {

    service = "ifDateIsOneDayAheadAndTodayIsHoliday";

    let holidayList;
    try {
        holidayList = await Holiday.getHolidaysOfCurrentAndUpcomingYears(); //get holidays of current and upcoming years
        // if (holidayList && !isArray(holidayList)) holidayList = [holidayList]; //if holidayList is not an array, then set holidayList to an array containing holidayList
        childLogger.info("Successfully got holidays of current and upcoming years", { service: service });

        if (!holidayList || holidayList.length === 0) {
            //set holidayList to empty array if no holidays found
            // holidayList = [];
            childLogger.info("No holidays found", { service: service });
        } else {
            childLogger.info("Successfully found holiday list", { service: service });
        }
    } catch (error) {
        childLogger.error("Failed to get holidays of current and upcoming years", { service: service, error: error });
        // return res.status(500).json({ message: 'Internal Server Error' });
        return true; //return true if failed to get holidays
    }
    const selectedDate = new Date(selectedDateStr);
    const currentDate = new Date();
    //set hours, minutes, seconds and milliseconds to 0 to compare only date part
    const currentDateStart = new Date(currentDate.setHours(0, 0, 0, 0));
    const selectedDateStart = new Date(selectedDate.setHours(0, 0, 0, 0));

    //find difference in days
    const differenceInTime = selectedDateStart - currentDateStart;
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    // const isTodayHoliday = holidayList.some(holiday => dateFns.isSameDay(new Date(holiday.date), currentDate)); //check if today is holiday

    let isTodayHoliday = false;
    childLogger.info("holidayList Length: " + holidayList.length, { service: service });
    //check if date is present in holidayList
    if (holidayList.length > 0) {
        isTodayHoliday = holidayList.some(holiday => dateFns.isSameDay(new Date(holiday.holiday_date), currentDateStart));
        childLogger.info("Current date: " + currentDateStart, { service: service });
        childLogger.info("Holiday date: " + new Date(holidayList[0].holiday_date), { service: service });
    }

    childLogger.info("Is today holiday: " + isTodayHoliday, { service: service });
    childLogger.info("Difference in days: " + differenceInDays, { service: service });

    if (differenceInDays === 1 && isTodayHoliday) { //if selected date is one day ahead
        childLogger.info("Cannot book for next day since today is a holiday", { service: service });
        return true;
    }

    childLogger.info("Selected date is not one day ahead or today is not holiday..", { service: service });
    return false;
}


function ifDateIsOneDayAheadAndTimeIsBefore10AM(selectedDateStr) {

    service = "ifDateIsOneDayAheadAndTimeIsBefore10AM";

    const selectedDate = new Date(selectedDateStr);
    const currentDate = new Date();
    //set hours, minutes, seconds and milliseconds to 0 to compare only date part
    const currentDateStart = new Date(currentDate.setHours(0, 0, 0, 0));
    const selectedDateStart = new Date(selectedDate.setHours(0, 0, 0, 0));
    // logger.info("Selected date: " + selectedDate);
    // logger.info("Current date: " + currentDate);

    // childLogger.info("Selected date: " + selectedDate);
    // childLogger.info("Current date: " + currentDate);

    // childLogger.info("Selected date: " + selectedDate, { service: service });
    // childLogger.info("Current date: " + currentDate, { service: service });

    //find difference in days
    const differenceInTime = selectedDateStart - currentDateStart;
    // logger.info("Difference in time: " + differenceInTime);
    // childLogger.info("Difference in time: " + differenceInTime);
    // childLogger.info("Difference in time: " + differenceInTime, { service: service });
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    // logger.info("Difference in days: " + differenceInDays);
    // childLogger.info("Difference in days: " + differenceInDays);
    // childLogger.info("Difference in days: " + differenceInDays, { service: service });

    if (differenceInDays === 1 && (new Date()).getHours() < 10) { //if selected date is one day ahead and current time is before 10AM
        // childLogger.info("Selected date is one day ahead and current time is before 10AM", { service: service });
        childLogger.info("Selected date is one day ahead and current time is before 10AM", { service: service });
        return true;
    } else if (differenceInDays > 1) { //if selected date is more than one day ahead
        // childLogger.info("Selected date is more than one day ahead", { service: service });
        childLogger.info("Selected date is more than one day ahead", { service: service });
        return true;
    } else { //if selected date is today or in the past
        // childLogger.error("Selected date is today, or next day and current time is past 10 AM", { service: service });
        childLogger.error("Selected date is today, or next day and current time is past 10 AM", { service: service });
        return false;
    }
}

function isSelectedDateUpcomingMondayAndTodayNotWeekend(selectedDateStr) {

    service = "isSelectedDateUpcomingMondayAndTodayNotWeekend";

    const selectedDate = new Date(selectedDateStr);
    const currentDate = new Date();

    const selectedDay = selectedDate.getDay();
    const currentDay = currentDate.getDay();

    if (selectedDay === 1 && currentDay !== 0 && currentDay !== 6) { //if selected date is upcoming Monday and today is not weekend
        childLogger.info("Selected date is upcoming Monday and today is not weekend", { service: service });
        return true;
    }

    const isSelectedDateMonday = selectedDay === 1;

    let daysUntilNextMonday = (8 - currentDay) % 7;
    // childLogger.info("Days until next Monday: " + daysUntilNextMonday, { service: service });
    daysUntilNextMonday = daysUntilNextMonday === 0 ? 7 : daysUntilNextMonday; //if today is Monday, daysUntilNextMonday will be 0, so set it to 7 i.e. next Monday

    const nextMonday = dateFns.addDays(currentDate, daysUntilNextMonday);
    // nextMonday.setDate(nextMonday.getDate() + daysUntilNextMonday); //get next Monday

    // childLogger.info("Next Monday: " + nextMonday, { service: service });

    const isSelectedDateUpcomingMonday = selectedDate.toDateString() === nextMonday.toDateString();
    // childLogger.info("Selected date: " + selectedDate.toDateString(), { service: service });
    // childLogger.info("Next monday: " + nextMonday.toDateString(), { service: service });
    // childLogger.info("Selected date is upcoming Monday: " + isSelectedDateUpcomingMonday, { service: service });

    const isTodayNotWeekend = currentDay !== 0 && currentDay !== 6;

    if (isSelectedDateMonday && isSelectedDateUpcomingMonday && isTodayNotWeekend) {
        childLogger.info("Selected date is upcoming Monday and today is not weekend", { service: service });
        return true;
    } else if (!isSelectedDateUpcomingMonday) {
        childLogger.info("Selected date is not upcoming Monday", { service: service });
        return true;
    } else {
        childLogger.error("Selected date is upcoming Monday and today is weekend", { service: service });
        return false;
    }
}

async function getAllFutureBookingsForUser(req, res, next) { //function to get all bookings for a user
    service = "getAllFutureBookingsForUser";
    const userId = req.userId;
    //is req.body contains startDate and endDate, forward the request to getAllBookingsForUserBetweenDates controller
    if (req.body.startDate && req.body.endDate) {
        childLogger.info("Forwarding request to getAllBookingsForUserBetweenDates controller", { service: service, userId: req.userId, request: { startDate: req.body.startDate, endDate: req.body.endDate } });
        return getAllBookingsForUserBetweenDates(req, res, next);
    }
    const isFoodRequired = req.body.isFoodRequired;
    let bookings, foodBookings;
    if (!isFoodRequired) {
        childLogger.error("Food bookings not required", { service: service, userId: req.userId });
        return res.status(400).json({ message: 'Food bookings not required' });
    }
    try {
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
    const isFoodRequired = req.body.isFoodRequired;
    let foodBookingsCount = 0;
    if (!isFoodRequired) {
        childLogger.error("Food bookings not required", { service: service, userId: req.userId });
        return res.status(400).json({ message: 'Food bookings not required' });
    }
    try {
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
    childLogger.info('Formatting start date and end date', { userId: req.userId, service: service, request: { startDate: startDate, endDate: endDate } });
    startDate = dateFns.format(new Date(startDate), 'yyyy-MM-dd');
    endDate = dateFns.format(new Date(endDate), 'yyyy-MM-dd');
    const isFoodRequired = req.body.isFoodRequired;
    if (!isFoodRequired) {
        childLogger.error("Food bookings not required", { service: service, userId: req.userId });
        return res.status(400).json({ message: 'Food bookings not required' });
    }
    let foodBookingsCount = 0;
    try {
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
    childLogger.info('Formatting start date and end date', { userId: req.userId, service: service, request: { startDate: startDate, endDate: endDate } });
    startDate = dateFns.format(new Date(startDate), 'yyyy-MM-dd');
    endDate = dateFns.format(new Date(endDate), 'yyyy-MM-dd');
    const isFoodRequired = req.body.isFoodRequired;
    if (!isFoodRequired) {
        childLogger.error("Food bookings not required", { service: service, userId: req.userId });
        return res.status(400).json({ message: 'Food bookings not required' });
    }
    let foodBookings;
    try {
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
    const isFoodRequired = req.body.isFoodRequired;
    let dates;
    let preference;
    if (!req.body.dates || req.body.dates.length === 0) {
        childLogger.error("Dates not provided", { service: service, userId: req.userId });
        return res.status(400).json({ message: 'Dates not provided' });
    } else {
        dates = req.body.dates;
    }
    if (isFoodRequired && (!req.body.preference || req.body.preference === '' || req.body.preference.length === 0)) {
        childLogger.error("Preference not provided", { service: service, userId: req.userId });
        return res.status(400).json({ message: 'Preference not provided' });
    } else {
        preference = req.body.preference;
        if (!Array.isArray(preference)) preference = [preference];
        if (dates.length !== preference.length) return res.status(400).json({ message: 'Number of dates and number of preferences do not match' });
    }
    if (!isFoodRequired) {
        childLogger.error("Food not required", { service: service, userId: req.userId });
        return res.status(400).json({ message: 'Food not required' });
    }
    if (!Array.isArray(dates)) dates = [dates];
    for (let i = 0; i < dates.length; i++) {
        const selectedDate = new Date(dates[i]);
        const selectedDay = selectedDate.getDay();
        const isSelectedDateMonday = selectedDay === 1;

        //verify if date is upcoming Monday and today is not weekend
        if (isSelectedDateMonday && !isSelectedDateUpcomingMondayAndTodayNotWeekend(dates[i])) {
            return res.status(400).json({ message: 'You can not book food for upcoming Monday on weekend' });
        }

        //verify if date is one day ahead and time is before 10AM
        if (!ifDateIsOneDayAheadAndTimeIsBefore10AM(dates[i])) {
            return res.status(400).json({ message: 'For next day, booking time must be before 10AM' });
        }

        //verify if date is one day ahead and today is not holiday
        if (await ifDateIsOneDayAheadAndTodayIsHoliday(dates[i])) {
            return res.status(400).json({ message: 'You can not book for next day since today is a holiday' });
        }

        dates[i] = dateFns.format(new Date(dates[i]), 'yyyy-MM-dd');
    }
    childLogger.info('Formatting dates and checking buffer', { userId: req.userId, service: service, request: { dates: dates, isFoodRequired: isFoodRequired } });
    if (isFoodRequired) { //if food is required, then verify that there is no food booking for the dates
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
        if (isFoodRequired) {
            childLogger.info("Booking food for user", { service: service, userId: req.userId, request: { dates: dates, preference: preference } });
            for (let i = 0; i < dates.length; i++) {
                if (!preference[i] || preference[i] === 'None' || preference[i] === 'none' || preference[i] === '') continue; //if preference is None, then do not book food for that date
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
    childLogger.info("Booking successfull", { service: service, userId: req.userId, request: { dates: dates } });

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
        childLogger.info("Sending email to user", { service: service, userId: req.userId });
        await transporter.sendMail({
            from: '"ABC Group EMS" <mybookings@abcgroup.com>', // sender address
            to: user.email,
            subject: 'Booking Successful!',
            //if isDeskRequired is true, then add deskId to email, if isCabRequired is true, then add workSlot to email, if isFoodRequired is true, then add preference to email with corresponding dates
            html: `<p>Hey ${user.first_name},</p><p>Your booking for the following dates has been confirmed:</p><p>${dates.map((date, index) => {
                let food = '';
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
    // for (let i = 0; i < dates.length; i++) {
    const selectedDate = new Date(dates[0]);
    const selectedDay = selectedDate.getDay();
    const isSelectedDateMonday = selectedDay === 1;

    //verify if date is upcoming Monday and today is not weekend
    if (isSelectedDateMonday && !isSelectedDateUpcomingMondayAndTodayNotWeekend(dates[0])) {
        return res.status(400).json({ message: 'You can not modify booking for upcoming Monday on weekend' });
    }

    //verify if date is one day ahead and time is before 10AM
    if (!ifDateIsOneDayAheadAndTimeIsBefore10AM(dates[0])) {
        return res.status(400).json({ message: 'You can only modify booking before 10 AM for a date which is one day ahead' });
    }

    //verify if date is one day ahead and today is not holiday
    if (await ifDateIsOneDayAheadAndTodayIsHoliday(dates[0])) {
        return res.status(400).json({ message: 'You can not modify booking for next day since today is a holiday' });
    }

    dates[0] = dateFns.format(new Date(dates[0]), 'yyyy-MM-dd');
    // }
    // dates[0] = dateFns.format(new Date(dates[0]), 'yyyy-MM-dd');
    // childLogger.info('Formatting dates and checking buffer', { userId: req.userId, service: service, request: { dates: dates, modifyFood: modifyFood }});
    //verify if date is in future starting next day
    // const durationUnitsFromNow = dateFns.format(dateFns.addDays(new Date(), 1), 'yyyy-MM-dd');
    // if (dateFns.isBefore(new Date(dates[0]), new Date(durationUnitsFromNow))) { //if date is before durationUnitsFromNow
    //     return res.status(400).json({ message: 'Date should be a day ahead from today for modification!' });
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
    childLogger.info("Modification successfull", { service: service, userId: req.userId, request: { dates: dates } });

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
        childLogger.info("Sending email to user", { service: service, userId: req.userId });
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
    let cancelFood = req.body.cancelFood;
    let dates;
    if (!req.body.dates || req.body.dates.length === 0) {
        childLogger.error("Date not provided", { service: service, userId: req.userId });
        return res.status(400).json({ message: 'Date not provided' });
    } else {
        dates = req.body.dates;
    }
    if (!Array.isArray(dates)) dates = [dates];
    // for (let i = 0; i < dates.length; i++) {
    const selectedDate = new Date(dates[0]);
    const selectedDay = selectedDate.getDay();
    const isSelectedDateMonday = selectedDay === 1;

    //verify if date is upcoming Monday and today is not weekend
    if (isSelectedDateMonday && !isSelectedDateUpcomingMondayAndTodayNotWeekend(dates[0])) {
        return res.status(400).json({ message: 'You can not cancel booking for upcoming Monday on weekend' });
    }

    //verify if date is one day ahead and time is before 10AM
    if (!ifDateIsOneDayAheadAndTimeIsBefore10AM(dates[0])) {
        return res.status(400).json({ message: 'You can only cancel booking before 10 AM for a date which is one day ahead' });
    }

    //verify if date is one day ahead and today is not holiday
    if (await ifDateIsOneDayAheadAndTodayIsHoliday(dates[0])) {
        // console.log("You can not cancel booking for next day since today is a holiday");
        // childLogger.error("You can not cancel booking for next day since today is a holiday", { service: service, userId: req.userId });
        return res.status(400).json({ message: 'You can not cancel booking for next day since today is a holiday' });
    }

    // childLogger.info('Formatting dates and checking buffer', { userId: req.userId, service: service, request: { dates: dates, cancelFood: cancelFood } });
    dates[0] = dateFns.format(new Date(dates[0]), 'yyyy-MM-dd');
    if (!cancelFood) {
        childLogger.error("Food not to be cancelled", { service: service, userId: req.userId });
        return res.status(400).json({ message: 'Food not to be cancelled' });
    }
    // childLogger.info('Formatting dates and checking buffer', { userId: req.userId, service: service, request: { dates: dates, cancelFood: cancelFood } });
    // //verify if date is in future starting next day
    // const durationUnitsFromNow = dateFns.format(dateFns.addDays(new Date(), 1), 'yyyy-MM-dd');
    // if (dateFns.isBefore(new Date(dates[0]), new Date(durationUnitsFromNow))) { //if date is before durationUnitsFromNow
    //     return res.status(400).json({ message: 'Date should be a day ahead from today for cancellation!' });
    // }
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
    childLogger.info("Cancellation successfull", { service: service, userId: req.userId, request: { dates: dates } });

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
        childLogger.info("Sending email to user", { service: service, userId: req.userId });
        await transporter.sendMail({
            from: '"ABC Group EMS" <mybookings@abcgroup.com>', // sender address
            to: user.email,
            subject: 'Cancellation Successful!',
            //if cancelDesk is true, then add deskId to email, if cancelCab is true, then add workSlot to email, if cancelFood is true, then add preference to email with corresponding dates
            html: `<p>Hey ${user.first_name},</p><p>Your booking for the following dates has been cancelled:</p><p>${dates.map((date, index) => {
                // let desk = '';
                // let cab = '';
                let food = '';
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