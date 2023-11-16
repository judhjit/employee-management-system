const db = require('../data/database');
const { v4: uuidv4 } = require('uuid');
const dateFns = require('date-fns');

const logger = require('../logger/index');
const childLogger = logger.child({ module: 'food-booking' });

let service = "";

class FoodBookings {

    constructor(bookingId, userId, bookedForDate, preference, dateOfBooking) {
        service = "FoodBookings constructor";
        this.bookingId = bookingId;
        this.userId = userId;
        this.bookedForDate = bookedForDate;
        this.preference = preference;
        this.dateOfBooking = dateOfBooking;
        childLogger.info("FoodBookings object created", { service: service });
    }

    static async formatFoodBookings(foodBookings) {
        service = "formatFoodBookings";
        if (!foodBookings) {
            childLogger.error("foodBookings is undefined", { service: service });
            return null; //if foodBookings is undefined, then return null
        }
        if (!Array.isArray(foodBookings)) foodBookings = [foodBookings]; //if foodBookings is not an array, then set foodBookings to an array containing foodBookings
        foodBookings.forEach((booking) => {
            booking.userId = booking.user_id;
            booking.name = `${booking.first_name} ${booking.last_name}`;
            booking.firstName = booking.first_name;
            booking.lastName = booking.last_name;
            booking.dateBooked = dateFns.format(new Date(booking.delivery_date), 'yyyy-MM-dd');
            delete booking.last_name;
            delete booking.first_name;
            delete booking.delivery_date;
            delete booking.user_id;
        });
        childLogger.info("Successfully formatted food bookings", { service: service });
        return foodBookings;
    }

    static async getAllFutureFoodBookings() {
        service = "getAllFutureFoodBookings";
        let bookings;
        try {
            bookings = await db.any(`SELECT public."FoodBookings"."user_id",
            public."FoodBookings"."delivery_date", public."FoodBookings"."preference",
            public."Users"."first_name", public."Users"."last_name"
            FROM public."FoodBookings"
            INNER JOIN public."Users" ON public."FoodBookings"."user_id" = public."Users"."user_id"
            WHERE public."FoodBookings"."delivery_date" >= CURRENT_DATE
            ORDER BY public."FoodBookings"."delivery_date";`);
            childLogger.info("Successfully got all future food bookings", { service: service });
        } catch (error) {
            childLogger.error("Failed to get all future food bookings", { service: service, error: error });
        }
        try {
            bookings = await this.formatFoodBookings(bookings);
            childLogger.info("Successfully formatted all future food bookings", { service: service });
        } catch (error) {
            childLogger.error("Failed to format all future food bookings", { service: service, error: error });
        }
        childLogger.info("Successfully returned all future food bookings", { service: service });
        return bookings;
    }

    static async getCountOfFutureFoodBookings() {
        service = "getCountOfFutureFoodBookings";
        let count;
        try {
            count = await db.any(`SELECT COUNT(*) FROM public."FoodBookings" WHERE "delivery_date" >= CURRENT_DATE`);
            childLogger.info("Successfully got count of all future food bookings", { service: service });
        } catch (error) {
            childLogger.error("Failed to get count of all future food bookings", { service: service, error: error });
        }
        childLogger.info("Successfully returned count of all future food bookings", { service: service });
        return count[0].count;
    }

