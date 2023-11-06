const db = require('../data/database');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

class CabBookings {
    constructor(bookingId, userId, bookedForDate, workSlot, dateOfBooking) {
        this.bookingId = bookingId;
        this.userId = userId;
        this.bookedForDate = bookedForDate;
        this.workSlot = workSlot;
        this.dateOfBooking = dateOfBooking;
    }

    static async formatCabBookings(cabBookings) {
        if (!cabBookings) return null; //if cabBookings is undefined, then return null
        if (!Array.isArray(cabBookings)) cabBookings = [cabBookings]; //if cabBookings is not an array, then set cabBookings to an array containing cabBookings
        cabBookings.forEach((booking) => {
            booking.userId = booking.user_id;
            booking.name = `${booking.first_name} ${booking.last_name}`;
            booking.firstName = booking.first_name;
            booking.lastName = booking.last_name;
            booking.workSlot = booking.work_slot;
            booking.dateBooked = moment(booking.pickup_date).format('YYYY-MM-DD');
            delete booking.last_name;
            delete booking.first_name;
            delete booking.work_slot;
            delete booking.pickup_date;
            delete booking.user_id;
        });
        return cabBookings;
    }

    static async getAllFutureCabBookings() {
        let bookings;
        try {
            bookings = await db.any(`SELECT public."CabBookings"."user_id",
            public."CabBookings"."pickup_date", public."CabBookings"."work_slot",
            public."Users"."first_name", public."Users"."last_name"
            FROM public."CabBookings"
            INNER JOIN public."Users" ON public."CabBookings"."user_id" = public."Users"."user_id"
            WHERE public."CabBookings"."pickup_date" >= CURRENT_DATE
            ORDER BY public."CabBookings"."pickup_date";`);
        } catch (error) {
            console.error(error);
        }
        try {
            bookings = await this.formatCabBookings(bookings);
        } catch (error) {
            console.error(error);
        }
        return bookings;
    }

    static async getFutureCabBookingsForUser(userId) {
        if (!userId) return null; //if userId is undefined, then return null
        let bookings;
        try {
            bookings = await db.any(`SELECT public."CabBookings"."user_id",
            public."CabBookings"."pickup_date", public."CabBookings"."work_slot",
            public."Users"."first_name", public."Users"."last_name"
            FROM public."CabBookings"
            INNER JOIN public."Users" ON public."CabBookings"."user_id" = public."Users"."user_id"
            WHERE public."CabBookings"."user_id" = $1 AND public."CabBookings"."pickup_date" >= CURRENT_DATE
            ORDER BY public."CabBookings"."pickup_date";`, [userId]);
        } catch (error) {
            console.error(error);
        }
        try {
            bookings = await this.formatCabBookings(bookings);
        } catch (error) {
            console.error(error);
        }
        return bookings;
    }

    static async getCabBookingsForDates(dates) { //returns an array of all cab bookings for multiple dates (array of dates)
        if (!dates) return null; //if dates is undefined, then return null
        if (!Array.isArray(dates)) dates = [dates]; //if dates is not an array, then set dates to an array containing dates
        for (let i = 0; i < dates.length; i++) {
            dates[i] = moment(dates[i]).format('YYYY-MM-DD');
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
        } catch (error) {
            console.error(error);
        }
        try {
            bookings = await this.formatCabBookings(bookings);
        } catch (error) {
            console.error(error);
        }
        return bookings;
    }

    static async getCabBookingsBetweenDates(startDate, endDate) { //returns an array of all cab bookings between two dates
        if (!startDate || !endDate) return null; //if startDate or endDate is undefined, then return null
        startDate = moment(startDate).format('YYYY-MM-DD');
        endDate = moment(endDate).format('YYYY-MM-DD');
        let bookings;
        try {
            bookings = await db.any(`SELECT public."CabBookings"."user_id",
            public."CabBookings"."pickup_date", public."CabBookings"."work_slot",
            public."Users"."first_name", public."Users"."last_name"
            FROM public."CabBookings"
            INNER JOIN public."Users" ON public."CabBookings"."user_id" = public."Users"."user_id"
            WHERE "pickup_date" BETWEEN $1 AND $2
            ORDER BY "pickup_date";`, [startDate, endDate]);
        } catch (error) {
            console.error(error);
        }
        try {
            bookings = await this.formatCabBookings(bookings);
        } catch (error) {
            console.error(error);
        }
        return bookings;
    }

