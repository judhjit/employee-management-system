const db = require('../data/database');
const { v4: uuidv4 } = require('uuid');
const dateFns = require('date-fns');

const logger = require('../logger/index');
const childLogger = logger.child({ module: 'cab-booking' });

let service = "";

class CabBookings {
    constructor(bookingId, userId, bookedForDate, workSlot, dateOfBooking) {
        service = "CabBookings constructor";
        this.bookingId = bookingId;
        this.userId = userId;
        this.bookedForDate = bookedForDate;
        this.workSlot = workSlot;
        this.dateOfBooking = dateOfBooking;
        childLogger.info("CabBookings object created", { service: service });
    }

    static async formatCabBookings(cabBookings) {
        service = "formatCabBookings";
        if (!cabBookings){
            childLogger.error("Cab bookings not found", { service: service });
            return null; //if cabBookings is undefined, then return null
        }
        if (!Array.isArray(cabBookings)) cabBookings = [cabBookings]; //if cabBookings is not an array, then set cabBookings to an array containing cabBookings
        cabBookings.forEach((booking) => {
            booking.userId = booking.user_id;
            booking.name = `${booking.first_name} ${booking.last_name}`;
            booking.firstName = booking.first_name;
            booking.lastName = booking.last_name;
            booking.workSlot = booking.work_slot;
            booking.dateBooked = dateFns.format(new Date(booking.pickup_date), 'yyyy-MM-dd');
            delete booking.last_name;
            delete booking.first_name;
            delete booking.work_slot;
            delete booking.pickup_date;
            delete booking.user_id;
        });
        childLogger.info("Successfully formatted cab bookings", { service: service });
        return cabBookings;
    }

    static async getAllFutureCabBookings() {
        service = "getAllFutureCabBookings";
        let bookings;
        try {
            bookings = await db.any(`SELECT public."CabBookings"."user_id",
            public."CabBookings"."pickup_date", public."CabBookings"."work_slot",
            public."Users"."first_name", public."Users"."last_name"
            FROM public."CabBookings"
            INNER JOIN public."Users" ON public."CabBookings"."user_id" = public."Users"."user_id"
            WHERE public."CabBookings"."pickup_date" >= CURRENT_DATE
            ORDER BY public."CabBookings"."pickup_date";`);
            childLogger.info("Successfully got all future cab bookings", { service: service });
        } catch (error) {
            childLogger.error("Failed to get all future cab bookings", { service: service, error: error });
        }
        try {
            bookings = await this.formatCabBookings(bookings);
            childLogger.info("Successfully formatted all future cab bookings", { service: service });
        } catch (error) {
            childLogger.error("Failed to format all future cab bookings", { service: service, error: error });
        }
        childLogger.info("Successfully returned all future cab bookings", { service: service });
        return bookings;
    }

    static async getCountOfAllFutureCabBookings() {
        service = "getCountOfAllFutureCabBookings";
        let count;
        try {
            count = await db.any(`SELECT COUNT(*) FROM public."CabBookings" WHERE public."CabBookings"."pickup_date" >= CURRENT_DATE`);
            childLogger.info("Successfully got count of all future cab bookings", { service: service });
        }
        catch (error) {
            childLogger.error("Failed to get count of all future cab bookings", { service: service, error: error });
        }
        if(!count || count.length === 0) {
            childLogger.info("Count of all future cab bookings is 0", { service: service });
            return 0;
        }
        childLogger.info("Successfully returned count of all future cab bookings", { service: service });
        return count[0].count;
    }

    static async getFutureCabBookingsForUser(userId) {
        service = "getFutureCabBookingsForUser";
        if (!userId) {
            childLogger.error("User id not provided", { service: service });
            return null; //if userId is undefined, then return null
        
        }
        let bookings;
        try {
            bookings = await db.any(`SELECT public."CabBookings"."user_id",
            public."CabBookings"."pickup_date", public."CabBookings"."work_slot",
            public."Users"."first_name", public."Users"."last_name"
            FROM public."CabBookings"
            INNER JOIN public."Users" ON public."CabBookings"."user_id" = public."Users"."user_id"
            WHERE public."CabBookings"."user_id" = $1 AND public."CabBookings"."pickup_date" >= CURRENT_DATE
            ORDER BY public."CabBookings"."pickup_date";`, [userId]);
            childLogger.info("Successfully got future cab bookings for user", { service: service, userId: userId });
        } catch (error) {
            childLogger.error("Failed to get future cab bookings for user", { service: service, userId: userId, error: error });
        }
        try {
            bookings = await this.formatCabBookings(bookings);
            childLogger.info("Successfully formatted future cab bookings for user", { service: service, userId: userId });
        } catch (error) {
            childLogger.error("Failed to format future cab bookings for user", { service: service, userId: userId, error: error });
        }
        childLogger.info("Successfully returned future cab bookings for user", { service: service, userId: userId });
        return bookings;
    }

