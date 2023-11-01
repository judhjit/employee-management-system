const deskBookingsModel = require('../models/desk-booking');
const moment = require('moment');


async function getAllDeskBookings(req, res, next) { //function to get all desk bookings
    let desks;
    try {
        desks = await deskBookingsModel.getDeskBookings();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!desks || desks.length === 0) {
        return res.status(404).json({ message: 'No desks found' });
    }
    return res.status(200).json(desks);
}

async function getFutureDeskBookings(req, res, next) { //function to get all future desk bookings
    let desks;
    try {
        desks = await deskBookingsModel.getFutureDeskBookings();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!desks || desks.length === 0) {
        return res.status(404).json({ message: 'No desks found' });
    }
    return res.status(200).json(desks);
}

async function getAllDeskBookingsForUser(req, res, next) { //function to get all desk bookings for a user
    const userId = req.userId;
    let desks;
    try {
        desks = await deskBookingsModel.getDeskBookingsForUser(userId);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!desks || desks.length === 0) {
        return res.status(404).json({ message: 'No desks found' });
    }
    return res.status(200).json(desks);
}

async function getFutureDeskBookingsForUser(req, res, next) { //function to get all future desk bookings for a user
    const userId = req.userId;
    let desks;
    try {
        desks = await deskBookingsModel.getFutureDeskBookingsForUser(userId);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!desks || desks.length === 0) {
        return res.status(404).json({ message: 'No desks found' });
    }
    return res.status(200).json(desks);
}

async function getDesksAvailabilityByDateObj(req, res, next) { //function to get availability of all desks for a particular date
    let date = req.body.dates;
    if (Array.isArray(date)) date = date[0];
    if (!date) {
        return res.status(400).json({ message: 'Dates not provided' });
    }
    date = moment(date).format('YYYY-MM-DD');
    let desksObj;
    try {
        desksObj = await deskBookingsModel.getDesksAvailabilityByDate(date);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    return res.status(200).json(desksObj);
}

async function getDesksAvailabilityByDatesObj(req, res, next) { //function to get availability of all desks for multiple dates
    let dates = req.body.dates;
    if (!dates) {
        return res.status(400).json({ message: 'Dates not provided' });
    }
    if (!Array.isArray(dates)) dates = [dates];
    //if there is only one date in dates array, then forward this request to getDesksAvailabilityByDateObj function
    if (dates.length === 1) {
        return getDesksAvailabilityByDateObj(req, res, next);
    }
    for (let i = 0; i < dates.length; i++) {
        dates[i] = moment(dates[i]).format('YYYY-MM-DD');
    }
    
    let desksObj = [];
    for (let i = 0; i < dates.length; i++) { //get availability of all desks for each date in dates array
        let desks;
        try {
            desks = await deskBookingsModel.getDesksAvailabilityByDate(dates[i]); //get availability of all desks for a particular date
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        desksObj.push(desks); //push the object containing availability of all desks for a particular date into desksObj array
    }
    let finalDesks;
    try {
        finalDesks = await deskBookingsModel.getDeskLayout();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    for (let i = 0; i < desksObj.length; i++) { //iterate over desksObj array and update finalDesks object with bookedBy field for each desk if desk is booked for any of the dates
        for (const key in desksObj[i]) {
            if(key == "dateBooked") continue;
            if (desksObj[i][key].bookedBy !== null) {
                finalDesks[key].bookedBy = "someone";
            }
        }
    }
    return res.status(200).json(finalDesks); //finalDesks object contains availability of all desks for all dates in dates array
}


async function getDesksObj(req, res, next) { //function to get an object with desk id as key and an array of objects containing userId, dateBooked and name as values
    let desksObj;
    try {
        desksObj = await deskBookingsModel.getDeskBookingsObj();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!desksObj || desksObj.length === 0) {
        return res.status(404).json({ message: 'No desks found' });
    }
    return res.status(200).json(desksObj);
}

// localhost:3000/desks/getdesk?deskId=A10
async function getDeskByDeskId(req, res, next) { //function to get future desk bookings for a desk id
    const deskId = req.query.deskId;
    if (!deskId) {
        return res.status(400).json({ message: 'Desk id not provided' });
    }
    // console.log(deskId);
    let desk;
    try {
        desk = await deskBookingsModel.getDeskBookingByDeskId(deskId);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (desk.length === 0) {
        return res.status(404).json({ message: 'Desk not found' });
    }
    return res.status(200).json(desk);
}

//book desk function to book a desk using desk id and user id for multiple dates (array of dates) by inserting them into desk bookings table
async function bookDesk(req, res, next) {
    let dates = req.body.dates;
    const deskId = req.query.deskId;
    const userId = req.userId;
    if (!dates || !deskId || !userId) {
        return res.status(400).json({ message: 'Dates, desk id or user id not provided' });
    }

    for (let i = 0; i < dates.length; i++) {
        dates[i] = moment(dates[i]).format('YYYY-MM-DD');
    }
    let bookings;
    try {
        bookings = await deskBookingsModel.getDeskBookingByDeskIdAndDates(deskId, dates); //check if desk is already booked for any of the dates
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!bookings) bookings = []; //if bookings is undefined, then set bookings to empty array
    if (bookings.length > 0) {
        return res.status(400).json({ message: 'Desk already booked for one or more of the dates' });
    }
    let lastBookingId;
    try {
        lastBookingId = await deskBookingsModel.bookDesk(deskId, userId, dates); //book desk by inserting row into desk bookings table
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    return res.status(201).json({ message: 'Desk booked successfully', bookingId: lastBookingId });
}

async function cancelDeskBooking(req, res, next) {
    const deskId = req.query.deskId;
    const userId = req.userId;
    let date = req.body.dates;
    if (!deskId || !userId || !date) {
        return res.status(400).json({ message: 'Desk id, user id or date not provided' });
    }
    if (!Array.isArray(date)) date = [date];
    if(date.length > 1) {
        return res.status(400).json({ message: 'Only one date can be provided' });
    }
    date[0] = moment(date[0]).format('YYYY-MM-DD');
    let bookings;
    try {
        bookings = await deskBookingsModel.getDeskBookingByDeskIdAndDates(deskId, date); //check if desk is booked for the date
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    // console.log(bookings);
    if (!bookings || bookings.length === 0) {
        return res.status(400).json({ message: 'Desk not booked for the date' });
    }
    try {
        await deskBookingsModel.cancelDeskBooking(deskId, userId, date); //cancel desk booking by deleting row from desk bookings table
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    return res.status(200).json({ message: 'Desk booking cancelled successfully' });
}

module.exports = {
    getAllDeskBookings,
    getFutureDeskBookings,
    getAllDeskBookingsForUser,
    getFutureDeskBookingsForUser,
    getDesksAvailabilityByDateObj,
    getDesksAvailabilityByDatesObj,
    getDesksObj,
    getDeskByDeskId,
    bookDesk,
    cancelDeskBooking
};