    static async getCabBookingsForUserForDates(userId, dates) { //returns an array of all cab bookings for a user for multiple dates (array of dates)
        if (!userId || !dates) return null; //if userId or dates is undefined, then return null
        if (!Array.isArray(dates)) dates = [dates]; //if dates is not an array, then set dates to an array containing dates
        for (let i = 0; i < dates.length; i++) {
            dates[i] = moment(dates[i]).format('YYYY-MM-DD');
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
        } catch (error) {
            console.error(error);
        }
        try {
            bookings = await this.formatCabBookings(bookings);
        } catch (error) {
            console.error(error);
        }
        return bookings;
    }

    static async getCabBookingsForUserBetweenDates(userId, startDate, endDate) { //returns an array of all cab bookings for a user between two dates
        if (!userId || !startDate || !endDate) return null; //if userId, startDate or endDate is undefined, then return null
        startDate = moment(startDate).format('YYYY-MM-DD');
        endDate = moment(endDate).format('YYYY-MM-DD');
        let bookings;
        try {
            bookings = await db.any(`SELECT public."CabBookings"."user_id",
            public."CabBookings"."pickup_date", public."CabBookings"."work_slot",
            public."Users"."first_name", public."Users"."last_name"
            FROM public."CabBookings"
            INNER JOIN public."Users" ON public."CabBookings"."user_id" = public."Users"."user_id"
            WHERE "pickup_date" BETWEEN $1 AND $2 AND public."CabBookings"."user_id" = $3
            ORDER BY "pickup_date";`, [startDate, endDate, userId]);
        } catch (error) {
            console.error(error);
        }
        try {
            bookings = await this.formatCabBookings(bookings);
        } catch (error) {
            console.error(error);
        }
        return bookings;
    }

    static async bookCab(userId, dates, workSlot) { //book cab function to book a cab using user id, dates and work slot for multiple dates by inserting them into cab bookings table
        if (!userId || !dates || !workSlot) return null; //if userId, dates or workSlot is undefined, then return null
        if (!Array.isArray(dates)) dates = [dates]; //if dates is not an array, then set dates to an array containing dates
        let bookingId;
        try {
            for (let i = 0; i < dates.length; i++) {
                bookingId = uuidv4(); //generate a random booking id
                await db.any('INSERT INTO public."CabBookings"("booking_id", "user_id", "pickup_date", "work_slot", date_of_booking) VALUES($1, $2, $3, $4, CURRENT_TIMESTAMP)', [bookingId, userId, dates[i], workSlot]);
            }
        } catch (error) {
            console.error(error);
        }
        return bookingId; //return last booking id
    }

    static async modifyCabBooking(userId, date, workSlot) { //function to modify a cab booking using booking id, user id, date and work slot
        if (!userId || !date || !workSlot) return null; //if bookingId, userId, date or workSlot is undefined, then return null
        try {
            await db.any('UPDATE public."CabBookings" SET "work_slot" = $1 WHERE "user_id" = $2 AND "pickup_date" = $3', [workSlot, userId, date]);
        } catch (error) {
            console.error(error);
        }
    }

    static async cancelCabBooking(userId, date) { //function to cancel a cab booking using booking id, user id and date
        if (!userId || !date) return null; //if bookingId, userId or date is undefined, then return null
        if (!Array.isArray(date)) date = [date]; //if date is not an array, then set date to an array containing date
        try {
            await db.any('DELETE FROM public."CabBookings" WHERE "user_id" = $1 AND "pickup_date" = $2', [userId, date[0]]);
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = CabBookings;