const Holiday = require('../models/holiday');
// const User = require('../models/user');
const dateFns = require('date-fns');
require("dotenv").config("../.env");

const logger = require('../logger/index');
const childLogger = logger.child({ module: 'user-all-booking-controller' });

const transporter = require('../mail');

let service = "";

async function getAllHolidaysOfThisAndUpcomingYears (req, res, next) {
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

module.exports = {
    getAllHolidaysOfThisAndUpcomingYears
};