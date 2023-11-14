const db = require('../data/database');
const { v4: uuidv4 } = require('uuid');
const dateFns = require('date-fns');

class FoodBookings {

    constructor(bookingId, userId, bookedForDate, preference, dateOfBooking) {
        this.bookingId = bookingId;
        this.userId = userId;
        this.bookedForDate = bookedForDate;
        this.preference = preference;
        this.dateOfBooking = dateOfBooking;
    }

    static async formatFoodBookings(foodBookings) {
        if (!foodBookings) return null; //if foodBookings is undefined, then return null
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
        return foodBookings;
    }

    static async getAllFutureFoodBookings() {
        let bookings;
        try {
            bookings = await db.any(`SELECT public."FoodBookings"."user_id",
            public."FoodBookings"."delivery_date", public."FoodBookings"."preference",
            public."Users"."first_name", public."Users"."last_name"
            FROM public."FoodBookings"
            INNER JOIN public."Users" ON public."FoodBookings"."user_id" = public."Users"."user_id"
            WHERE public."FoodBookings"."delivery_date" >= CURRENT_DATE
            ORDER BY public."FoodBookings"."delivery_date";`);
        } catch (error) {
            console.error(error);
        }
        try {
            bookings = await this.formatFoodBookings(bookings);
        } catch (error) {
            console.error(error);
        }
        return bookings;
    }

    static async getCountOfFutureFoodBookings() {
        let count;
        try {
            count = await db.any(`SELECT COUNT(*) FROM public."FoodBookings" WHERE "delivery_date" >= CURRENT_DATE`);
        } catch (error) {
            console.error(error);
        }
        return count[0].count;
    }

    static async getFutureFoodBookingsForUser(userId) {
        if (!userId) return null; //if userId is undefined, then return null
        let bookings;
        try {
            bookings = await db.any(`SELECT public."FoodBookings"."user_id",
            public."FoodBookings"."delivery_date", public."FoodBookings"."preference",
            public."Users"."first_name", public."Users"."last_name"
            FROM public."FoodBookings"
            INNER JOIN public."Users" ON public."FoodBookings"."user_id" = public."Users"."user_id"
            WHERE public."FoodBookings"."user_id" = $1 AND public."FoodBookings"."delivery_date" >= CURRENT_DATE
            ORDER BY public."FoodBookings"."delivery_date";`, [userId]);
        } catch (error) {
            console.error(error);
        }
        try {
            bookings = await this.formatFoodBookings(bookings);
        } catch (error) {
            console.error(error);
        }
        return bookings;
    }

    static async getCountOfFutureFoodBookingsForUser(userId) {
        if (!userId) return null; //if userId is undefined, then return null
        let count;
        try {
            count = await db.any(`SELECT COUNT(*) FROM public."FoodBookings" WHERE "user_id" = $1 AND "delivery_date" >= CURRENT_DATE`, [userId]);
        } catch (error) {
            console.error(error);
        }
        return count[0].count;
    }

