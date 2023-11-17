const DeskBookings = require('../models/desk-booking');
const dateFns = require('date-fns');
require("dotenv").config("../.env");

const logger = require('../logger/index');
const childLogger = logger.child({ module: 'user-desk-controller' });

let service = "";

async function getDesksAvailabilityByDatesObj(req, res, next) { //function to get availability of all desks for multiple dates
    service = "getDesksAvailabilityByDatesObj";
    let dates = req.body.dates;
    if (!dates || dates.length === 0) {
        childLogger.error("Dates not provided", { service: service, userId: req.userId });
        return res.status(400).json({ message: 'Dates not provided' });
    }
    if (!Array.isArray(dates)) dates = [dates];
    for (let i = 0; i < dates.length; i++) {
        dates[i] = dateFns.format(new Date(dates[i]), 'yyyy-MM-dd');
    }

    let desksObj = [];
    childLogger.info("Getting availability of all desks for multiple dates", { service: service, userId: req.userId, request: { dates: dates} });
    for (let i = 0; i < dates.length; i++) { //get availability of all desks for each date in dates array
        let desks;
        try {
            childLogger.info("Getting availability of all desks for a particular date", { service: service, userId: req.userId, request: { date: dates[i]} });
            desks = await DeskBookings.getDesksAvailabilityByDate(dates[i]); //get availability of all desks for a particular date
            childLogger.info("Successfully got availability of all desks for a particular date", { service: service, userId: req.userId, request: { date: dates[i]} });
        } catch (error) {
            childLogger.error("Failed to get availability of all desks for a particular date", { service: service, userId: req.userId, request: { date: dates[i] }, error: error });
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        desksObj.push(desks); //push the object containing availability of all desks for a particular date into desksObj array
    }
    if(dates.length === 1){
        childLogger.info("Successfully returned availability of all desks for a particular date", { service: service, userId: req.userId, request: { date: dates[0] } });
        return res.status(200).json(desksObj[0]); //if only one date is provided, return the object containing availability of all desks for that date
    } 
    let finalDesks;
    try {
        childLogger.info("Getting desk layout", { service: service, userId: req.userId });
        finalDesks = await DeskBookings.getDeskLayout();
        childLogger.info("Successfully got desk layout", { service: service, userId: req.userId });
    } catch (error) {
        childLogger.error("Failed to get desk layout", { service: service, userId: req.userId, error: error });
        return res.status(500).json({ message: 'Internal Server Error' });
    }

    for (let i = 0; i < desksObj.length; i++) { //iterate over desksObj array and update finalDesks object with bookedBy field for each desk if desk is booked for any of the dates
        for (const key in desksObj[i]) {
            if (key == "dateBooked") { //if key is dateBooked, then push the date into finalDesks object's dateBooked
                finalDesks.dateBooked.push(desksObj[i][key][0]);
                continue;
            }
            if (desksObj[i][key].bookedBy.length !== 0) { //if desk is booked for any of the dates, then push the bookedBy array into finalDesks object's bookedBy field
                finalDesks[key].bookedBy.push(desksObj[i][key].bookedBy[0]);
            } else { //if desk is not booked for any of the dates, then push null
                finalDesks[key].bookedBy.push(null);
            }
        }
    }
    childLogger.info("Successfully returned availability of all desks for multiple dates", { service: service, userId: req.userId, request: { dates: dates} });
    return res.status(200).json(finalDesks); //finalDesks object contains availability of all desks for all dates in dates array
}

module.exports = {
    getDesksAvailabilityByDatesObj
};