    static async getFutureFoodBookingsForUser(userId) {
        service = "getFutureFoodBookingsForUser";
        if (!userId) {
            childLogger.error("userId is undefined", { service: service });
            return null; //if userId is undefined, then return null
        }
        let bookings;
        try {
            bookings = await db.any(`SELECT public."FoodBookings"."user_id",
            public."FoodBookings"."delivery_date", public."FoodBookings"."preference",
            public."Users"."first_name", public."Users"."last_name"
            FROM public."FoodBookings"
            INNER JOIN public."Users" ON public."FoodBookings"."user_id" = public."Users"."user_id"
            WHERE public."FoodBookings"."user_id" = $1 AND public."FoodBookings"."delivery_date" >= CURRENT_DATE
            ORDER BY public."FoodBookings"."delivery_date";`, [userId]);
            childLogger.info("Successfully got all future food bookings for a user", { service: service, userId: userId });
        } catch (error) {
            childLogger.error("Failed to get all future food bookings for a user", { service: service, userId: userId, error: error });
        }
        try {
            bookings = await this.formatFoodBookings(bookings);
            childLogger.info("Successfully formatted all future food bookings for a user", { service: service, userId: userId });
        } catch (error) {
            childLogger.error("Failed to format all future food bookings for a user", { service: service, userId: userId, error: error });
        }
        childLogger.info("Successfully returned all future food bookings for a user", { service: service, userId: userId });
        return bookings;
    }

    static async getCountOfFutureFoodBookingsForUser(userId) {
        service = "getCountOfFutureFoodBookingsForUser";
        if (!userId) {
            childLogger.error("userId is undefined", { service: service });
            return null; //if userId is undefined, then return null
        }
        let count;
        try {
            count = await db.any(`SELECT COUNT(*) FROM public."FoodBookings" WHERE "user_id" = $1 AND "delivery_date" >= CURRENT_DATE`, [userId]);
            childLogger.info("Successfully got count of all future food bookings for a user", { service: service, userId: userId });
        } catch (error) {
            childLogger.error("Failed to get count of all future food bookings for a user", { service: service, userId: userId, error: error });
        }
        childLogger.info("Successfully returned count of all future food bookings for a user", { service: service, userId: userId });
        return count[0].count;
    }

    static async getFoodBookingsForDates(dates) { //returns an array of all food bookings for multiple dates (array of dates)
        service = "getFoodBookingsForDates";
        if (!dates) {
            childLogger.error("dates is undefined", { service: service });
            return null; //if dates is undefined, then return null
        }
        if (!Array.isArray(dates)) dates = [dates]; //if dates is not an array, then set dates to an array containing dates
        for (let i = 0; i < dates.length; i++) {
            dates[i] = dateFns.format(new Date(dates[i]), 'yyyy-MM-dd');
        }
        //sort dates in ascending order
        dates.sort((a, b) => {
            return new Date(a) - new Date(b);
        });
        let booking, bookings;
        try {
            for (let i = 0; i < dates.length; i++) {
                booking = await db.any(`SELECT public."FoodBookings"."user_id",
                public."FoodBookings"."delivery_date", public."FoodBookings"."preference",
                public."Users"."first_name", public."Users"."last_name"
                FROM public."FoodBookings"
                INNER JOIN public."Users" ON public."FoodBookings"."user_id" = public."Users"."user_id"
                WHERE "delivery_date" = $1
                ORDER BY "delivery_date";`, [dates[i]]);
                if (!booking || booking.length === 0) continue;
                if (bookings) bookings = bookings.concat(booking);
                //concat is used instead of push because push adds the array booking as an element to bookings array, whereas concat adds the elements of booking array to bookings array
                else bookings = booking;
            }
            childLogger.info("Successfully got all food bookings for multiple dates", { service: service, request: { dates: dates} });
        } catch (error) {
            childLogger.error("Failed to get all food bookings for multiple dates", { service: service, request: { dates: dates}, error: error });
        }
        try {
            bookings = await this.formatFoodBookings(bookings);
            childLogger.info("Successfully formatted all food bookings for multiple dates", { service: service, request: { dates: dates} });
        } catch (error) {
            childLogger.error("Failed to format all food bookings for multiple dates", { service: service, request: { dates: dates}, error: error });
        }
        childLogger.info("Successfully returned all food bookings for multiple dates", { service: service, request: { dates: dates} });
        return bookings;
    }

