const cabBookingsModel = require('../models/cab-booking');
const deskBookingsModel = require('../models/desk-booking');
const moment = require('moment');


async function getAllCabBookings(req, res, next) { //function to get all cab bookings
    let cabs;
    try {
        cabs = await cabBookingsModel.getAllCabBookings();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!cabs || cabs.length === 0) {
        return res.status(404).json({ message: 'No cab bookings found' });
    }
    return res.status(200).json(cabs);
}

async function getFutureCabBookings(req, res, next) { //function to get all cab bookings for future dates
    let cabs;
    try {
        cabs = await cabBookingsModel.getAllFutureCabBookings();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!cabs || cabs.length === 0) {
        return res.status(404).json({ message: 'No cab bookings found' });
    }
    return res.status(200).json(cabs);
}

async function getCabBookingsForUser(req, res, next) { //function to get all cab bookings for a user
    const userId = req.userId;
    let cabs;
    try {
        cabs = await cabBookingsModel.getCabBookingsForUser(userId);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!cabs || cabs.length === 0) {
        return res.status(404).json({ message: 'No cab bookings found' });
    }
    return res.status(200).json(cabs);
}

async function getFutureCabBookingsForUser(req, res, next) { //function to get all cab bookings for a user for future dates
    const userId = req.userId;
    let cabs;
    try {
        cabs = await cabBookingsModel.getFutureCabBookingsForUser(userId);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!cabs || cabs.length === 0) {
        return res.status(404).json({ message: 'No cab bookings found' });
    }
    return res.status(200).json(cabs);
}

async function getCabBookingsForDates(req, res, next) { //function to get all cab bookings for multiple dates (array of dates)
    let dates = req.body.dates;
    if (!dates || dates.length === 0) {
        return res.status(400).json({ message: 'Dates not provided' });
    }
    if (!Array.isArray(dates)) dates = [dates];
    for (let i = 0; i < dates.length; i++) {
        dates[i] = moment(dates[i]).format('YYYY-MM-DD');
    }
    let cabs;
    try {
        cabs = await cabBookingsModel.getCabBookingsForDates(dates);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!cabs || cabs.length === 0) {
        return res.status(404).json({ message: 'No cab bookings found' });
    }
    return res.status(200).json(cabs);
}

async function getCabBookingsBetweenDates(req, res, next) { //function to get all cab bookings between two dates
    let { startDate, endDate } = req.body;
    if (!startDate || !endDate) {
        return res.status(400).json({ message: 'Start date or end date not provided' });
    }
    startDate = moment(startDate).format('YYYY-MM-DD');
    endDate = moment(endDate).format('YYYY-MM-DD');
    let cabs;
    try {
        cabs = await cabBookingsModel.getCabBookingsBetweenDates(startDate, endDate);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!cabs || cabs.length === 0) {
        return res.status(404).json({ message: 'No cab bookings found' });
    }
    return res.status(200).json(cabs);
}

async function bookCab(req, res, next) { //function to book a cab for multiple dates
    let { dates, workSlot } = req.body;
    const userId = req.userId;
    if (!dates || !workSlot || dates.length === 0) {
        return res.status(400).json({ message: 'Dates or work slot not provided' });
    }
    if (!Array.isArray(dates)) dates = [dates];
    for (let i = 0; i < dates.length; i++) {
        dates[i] = moment(dates[i]).format('YYYY-MM-DD');
    }
    //verify that bookings do not already exist for the dates
    let existingBookings;
    try {
        existingBookings = await cabBookingsModel.getCabBookingsForUserForDates(userId, dates);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (existingBookings && existingBookings.length > 0) {
        return res.status(400).json({ message: 'Cab booking already exists for the dates' });
    }
    //verify that there is a desk boodking for the dates
    let deskBookings;
    try {
        deskBookings = await deskBookingsModel.getDeskBookingsForUserForDates(userId, dates);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!deskBookings || deskBookings.length === 0 || deskBookings.length !== dates.length) {
        return res.status(404).json({ message: 'No desk booking found for the dates' });
    }
    let cab;
    try {
        cab = await cabBookingsModel.bookCab(userId, dates, workSlot);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    return res.status(201).json({ message: 'Cab booked successfully', bookingId: cab });
}

async function modifyCabBooking(req, res, next) { //function to modify cab booking
    let { dates, workSlot } = req.body;
    if (!dates || !workSlot || dates.length === 0) {
        return res.status(400).json({ message: 'Date or work slot not provided' });
    }
    const userId = req.userId;
    if (!Array.isArray(dates)) dates = [dates];
    //verify that booking exists for the date
    let existingBooking;
    try {
        existingBooking = await cabBookingsModel.getCabBookingsForUserForDates(userId, dates[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!existingBooking || existingBooking.length === 0) {
        return res.status(404).json({ message: 'Cab booking does not exist for the date' });
    }
    try {
        await cabBookingsModel.modifyCabBooking(userId, dates[0], workSlot);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    return res.status(200).json({ message: 'Cab booking modified successfully' });
}

async function deleteCabBooking(req, res, next) { //function to delete cab booking
    let { dates } = req.body;
    if (!dates || dates.length === 0) {
        return res.status(400).json({ message: 'Date not provided' });
    }
    const userId = req.userId;
    if (!Array.isArray(dates)) dates = [dates];
    //verify that booking exists for the date
    let existingBooking;
    try {
        existingBooking = await cabBookingsModel.getCabBookingsForUserForDates(userId, dates[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!existingBooking || existingBooking.length === 0) {
        return res.status(404).json({ message: 'Cab booking does not exist for the date' });
    }
    try {
        await cabBookingsModel.cancelCabBooking(userId, dates[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    return res.status(200).json({ message: 'Cab booking deleted successfully' });
}

module.exports = {
    getAllCabBookings,
    getFutureCabBookings,
    getCabBookingsForUser,
    getFutureCabBookingsForUser,
    getCabBookingsForDates,
    getCabBookingsBetweenDates,
    bookCab,
    modifyCabBooking,
    deleteCabBooking
};