const DeskBookings = require('../models/desk-booking');
const moment = require('moment');
require("dotenv").config("../.env");

async function getDesksAvailabilityByDatesObj(req, res, next) { //function to get availability of all desks for multiple dates
    let dates = req.body.dates;
    if (!dates || dates.length === 0) {
        return res.status(400).json({ message: 'Dates not provided' });
    }
    if (!Array.isArray(dates)) dates = [dates];
    for (let i = 0; i < dates.length; i++) {
        dates[i] = moment(dates[i]).format('YYYY-MM-DD');
    }

    let desksObj = [];
    for (let i = 0; i < dates.length; i++) { //get availability of all desks for each date in dates array
        let desks;
        try {
            desks = await DeskBookings.getDesksAvailabilityByDate(dates[i]); //get availability of all desks for a particular date
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        desksObj.push(desks); //push the object containing availability of all desks for a particular date into desksObj array
    }
    if(dates.length === 1) return res.status(200).json(desksObj[0]); //if only one date is provided, return the object containing availability of all desks for that date
    let finalDesks;
    try {
        finalDesks = await DeskBookings.getDeskLayout();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    for (let i = 0; i < desksObj.length; i++) { //iterate over desksObj array and update finalDesks object with bookedBy field for each desk if desk is booked for any of the dates
        for (const key in desksObj[i]) {
            if (key == "dateBooked") continue;
            if (desksObj[i][key].bookedBy !== null) {
                finalDesks[key].bookedBy = "Someone";
            }
        }
    }
    return res.status(200).json(finalDesks); //finalDesks object contains availability of all desks for all dates in dates array
}

module.exports = {
    getDesksAvailabilityByDatesObj
};