    static async getFoodBookingsBetweenDates(startDate, endDate) { //returns an array of all food bookings between two dates
        service = "getFoodBookingsBetweenDates";
        if (!startDate || !endDate) {
            childLogger.error("startDate or endDate is undefined", { service: service });
            return null; //if startDate or endDate is undefined, then return null
        }
        startDate = dateFns.format(new Date(startDate), 'yyyy-MM-dd');
        endDate = dateFns.format(new Date(endDate), 'yyyy-MM-dd');
        let bookings;
        try {
            bookings = await db.any(`SELECT public."FoodBookings"."user_id",
            public."FoodBookings"."delivery_date", public."FoodBookings"."preference",
            public."Users"."first_name", public."Users"."last_name"
            FROM public."FoodBookings"
            INNER JOIN public."Users" ON public."FoodBookings"."user_id" = public."Users"."user_id"
            WHERE "delivery_date" BETWEEN $1 AND $2
            ORDER BY "delivery_date";`, [startDate, endDate]);
            childLogger.info("Successfully got all food bookings between two dates", { service: service, request: { startDate: startDate, endDate: endDate} });
        } catch (error) {
            childLogger.error("Failed to get all food bookings between two dates", { service: service, request: { startDate: startDate, endDate: endDate}, error: error });
        }
        try {
            bookings = await this.formatFoodBookings(bookings);
            childLogger.info("Successfully formatted all food bookings between two dates", { service: service, request: { startDate: startDate, endDate: endDate} });
        } catch (error) {
            childLogger.error("Failed to format all food bookings between two dates", { service: service, request: { startDate: startDate, endDate: endDate}, error: error });
        }
        childLogger.info("Successfully returned all food bookings between two dates", { service: service, request: { startDate: startDate, endDate: endDate} });
        return bookings;
    }

    static async getCountOfFoodBookingsBetweenDates(startDate, endDate) { //returns an array of all food bookings between two dates
        service = "getCountOfFoodBookingsBetweenDates";
        if (!startDate || !endDate) {
            childLogger.error("startDate or endDate is undefined", { service: service });
            return null; //if startDate or endDate is undefined, then return null
        }
        startDate = dateFns.format(new Date(startDate), 'yyyy-MM-dd');
        endDate = dateFns.format(new Date(endDate), 'yyyy-MM-dd');
        let count;
        try {
            count = await db.any(`SELECT COUNT(*) FROM public."FoodBookings" WHERE "delivery_date" BETWEEN $1 AND $2`, [startDate, endDate]);
            childLogger.info("Successfully got count of all food bookings between two dates", { service: service, request: { startDate: startDate, endDate: endDate} });
        } catch (error) {
            childLogger.error("Failed to get count of all food bookings between two dates", { service: service, request: { startDate: startDate, endDate: endDate}, error: error });
        }
        if(!count || count.length === 0) {
            childLogger.info("Count of all food bookings between two dates is 0", { service: service, request: { startDate: startDate, endDate: endDate} });
            return 0;
        }
        childLogger.info("Successfully returned count of all food bookings between two dates", { service: service, request: { startDate: startDate, endDate: endDate} });
        return count[0].count;
    }

