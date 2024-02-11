const db = require("../data/database");
// const bcrypt = require("bcrypt");
// const { v4: uuidv4 } = require('uuid');
const dateFns = require('date-fns');
const logger = require('../logger/index');
const childLogger = logger.child({ module: 'user' });

let service = "";

class Holiday {
    constructor(holiday_name, holiday_date) {
        service = "Holiday constructor";
        this.holiday_date = holiday_date;
        this.holiday_name = holiday_name;
        childLogger.info("Holiday object created", { service: service });
    }

    static async formatHoliday(holiday) {
        service = "formatHoliday";

        if (!holiday) {
            childLogger.error("Holiday not found", { service: service });
            return null;
        }
        if (!Array.isArray(holiday)) holiday = [holiday]; //if holiday is not an array, then set holiday to an array containing holiday
        holiday.forEach((holiday) => {
            holiday.holiday_date = dateFns.format(holiday.holiday_date, 'yyyy-MM-dd');
            holiday.holiday_name = holiday.holiday_name;
        });
        childLogger.info("Successfully formatted holiday", { service: service });
        return holiday;
    }

    async create() {
        service = "create";
        try {
            const result = await db.any(
                'INSERT INTO public."Holidays" VALUES ($1, $2) RETURNING *',
                [this.holiday_date, this.holiday_name]
            );
            childLogger.info("Successfully created holiday", { service: service, name: this.holiday_name, date: this.holiday_date });
            return result;
        } catch (error) {
            childLogger.error("Failed to create holiday", { service: service, name: this.holiday_name, date: this.holiday_date, error: error });
        }
    }

    async get() {
        service = "get";
        try {
            const result = await db.any('SELECT * FROM public."Holidays" WHERE holiday_date = $1', [this.holiday_date]);
            childLogger.info("Successfully retrieved holiday", { service: service, date: this.holiday_date });
            return result;
        } catch (error) {
            childLogger.error("Failed to retrieve holiday", { service: service, date: this.holiday_date, error: error });
        }
    }

    async updateDate() {
        service = "updateDate";
        try {
            const result = await db.any(
                'UPDATE public."Holidays" SET holiday_date = $1 WHERE holiday_name = $2 RETURNING *',
                [this.date, this.name]
            );
            childLogger.info("Successfully updated holiday", { service: service, name: this.holiday_name, date: this.holiday_date });
            return result;
        } catch (error) {
            childLogger.error("Failed to update holiday", { service: service, name: this.holiday_name, date: this.holiday_date, error: error });
        }
    }

    async updateName() {
        service = "updateName";
        try {
            const result = await db.any(
                'UPDATE public."Holidays" SET holiday_name = $1 WHERE holiday_date = $2 RETURNING *',
                [this.name, this.date]
            );
            childLogger.info("Successfully updated holiday", { service: service, name: this.holiday_name, date: this.holiday_date });
            return result;
        }
        catch (error) {
            childLogger.error("Failed to update holiday", { service: service, name: this.holiday_name, date: this.holiday_date, error: error });
        }
    }

    async delete() {
        service = "delete";
        try {
            const result = await db.any('DELETE FROM public."Holidays" WHERE holiday_date = $1', [this.holiday_date]);
            childLogger.info("Successfully deleted holiday", { service: service, date: this.holiday_date });
            return result;
        } catch (error) {
            childLogger.error("Failed to delete holiday", { service: service, date: this.holiday_date, error: error });
        }
    }

    static async getAll() {
        service = "getAll";
        let holidays;
        try {
            holidays = await db.any('SELECT * FROM public."Holidays"');
            childLogger.info("Successfully got all holidays", { service: service });
        } catch (error) {
            childLogger.error("Failed to get all holidays", { service: service, error: error });
        }
        try {
            holidays = await this.formatHoliday(holidays);
            childLogger.info("Successfully formatted all holidays", { service: service });
        } catch (error) {
            childLogger.error("Failed to format all holidays", { service: service, error: error });
        }
        childLogger.info("Successfully returned all holidays", { service: service });
        return holidays;
    }

    static async getUpcoming() {
        service = "getUpcoming";
        let holidays;
        try {
            holidays = await db.any('SELECT * FROM public."Holidays" WHERE date > CURRENT_DATE');
            childLogger.info("Successfully got upcoming holidays", { service: service });
        } catch (error) {
            childLogger.error("Failed to get upcoming holidays", { service: service, error: error });
        }
        try {
            holidays = await this.formatHoliday(holidays);
            childLogger.info("Successfully formatted upcoming holidays", { service: service });
        } catch (error) {
            childLogger.error("Failed to format upcoming holidays", { service: service, error: error });
        }
        childLogger.info("Successfully returned upcoming holidays", { service: service });
        return holidays;
    }

    static async getHolidaysOfCurrentAndUpcomingYears() {
        service = "getHolidaysOfCurrentAndUpcomingYears";
        let holidays;
        try {
            holidays = await db.any('SELECT * FROM public."Holidays" WHERE EXTRACT(YEAR FROM holiday_date) >= EXTRACT(YEAR FROM CURRENT_DATE)');
            childLogger.info("Successfully got this year's and upcoming years' holidays", { service: service });
        } catch (error) {
            childLogger.error("Failed to get this year's and upcoming years' holidays", { service: service, error: error });
        }
        try {
            holidays = await this.formatHoliday(holidays);
            childLogger.info("Successfully formatted this year's and upcoming years' holidays", { service: service });
        } catch (error) {
            childLogger.error("Failed to format this year's and upcoming years' holidays", { service: service, error: error });
        }
        childLogger.info("Successfully returned this year's and upcoming years' holidays", { service: service });
        return holidays;
    }
}

module.exports = Holiday;