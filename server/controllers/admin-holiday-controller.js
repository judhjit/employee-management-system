// const FoodBookings = require('../models/food-booking');
// const User = require('../models/user');
const Holiday = require('../models/holiday');
const dateFns = require('date-fns');
require("dotenv").config("../.env");

const logger = require('../logger/index');
const childLogger = logger.child({ module: 'user-all-booking-controller' });

const transporter = require('../mail');
const { as } = require('pg-promise');

let service = "";

async function getAllHolidaysOfThisAndUpcomingYears(req, res, next) {
    service = "getAllHolidaysOfThisAndUpcomingYears";
    let holidays;
    try {
        childLogger.info("Getting all holidays of this and upcoming years", { service: service });
        holidays = await Holiday.getHolidaysOfCurrentAndUpcomingYears();
        childLogger.info("Successfully got all holidays of this and upcoming years", { service: service });
    } catch (error) {
        childLogger.error("Failed to get all holidays of this and upcoming years", { service: service, error: error });
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    childLogger.info("Returning all holidays of current and upcoming years", { service: service, userId: req.userId });
    res.status(200).json({ holidays: holidays });
}

async function createHoliday(req, res, next) {
    service = "createHoliday";
    const { holidayName, holidayDate } = req.body;
    const holiday = new Holiday(holidayName, holidayDate);
    // verify if holiday already exists
    let holidayexists;
    try {
        childLogger.info("Checking if holiday exists", { service: service, name: holidayName, date: holidayDate });
        holidayexists = await holiday.get();
        childLogger.info("Successfully checked if holiday exists", { service: service, name: holidayName, date: holidayDate });
    } catch (error) {
        childLogger.error("Failed to check if holiday exists", { service: service, name: holidayName, date: holidayDate, error: error });
        return res.status(500).json({ message: 'Internal Server Error' });
    }

    if (holidayexists.length > 0) {
        childLogger.error("Holiday already exists", { service: service, name: holidayName, date: holidayDate });
        return res.status(409).json({ message: 'Holiday already exists' });
    }

    try {
        childLogger.info("Creating holiday", { service: service, name: holidayName, date: holidayDate });
        await holiday.create();
        childLogger.info("Successfully created holiday", { service: service, name: holidayName, date: holidayDate });
    } catch (error) {
        childLogger.error("Failed to create holiday", { service: service, name: holidayName, date: holidayDate, error: error });
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    childLogger.info("Holiday created", { service: service, name: holidayName, date: holidayDate });
    res.status(201).json({ message: 'Holiday created' });
}

async function updateHolidayDate(req, res, next) {
    service = "updateHolidayDate";
    const { holidayName, holidayDate } = req.body;
    const holiday = new Holiday(holidayName, holidayDate);
    try {
        childLogger.info("Updating holiday date", { service: service, name: holidayName, date: holidayDate });
        await holiday.updateDate();
        childLogger.info("Successfully updated holiday date", { service: service, name: holidayName, date: holidayDate });
    } catch (error) {
        childLogger.error("Failed to update holiday date", { service: service, name: holidayName, date: holidayDate, error: error });
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    childLogger.info("Holiday date updated", { service: service, name: holidayName, date: holidayDate });
    res.status(200).json({ message: 'Holiday date updated' });
}

async function updateHolidayName(req, res, next) {
    service = "updateHolidayName";
    const { holidayName, holidayDate } = req.body;
    const holiday = new Holiday(holidayName, holidayDate);
    try {
        childLogger.info("Updating holiday name", { service: service, name: holidayName, date: holidayDate });
        await holiday.updateName();
        childLogger.info("Successfully updated holiday name", { service: service, name: holidayName, date: holidayDate });
    } catch (error) {
        childLogger.error("Failed to update holiday name", { service: service, name: holidayName, date: holidayDate, error: error });
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    childLogger.info("Holiday name updated", { service: service, name: holidayName, date: holidayDate });
    res.status(200).json({ message: 'Holiday name updated' });
}

async function deleteHoliday(req, res, next) {
    service = "deleteHoliday";
    const { holidayName, holidayDate } = req.body;
    const holiday = new Holiday(holidayName, holidayDate);
    try {
        childLogger.info("Deleting holiday", { service: service, name: holidayName, date: holidayDate });
        await holiday.delete();
        childLogger.info("Successfully deleted holiday", { service: service, name: holidayName, date: holidayDate });
    } catch (error) {
        childLogger.error("Failed to delete holiday", { service: service, name: holidayName, date: holidayDate, error: error });
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    childLogger.info("Holiday deleted", { service: service, name: holidayName, date: holidayDate });
    res.status(200).json({ message: 'Holiday deleted' });
}

module.exports = {
    getAllHolidaysOfThisAndUpcomingYears,
    createHoliday,
    updateHolidayDate,
    updateHolidayName,
    deleteHoliday
};