    static async getFoodBookingsForUserForDates(userId, dates) { //returns an array of all food bookings for a user for multiple dates (array of dates)
        service = "getFoodBookingsForUserForDates";
        if (!userId || !dates) {
            childLogger.error("userId or dates is undefined", { service: service });
            return null; //if userId or dates is undefined, then return null
        }
        if (!Array.isArray(dates)) dates = [dates]; //if dates is not an array, then set dates to an array containing dates
        for (let i = 0; i < dates.length; i++) {
            dates[i] = dateFns.format(new Date(dates[i]), 'yyyy-MM-dd');
        }
        //sort dates in ascending order
        dates.sort((a, b) => {
            return new Date(a) - new Date(b);
        });
        let booking, bookings;
        try {
            for (let i = 0; i < dates.length; i++) {
                booking = await db.any(`SELECT public."FoodBookings"."user_id",
                public."FoodBookings"."delivery_date", public."FoodBookings"."preference",
                public."Users"."first_name", public."Users"."last_name"
                FROM public."FoodBookings"
                INNER JOIN public."Users" ON public."FoodBookings"."user_id" = public."Users"."user_id"
                WHERE "delivery_date" = $1 AND public."FoodBookings"."user_id" = $2
                ORDER BY "delivery_date";`, [dates[i], userId]);
                if (!booking || booking.length === 0) continue;
                if (bookings) bookings = bookings.concat(booking);
                //concat is used instead of push because push adds the array booking as an element to bookings array, whereas concat adds the elements of booking array to bookings array
                else bookings = booking;
            }
            childLogger.info("Successfully got all food bookings for a user for multiple dates", { service: service, userId: userId, request: { dates: dates} });
        } catch (error) {
            childLogger.error("Failed to get all food bookings for a user for multiple dates", { service: service, userId: userId, request: { dates: dates}, error: error });
        }
        try {
            bookings = await this.formatFoodBookings(bookings);
            childLogger.info("Successfully formatted all food bookings for a user for multiple dates", { service: service, userId: userId, request: { dates: dates} });
        } catch (error) {
            childLogger.error("Failed to format all food bookings for a user for multiple dates", { service: service, userId: userId, request: { dates: dates}, error: error });
        }
        childLogger.info("Successfully returned all food bookings for a user for multiple dates", { service: service, userId: userId, request: { dates: dates} });
        return bookings;
    }

    static async getFoodBookingsForUserBetweenDates(userId, startDate, endDate) { //returns an array of all food bookings for a user between two dates
        service = "getFoodBookingsForUserBetweenDates";
        if (!userId || !startDate || !endDate) {
            childLogger.error("userId, startDate or endDate is undefined", { service: service });
            return null; //if userId, startDate or endDate is undefined, then return null
        }
        startDate = dateFns.format(new Date(startDate), 'yyyy-MM-dd');
        endDate = dateFns.format(new Date(endDate), 'yyyy-MM-dd');
        let bookings;
        try {
            bookings = await db.any(`SELECT public."FoodBookings"."user_id",
            public."FoodBookings"."delivery_date", public."FoodBookings"."preference",
            public."Users"."first_name", public."Users"."last_name"
            FROM public."FoodBookings"
            INNER JOIN public."Users" ON public."FoodBookings"."user_id" = public."Users"."user_id"
            WHERE "delivery_date" BETWEEN $1 AND $2 AND public."FoodBookings"."user_id" = $3
            ORDER BY "delivery_date";`, [startDate, endDate, userId]);
            childLogger.info("Successfully got all food bookings for a user between two dates", { service: service, userId: userId, request: { startDate: startDate, endDate: endDate} });
        } catch (error) {
            childLogger.error("Failed to get all food bookings for a user between two dates", { service: service, userId: userId, request: { startDate: startDate, endDate: endDate}, error: error });
        }
        try {
            bookings = await this.formatFoodBookings(bookings);
            childLogger.info("Successfully formatted all food bookings for a user between two dates", { service: service, userId: userId, request: { startDate: startDate, endDate: endDate} });
        } catch (error) {
            childLogger.error("Failed to format all food bookings for a user between two dates", { service: service, userId: userId, request: { startDate: startDate, endDate: endDate}, error: error });
        }
        childLogger.info("Successfully returned all food bookings for a user between two dates", { service: service, userId: userId, request: { startDate: startDate, endDate: endDate} });
        return bookings;
    }