    static async getCountOfFutureCabBookingsForUser(userId) {
        service = "getCountOfFutureCabBookingsForUser";
        if (!userId) {
            childLogger.error("User id not provided", { service: service });
            return null; //if userId is undefined, then return null
        }
        let count;
        try {
            count = await db.any(`SELECT COUNT(*) FROM public."CabBookings" WHERE public."CabBookings"."user_id" = $1 AND public."CabBookings"."pickup_date" >= CURRENT_DATE`, [userId]);
            childLogger.info("Successfully got count of future cab bookings for user", { service: service, userId: userId });
        }
        catch (error) {
            childLogger.error("Failed to get count of future cab bookings for user", { service: service, userId: userId, error: error });
        }
        if(!count || count.length === 0) {
            childLogger.info("Count of future cab bookings for user is 0", { service: service, userId: userId });
            return 0;
        }
        childLogger.info("Successfully returned count of future cab bookings for user", { service: service, userId: userId });
        return count[0].count;
    }

    static async getCabBookingsForDates(dates) { //returns an array of all cab bookings for multiple dates (array of dates)
        service = "getCabBookingsForDates";
        if (!dates) {
            childLogger.error("Dates not provided", { service: service });
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
                booking = await db.any(`SELECT public."CabBookings"."user_id",
                public."CabBookings"."pickup_date", public."CabBookings"."work_slot",
                public."Users"."first_name", public."Users"."last_name"
                FROM public."CabBookings"
                INNER JOIN public."Users" ON public."CabBookings"."user_id" = public."Users"."user_id"
                WHERE "pickup_date" = $1
                ORDER BY "pickup_date";`, [dates[i]]);
                if (!booking || booking.length === 0) continue;
                if (bookings) bookings = bookings.concat(booking);
                //concat is used instead of push because push adds the array booking as an element to bookings array, whereas concat adds the elements of booking array to bookings array
                else bookings = booking;
            }
            childLogger.info("Successfully got cab bookings for dates", { service: service, request: { dates: dates} });
        } catch (error) {
            childLogger.error("Failed to get cab bookings for dates", { service: service, request: { dates: dates}, error: error });
        }
        try {
            bookings = await this.formatCabBookings(bookings);
            childLogger.info("Successfully formatted cab bookings for dates", { service: service, request: { dates: dates} });
        } catch (error) {
            childLogger.error("Failed to format cab bookings for dates", { service: service, request: { dates: dates}, error: error });
        }
        childLogger.info("Successfully returned cab bookings for dates", { service: service, request: { dates: dates} });
        return bookings;
    }

    static async getCabBookingsBetweenDates(startDate, endDate) { //returns an array of all cab bookings between two dates
        if (!startDate || !endDate) {
            childLogger.error("Start date or end date not provided", { service: service });
            return null; //if startDate or endDate is undefined, then return null
        }
        startDate = dateFns.format(new Date(startDate), 'yyyy-MM-dd');
        endDate = dateFns.format(new Date(endDate), 'yyyy-MM-dd');
        let bookings;
        try {
            bookings = await db.any(`SELECT public."CabBookings"."user_id",
            public."CabBookings"."pickup_date", public."CabBookings"."work_slot",
            public."Users"."first_name", public."Users"."last_name"
            FROM public."CabBookings"
            INNER JOIN public."Users" ON public."CabBookings"."user_id" = public."Users"."user_id"
            WHERE "pickup_date" BETWEEN $1 AND $2
            ORDER BY "pickup_date";`, [startDate, endDate]);
            childLogger.info("Successfully got cab bookings between dates", { service: service, request: { startDate: startDate, endDate: endDate} });
        } catch (error) {
            childLogger.error("Failed to get cab bookings between dates", { service: service, request: { startDate: startDate, endDate: endDate}, error: error });
        }
        try {
            bookings = await this.formatCabBookings(bookings);
            childLogger.info("Successfully formatted cab bookings between dates", { service: service, request: { startDate: startDate, endDate: endDate} });
        } catch (error) {
            childLogger.error("Failed to format cab bookings between dates", { service: service, request: { startDate: startDate, endDate: endDate}, error: error });
        }
        childLogger.info("Successfully returned cab bookings between dates", { service: service, request: { startDate: startDate, endDate: endDate} });
        return bookings;
    }

    static async getCountOfCabBookingsBetweenDates(startDate, endDate) { //returns an array of all cab bookings between two dates
        service = "getCountOfCabBookingsBetweenDates";
        if (!startDate || !endDate) {
            childLogger.error("Start date or end date not provided", { service: service });
            return null; //if startDate or endDate is undefined, then return null
        }
        startDate = dateFns.format(new Date(startDate), 'yyyy-MM-dd');
        endDate = dateFns.format(new Date(endDate), 'yyyy-MM-dd');
        let count;
        try {
            count = await db.any(`SELECT COUNT(*) FROM public."CabBookings" WHERE "pickup_date" BETWEEN $1 AND $2`, [startDate, endDate]);
            childLogger.info("Successfully got count of cab bookings between dates", { service: service, request: { startDate: startDate, endDate: endDate} });
        } catch (error) {
            childLogger.error("Failed to get count of cab bookings between dates", { service: service, request: { startDate: startDate, endDate: endDate}, error: error });
        }
        if(!count || count.length === 0) {
            childLogger.info("Count of cab bookings between dates is 0", { service: service, request: { startDate: startDate, endDate: endDate} });
            return 0;
        }
        childLogger.info("Successfully returned count of cab bookings between dates", { service: service, request: { startDate: startDate, endDate: endDate} });
        return count[0].count;
    }

    static async getCabBookingsForUserForDates(userId, dates) { //returns an array of all cab bookings for a user for multiple dates (array of dates)
        service = "getCabBookingsForUserForDates";
        if (!userId || !dates) {
            childLogger.error("User id or dates not provided", { service: service });
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
                booking = await db.any(`SELECT public."CabBookings"."user_id",
                public."CabBookings"."pickup_date", public."CabBookings"."work_slot",
                public."Users"."first_name", public."Users"."last_name"
                FROM public."CabBookings"
                INNER JOIN public."Users" ON public."CabBookings"."user_id" = public."Users"."user_id"
                WHERE "pickup_date" = $1 AND public."CabBookings"."user_id" = $2
                ORDER BY "pickup_date";`, [dates[i], userId]);
                if (!booking || booking.length === 0) continue;
                if (bookings) bookings = bookings.concat(booking);
                //concat is used instead of push because push adds the array booking as an element to bookings array, whereas concat adds the elements of booking array to bookings array
                else bookings = booking;
            }
            childLogger.info("Successfully got cab bookings for user for dates", { service: service, userId: userId, request: { dates: dates} });
        } catch (error) {
            childLogger.error("Failed to get cab bookings for user for dates", { service: service, userId: userId, request: { dates: dates}, error: error });
        }
        try {
            bookings = await this.formatCabBookings(bookings);
            childLogger.info("Successfully formatted cab bookings for user for dates", { service: service, userId: userId, request: { dates: dates} });
        } catch (error) {
            childLogger.error("Failed to format cab bookings for user for dates", { service: service, userId: userId, request: { dates: dates}, error: error });
        }
        childLogger.info("Successfully returned cab bookings for user for dates", { service: service, userId: userId, request: { dates: dates} });
        return bookings;
    }

    static async getCabBookingsForUserBetweenDates(userId, startDate, endDate) { //returns an array of all cab bookings for a user between two dates
        service = "getCabBookingsForUserBetweenDates";
        if (!userId || !startDate || !endDate) {
            childLogger.error("User id, start date or end date not provided", { service: service });
            return null; //if userId, startDate or endDate is undefined, then return null
        }
        startDate = dateFns.format(new Date(startDate), 'yyyy-MM-dd');
        endDate = dateFns.format(new Date(endDate), 'yyyy-MM-dd');
        let bookings;
        try {
            bookings = await db.any(`SELECT public."CabBookings"."user_id",
            public."CabBookings"."pickup_date", public."CabBookings"."work_slot",
            public."Users"."first_name", public."Users"."last_name"
            FROM public."CabBookings"
            INNER JOIN public."Users" ON public."CabBookings"."user_id" = public."Users"."user_id"
            WHERE "pickup_date" BETWEEN $1 AND $2 AND public."CabBookings"."user_id" = $3
            ORDER BY "pickup_date";`, [startDate, endDate, userId]);
            childLogger.info("Successfully got cab bookings for user between dates", { service: service, userId: userId, request: { startDate: startDate, endDate: endDate} });
        } catch (error) {
            childLogger.error("Failed to get cab bookings for user between dates", { service: service, userId: userId, request: { startDate: startDate, endDate: endDate}, error: error });
        }
        try {
            bookings = await this.formatCabBookings(bookings);
            childLogger.info("Successfully formatted cab bookings for user between dates", { service: service, userId: userId, request: { startDate: startDate, endDate: endDate} });
        } catch (error) {
            childLogger.error("Failed to format cab bookings for user between dates", { service: service, userId: userId, request: { startDate: startDate, endDate: endDate}, error: error });
        }
        childLogger.info("Successfully returned cab bookings for user between dates", { service: service, userId: userId, request: { startDate: startDate, endDate: endDate} });
        return bookings;
    }

    static async getCountOfCabBookingsForUserBetweenDates(userId, startDate, endDate) { //returns an array of all cab bookings for a user between two dates
        service = "getCountOfCabBookingsForUserBetweenDates";
        if (!userId || !startDate || !endDate) {
            childLogger.error("User id, start date or end date not provided", { service: service });
            return null; //if userId, startDate or endDate is undefined, then return null
        }
        startDate = dateFns.format(new Date(startDate), 'yyyy-MM-dd');
        endDate = dateFns.format(new Date(endDate), 'yyyy-MM-dd');
        let count;
        try {
            count = await db.any(`SELECT COUNT(*) FROM public."CabBookings" WHERE "pickup_date" BETWEEN $1 AND $2 AND public."CabBookings"."user_id" = $3`, [startDate, endDate, userId]);
            childLogger.info("Successfully got count of cab bookings for user between dates", { service: service, userId: userId, request: { startDate: startDate, endDate: endDate} });
        } catch (error) {
            childLogger.error("Failed to get count of cab bookings for user between dates", { service: service, userId: userId, request: { startDate: startDate, endDate: endDate}, error: error });
        }
        if(!count || count.length === 0) {
            childLogger.info("Count of cab bookings for user between dates is 0", { service: service, userId: userId, request: { startDate: startDate, endDate: endDate} });
            return 0;
        }
        childLogger.info("Successfully returned count of cab bookings for user between dates", { service: service, userId: userId, request: { startDate: startDate, endDate: endDate} });
        return count[0].count;
    }

    static async bookCab(userId, dates, workSlot) { //book cab function to book a cab using user id, dates and work slot for multiple dates by inserting them into cab bookings table
        service = "bookCab";
        if (!userId || !dates || !workSlot) {
            childLogger.error("User id, dates or work slot not provided", { service: service });
            return null; //if userId, dates or workSlot is undefined, then return null
        }
        if (!Array.isArray(dates)) dates = [dates]; //if dates is not an array, then set dates to an array containing dates
        let bookingId;
        try {
            for (let i = 0; i < dates.length; i++) {
                bookingId = uuidv4(); //generate a random booking id
                await db.any('INSERT INTO public."CabBookings"("booking_id", "user_id", "pickup_date", "work_slot", date_of_booking) VALUES($1, $2, $3, $4, CURRENT_TIMESTAMP)', [bookingId, userId, dates[i], workSlot]);
            }
            childLogger.info("Successfully booked cab", { service: service, userId: userId, request: { dates: dates, workSlot: workSlot} });
        } catch (error) {
            childLogger.error("Failed to book cab", { service: service, userId: userId, request: { dates: dates, workSlot: workSlot}, error: error });
        }
        childLogger.info("Successfully returned booking id", { service: service, userId: userId, request: { dates: dates, workSlot: workSlot}, bookingId: bookingId });
        return bookingId; //return last booking id
    }

    static async modifyCabBooking(userId, date, workSlot) { //function to modify a cab booking using booking id, user id, date and work slot
        service = "modifyCabBooking";
        if (!userId || !date || !workSlot) {
            childLogger.error("User id, date or work slot not provided", { service: service });
            return null; //if userId, date or workSlot is undefined, then return null
        }
        try {
            await db.any('UPDATE public."CabBookings" SET "work_slot" = $1 WHERE "user_id" = $2 AND "pickup_date" = $3', [workSlot, userId, date]);
            childLogger.info("Successfully modified cab booking", { service: service, userId: userId, request: { date: date, workSlot: workSlot} });
        } catch (error) {
            childLogger.error("Failed to modify cab booking", { service: service, userId: userId, request: { date: date, workSlot: workSlot}, error: error });
        }
    }

    static async cancelCabBooking(userId, date) { //function to cancel a cab booking using booking id, user id and date
        service = "cancelCabBooking";
        if (!userId || !date) {
            childLogger.error("User id or date not provided", { service: service });
            return null; //if userId or date is undefined, then return null
        }
        if (!Array.isArray(date)) date = [date]; //if date is not an array, then set date to an array containing date
        try {
            await db.any('DELETE FROM public."CabBookings" WHERE "user_id" = $1 AND "pickup_date" = $2', [userId, date[0]]);
            childLogger.info("Successfully cancelled cab booking", { service: service, userId: userId, request: { date: date} });
        } catch (error) {
            childLogger.error("Failed to cancel cab booking", { service: service, userId: userId, request: { date: date}, error: error });
        }
    }
}

module.exports = CabBookings;