    static async getFoodBookingsForDates(dates) { //returns an array of all food bookings for multiple dates (array of dates)
        if (!dates) return null; //if dates is undefined, then return null
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
        } catch (error) {
            console.error(error);
        }
        try {
            bookings = await this.formatFoodBookings(bookings);
        } catch (error) {
            console.error(error);
        }
        return bookings;
    }

    static async getFoodBookingsBetweenDates(startDate, endDate) { //returns an array of all food bookings between two dates
        if (!startDate || !endDate) return null; //if startDate or endDate is undefined, then return null
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
        } catch (error) {
            console.error(error);
        }
        try {
            bookings = await this.formatFoodBookings(bookings);
        } catch (error) {
            console.error(error);
        }
        return bookings;
    }

    static async getCountOfFoodBookingsBetweenDates(startDate, endDate) { //returns an array of all food bookings between two dates
        if (!startDate || !endDate) return null; //if startDate or endDate is undefined, then return null
        startDate = dateFns.format(new Date(startDate), 'yyyy-MM-dd');
        endDate = dateFns.format(new Date(endDate), 'yyyy-MM-dd');
        let count;
        try {
            count = await db.any(`SELECT COUNT(*) FROM public."FoodBookings" WHERE "delivery_date" BETWEEN $1 AND $2`, [startDate, endDate]);
        } catch (error) {
            console.error(error);
        }
        if(!count || count.length === 0) return 0;
        return count[0].count;
    }

    static async getFoodBookingsForUserForDates(userId, dates) { //returns an array of all food bookings for a user for multiple dates (array of dates)
        if (!userId || !dates) return null; //if userId or dates is undefined, then return null
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
        } catch (error) {
            console.error(error);
        }
        try {
            bookings = await this.formatFoodBookings(bookings);
        } catch (error) {
            console.error(error);
        }
        return bookings;
    }

    static async getFoodBookingsForUserBetweenDates(userId, startDate, endDate) { //returns an array of all food bookings for a user between two dates
        if (!userId || !startDate || !endDate) return null; //if userId, startDate or endDate is undefined, then return null
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
        } catch (error) {
            console.error(error);
        }
        try {
            bookings = await this.formatFoodBookings(bookings);
        } catch (error) {
            console.error(error);
        }
        return bookings;
    }

    static async getCountOfFoodBookingsForUserBetweenDates(userId, startDate, endDate) { //returns an array of all food bookings for a user between two dates
        if (!userId || !startDate || !endDate) return null; //if userId, startDate or endDate is undefined, then return null
        startDate = dateFns.format(new Date(startDate), 'yyyy-MM-dd');
        endDate = dateFns.format(new Date(endDate), 'yyyy-MM-dd');
        let count;
        try {
            count = await db.any(`SELECT COUNT(*) FROM public."FoodBookings" WHERE "delivery_date" BETWEEN $1 AND $2 AND "user_id" = $3`, [startDate, endDate, userId]);
        } catch (error) {
            console.error(error);
        }
        if(!count || count.length === 0) return 0;
        return count[0].count;
    }

    static async bookFood(userId, dates, preference) { //book food function to book food using user id, dates and preference for multiple dates by inserting them into food bookings table
        if (!userId || !dates || !preference) return null; //if userId, dates or preference is undefined, then return null
        if (!Array.isArray(dates)) dates = [dates]; //if dates is not an array, then set dates to an array containing dates
        let bookingId;
        try {
            for (let i = 0; i < dates.length; i++) {
                bookingId = uuidv4(); //generate a random booking id
                await db.any('INSERT INTO public."FoodBookings"("booking_id", "user_id", "delivery_date", "preference", date_of_booking) VALUES($1, $2, $3, $4, CURRENT_TIMESTAMP)', [bookingId, userId, dates[i], preference]);
            }
        } catch (error) {
            console.error(error);
        }
        return bookingId; //return last booking id
    }

    static async modifyFoodBooking(userId, date, preference) { //function to modify a food booking using booking id, user id, date and preference
        if (!userId || !date || !preference) return null; //if bookingId, userId, date or preference is undefined, then return null
        try {
            await db.any('UPDATE public."FoodBookings" SET "preference" = $1 WHERE "user_id" = $2 AND "delivery_date" = $3', [preference, userId, date]);
        } catch (error) {
            console.error(error);
        }
    }

    static async cancelFoodBooking(userId, date) { //function to cancel a food booking using booking id, user id and date
        if (!userId || !date) return null; //if bookingId, userId or date is undefined, then return null
        if (!Array.isArray(date)) date = [date]; //if date is not an array, then set date to an array containing date
        try {
            await db.any('DELETE FROM public."FoodBookings" WHERE "user_id" = $1 AND "delivery_date" = $2', [userId, date[0]]);
        } catch (error) {
            console.error(error);
        }
    }

}

module.exports = FoodBookings;