    static async getCountOfFoodBookingsForUserBetweenDates(userId, startDate, endDate) { //returns an array of all food bookings for a user between two dates
        service = "getCountOfFoodBookingsForUserBetweenDates";
        if (!userId || !startDate || !endDate) {
            childLogger.error("userId, startDate or endDate is undefined", { service: service });
            return null; //if userId, startDate or endDate is undefined, then return null
        }
        startDate = dateFns.format(new Date(startDate), 'yyyy-MM-dd');
        endDate = dateFns.format(new Date(endDate), 'yyyy-MM-dd');
        let count;
        try {
            count = await db.any(`SELECT COUNT(*) FROM public."FoodBookings" WHERE "delivery_date" BETWEEN $1 AND $2 AND "user_id" = $3`, [startDate, endDate, userId]);
            childLogger.info("Successfully got count of all food bookings for a user between two dates", { service: service, userId: userId, request: { startDate: startDate, endDate: endDate} });
        } catch (error) {
            childLogger.error("Failed to get count of all food bookings for a user between two dates", { service: service, userId: userId, request: { startDate: startDate, endDate: endDate}, error: error });
        }
        if(!count || count.length === 0) {
            childLogger.info("Count of all food bookings for a user between two dates is 0", { service: service, userId: userId, request: { startDate: startDate, endDate: endDate} });
            return 0;
        }
        childLogger.info("Successfully returned count of all food bookings for a user between two dates", { service: service, userId: userId, request: { startDate: startDate, endDate: endDate} });
        return count[0].count;
    }

    static async bookFood(userId, dates, preference) { //book food function to book food using user id, dates and preference for multiple dates by inserting them into food bookings table
        service = "bookFood";
        if (!userId || !dates || !preference) {
            childLogger.error("userId, dates or preference is undefined", { service: service });
            return null; //if userId, dates or preference is undefined, then return null
        }
        if (!Array.isArray(dates)) dates = [dates]; //if dates is not an array, then set dates to an array containing dates
        let bookingId;
        try {
            for (let i = 0; i < dates.length; i++) {
                bookingId = uuidv4(); //generate a random booking id
                await db.any('INSERT INTO public."FoodBookings"("booking_id", "user_id", "delivery_date", "preference", date_of_booking) VALUES($1, $2, $3, $4, CURRENT_TIMESTAMP)', [bookingId, userId, dates[i], preference]);
            }
            childLogger.info("Successfully booked food for multiple dates", { service: service, userId: userId, request: { dates: dates, preference: preference} });
        } catch (error) {
            childLogger.error("Failed to book food for multiple dates", { service: service, userId: userId, request: { dates: dates, preference: preference}, error: error });
        }
        childLogger.info("Successfully returned booking id", { service: service, userId: userId, request: { dates: dates, preference: preference}, bookingId: bookingId });
        return bookingId; //return last booking id
    }

    static async modifyFoodBooking(userId, date, preference) { //function to modify a food booking using booking id, user id, date and preference
        service = "modifyFoodBooking";
        if (!userId || !date || !preference) {
            childLogger.error("userId, date or preference is undefined", { service: service });
            return null; //if userId, date or preference is undefined, then return null
        }
        try {
            await db.any('UPDATE public."FoodBookings" SET "preference" = $1 WHERE "user_id" = $2 AND "delivery_date" = $3', [preference, userId, date]);
            childLogger.info("Successfully modified food booking", { service: service, userId: userId, request: { date: date, preference: preference} });
        } catch (error) {
            childLogger.error("Failed to modify food booking", { service: service, userId: userId, request: { date: date, preference: preference}, error: error });
        }
    }

    static async cancelFoodBooking(userId, date) { //function to cancel a food booking using booking id, user id and date
        service = "cancelFoodBooking";
        if (!userId || !date) {
            childLogger.error("userId or date is undefined", { service: service });
            return null; //if userId or date is undefined, then return null
        }
        if (!Array.isArray(date)) date = [date]; //if date is not an array, then set date to an array containing date
        try {
            await db.any('DELETE FROM public."FoodBookings" WHERE "user_id" = $1 AND "delivery_date" = $2', [userId, date[0]]);
            childLogger.info("Successfully cancelled food booking", { service: service, userId: userId, request: { date: date} });
        } catch (error) {
            childLogger.error("Failed to cancel food booking", { service: service, userId: userId, request: { date: date}, error: error });
        }
    }

}

module.exports = FoodBookings;


