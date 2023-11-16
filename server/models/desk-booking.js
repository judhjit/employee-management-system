const db = require('../data/database');
const { v4: uuidv4 } = require('uuid');
const dateFns = require('date-fns');

class DeskBookings {
    constructor(bookingId, deskId, userId, bookedForDate, dateOfBooking) {
        this.bookingId = bookingId;
        this.deskId = deskId;
        this.userId = userId;
        this.bookedForDate = bookedForDate;
        this.dateOfBooking = dateOfBooking;
    }

    static async formatDeskBoookings(deskBookings) {
        if (!deskBookings) return null; //if deskBookings is undefined, then return null
        if (!Array.isArray(deskBookings)) deskBookings = [deskBookings]; //if deskBookings is not an array, then set deskBookings to an array containing deskBookings
        deskBookings.forEach((booking) => {
            booking.name = `${booking.first_name} ${booking.last_name}`;
            booking.firstName = booking.first_name;
            booking.lastName = booking.last_name;
            booking.dateBooked = dateFns.format(new Date(booking.booked_for_date), 'yyyy-MM-dd');
            booking.deskId = booking.desk_id;
            booking.userId = booking.user_id;
            delete booking.last_name;
            delete booking.first_name;
            delete booking.booked_for_date;
            delete booking.desk_id;
            delete booking.user_id;
        });
        return deskBookings;
    }

    static async getDeskLayout() { //returns an object with desk id as key and an object containing deskNumber and bookedBy as values
        let desks = {
            dateBooked: [],
            A1: {
                deskId: 'A1',
                deskNumber: 1,
                bookedBy: null,
            },
            A2: {
                deskId: 'A2',
                deskNumber: 2,
                bookedBy: null,
            },
            A3: {
                deskId: 'A3',
                deskNumber: 3,
                bookedBy: null,
            },
            A4: {
                deskId: 'A4',
                deskNumber: 4,
                bookedBy: null,
            },
            A5: {
                deskId: 'A5',
                deskNumber: 5,
                bookedBy: null,
            },
            A6: {
                deskId: 'A6',
                deskNumber: 6,
                bookedBy: null,
            },
            A7: {
                deskId: 'A7',
                deskNumber: 7,
                bookedBy: null,
            },
            A8: {
                deskId: 'A8',
                deskNumber: 8,
                bookedBy: null,
            },
            A9: {
                deskId: 'A9',
                deskNumber: 9,
                bookedBy: null,
            },
            A10: {
                deskId: 'A10',
                deskNumber: 10,
                bookedBy: null,
            },
            B1: {
                deskId: 'B1',
                deskNumber: 11,
                bookedBy: null,
            },
            B2: {
                deskId: 'B2',
                deskNumber: 12,
                bookedBy: null,
            },
            B3: {
                deskId: 'B3',
                deskNumber: 13,
                bookedBy: null,
            },
            B4: {
                deskId: 'B4',
                deskNumber: 14,
                bookedBy: null,
            },
            B5: {
                deskId: 'B5',
                deskNumber: 15,
                bookedBy: null,
            },
            B6: {
                deskId: 'B6',
                deskNumber: 16,
                bookedBy: null,
            },
            B7: {
                deskId: 'B7',
                deskNumber: 17,
                bookedBy: null,
            },
            B8: {
                deskId: 'B8',
                deskNumber: 18,
                bookedBy: null,
            },
            B9: {
                deskId: 'B9',
                deskNumber: 19,
                bookedBy: null,
            },
            B10: {
                deskId: 'B10',
                deskNumber: 20,
                bookedBy: null,
            },
            C1: {
                deskId: 'C1',
                deskNumber: 21,
                bookedBy: null,
            },
            C2: {
                deskId: 'C2',
                deskNumber: 22,
                bookedBy: null,
            },
            C3: {
                deskId: 'C3',
                deskNumber: 23,
                bookedBy: null,
            },
            C4: {
                deskId: 'C4',
                deskNumber: 24,
                bookedBy: null,
            },
            C5: {
                deskId: 'C5',
                deskNumber: 25,
                bookedBy: null,
            },
            C6: {
                deskId: 'C6',
                deskNumber: 26,
                bookedBy: null,
            },
            C7: {
                deskId: 'C7',
                deskNumber: 27,
                bookedBy: null,
            },
            C8: {
                deskId: 'C8',
                deskNumber: 28,
                bookedBy: null,
            },
            C9: {
                deskId: 'C9',
                deskNumber: 29,
                bookedBy: null,
            },
            C10: {
                deskId: 'C10',
                deskNumber: 30,
                bookedBy: null,
            },
            D1: {
                deskId: 'D1',
                deskNumber: 31,
                bookedBy: null,
            },
            D2: {
                deskId: 'D2',
                deskNumber: 32,
                bookedBy: null,
            },
            D3: {
                deskId: 'D3',
                deskNumber: 33,
                bookedBy: null,
            },
            D4: {
                deskId: 'D4',
                deskNumber: 34,
                bookedBy: null,
            },
            D5: {
                deskId: 'D5',
                deskNumber: 35,
                bookedBy: null,
            },
            D6: {
                deskId: 'D6',
                deskNumber: 36,
                bookedBy: null,
            },
            D7: {
                deskId: 'D7',
                deskNumber: 37,
                bookedBy: null,
            },
            D8: {
                deskId: 'D8',
                deskNumber: 38,
                bookedBy: null,
            },
            D9: {
                deskId: 'D9',
                deskNumber: 39,
                bookedBy: null,
            },
            D10: {
                deskId: 'D10',
                deskNumber: 40,
                bookedBy: null,
            },
            E1: {
                deskId: 'E1',
                deskNumber: 41,
                bookedBy: null,
            },
            E2: {
                deskId: 'E2',
                deskNumber: 42,
                bookedBy: null,
            },
            E3: {
                deskId: 'E3',
                deskNumber: 43,
                bookedBy: null,
            },
            E4: {
                deskId: 'E4',
                deskNumber: 44,
                bookedBy: null,
            },
            E5: {
                deskId: 'E5',
                deskNumber: 45,
                bookedBy: null,
            },
            E6: {
                deskId: 'E6',
                deskNumber: 46,
                bookedBy: null,
            },
            E7: {
                deskId: 'E7',
                deskNumber: 47,
                bookedBy: null,
            },
            E8: {
                deskId: 'E8',
                deskNumber: 48,
                bookedBy: null,
            },
            E9: {
                deskId: 'E9',
                deskNumber: 49,
                bookedBy: null,
            },
            E10: {
                deskId: 'E10',
                deskNumber: 50,
                bookedBy: null,
            },
            F1: {
                deskId: 'F1',
                deskNumber: 51,
                bookedBy: null,
            },
            F2: {
                deskId: 'F2',
                deskNumber: 52,
                bookedBy: null,
            },
            F3: {
                deskId: 'F3',
                deskNumber: 53,
                bookedBy: null,
            },
            F4: {
                deskId: 'F4',
                deskNumber: 54,
                bookedBy: null,
            },
            F5: {
                deskId: 'F5',
                deskNumber: 55,
                bookedBy: null,
            },
            F6: {
                deskId: 'F6',
                deskNumber: 56,
                bookedBy: null,
            },
            F7: {
                deskId: 'F7',
                deskNumber: 57,
                bookedBy: null,
            },
            F8: {
                deskId: 'F8',
                deskNumber: 58,
                bookedBy: null,
            },
            F9: {
                deskId: 'F9',
                deskNumber: 59,
                bookedBy: null,
            },
            F10: {
                deskId: 'F10',
                deskNumber: 60,
                bookedBy: null,
            },
            G1: {
                deskId: 'G1',
                deskNumber: 61,
                bookedBy: null,
            },
            G2: {
                deskId: 'G2',
                deskNumber: 62,
                bookedBy: null,
            },
            G3: {
                deskId: 'G3',
                deskNumber: 63,
                bookedBy: null,
            },
            G4: {
                deskId: 'G4',
                deskNumber: 64,
                bookedBy: null,
            },
            G5: {
                deskId: 'G5',
                deskNumber: 65,
                bookedBy: null,
            },
            G6: {
                deskId: 'G6',
                deskNumber: 66,
                bookedBy: null,
            },
            G7: {
                deskId: 'G7',
                deskNumber: 67,
                bookedBy: null,
            },
            G8: {
                deskId: 'G8',
                deskNumber: 68,
                bookedBy: null,
            },
            G9: {
                deskId: 'G9',
                deskNumber: 69,
                bookedBy: null,
            },
            G10: {
                deskId: 'G10',
                deskNumber: 70,
                bookedBy: null,
            },
            H1: {
                deskId: 'H1',
                deskNumber: 71,
                bookedBy: null,
            },
            H2: {
                deskId: 'H2',
                deskNumber: 72,
                bookedBy: null,
            },
            H3: {
                deskId: 'H3',
                deskNumber: 73,
                bookedBy: null,
            },
            H4: {
                deskId: 'H4',
                deskNumber: 74,
                bookedBy: null,
            },
            H5: {
                deskId: 'H5',
                deskNumber: 75,
                bookedBy: null,
            },
            H6: {
                deskId: 'H6',
                deskNumber: 76,
                bookedBy: null,
            },
            H7: {
                deskId: 'H7',
                deskNumber: 77,
                bookedBy: null,
            },
            H8: {
                deskId: 'H8',
                deskNumber: 78,
                bookedBy: null,
            },
            H9: {
                deskId: 'H9',
                deskNumber: 79,
                bookedBy: null,
            },
            H10: {
                deskId: 'H10',
                deskNumber: 80,
                bookedBy: null,
            },
            I1: {
                deskId: 'I1',
                deskNumber: 81,
                bookedBy: null,
            },
            I2: {
                deskId: 'I2',
                deskNumber: 82,
                bookedBy: null,
            },
            I3: {
                deskId: 'I3',
                deskNumber: 83,
                bookedBy: null,
            },
            I4: {
                deskId: 'I4',
                deskNumber: 84,
                bookedBy: null,
            },
            I5: {
                deskId: 'I5',
                deskNumber: 85,
                bookedBy: null,
            },
            I6: {
                deskId: 'I6',
                deskNumber: 86,
                bookedBy: null,
            },
            I7: {
                deskId: 'I7',
                deskNumber: 87,
                bookedBy: null,
            },
            I8: {
                deskId: 'I8',
                deskNumber: 88,
                bookedBy: null,
            },
            I9: {
                deskId: 'I9',
                deskNumber: 89,
                bookedBy: null,
            },
            I10: {
                deskId: 'I10',
                deskNumber: 90,
                bookedBy: null,
            },
            J1: {
                deskId: 'J1',
                deskNumber: 91,
                bookedBy: null,
            },
            J2: {
                deskId: 'J2',
                deskNumber: 92,
                bookedBy: null,
            },
            J3: {
                deskId: 'J3',
                deskNumber: 93,
                bookedBy: null,
            },
            J4: {
                deskId: 'J4',
                deskNumber: 94,
                bookedBy: null,
            },
            J5: {
                deskId: 'J5',
                deskNumber: 95,
                bookedBy: null,
            },
            J6: {
                deskId: 'J6',
                deskNumber: 96,
                bookedBy: null,
            },
            J7: {
                deskId: 'J7',
                deskNumber: 97,
                bookedBy: null,
            },
            J8: {
                deskId: 'J8',
                deskNumber: 98,
                bookedBy: null,
            },
            J9: {
                deskId: 'J9',
                deskNumber: 99,
                bookedBy: null,
            },
            J10: {
                deskId: 'J10',
                deskNumber: 100,
                bookedBy: null,
            },
        }
        return desks;
    }

    static async getDesksAvailabilityByDate(date) { //uses desk layout to get availability of all desks by date
        if (!date) return null; //if date is undefined, then return null
        let desks, bookings;
        try {
            desks = await this.getDeskLayout();
            desks.dateBooked = [];
            desks.dateBooked.push(dateFns.format(new Date(date), 'yyyy-MM-dd'));
            bookings = await this.getDeskBookingsByDate(date);
        } catch (error) {
            console.error(error);
        }
        if (!bookings || bookings.length === 0) return desks;
        bookings.forEach((booking) => {
            desks[booking.deskId].bookedBy = booking.name;
        });
        return desks;
    }

    static async getFutureDeskBookings() { //returns an array of all future desk bookings
        let bookings;
        try {
            bookings = await db.any(`SELECT public."DeskBookings"."desk_id", public."DeskBookings"."user_id",
            public."DeskBookings"."booked_for_date", public."Users"."first_name", public."Users"."last_name"
            FROM public."DeskBookings"
            INNER JOIN public."Users" ON public."DeskBookings"."user_id" = public."Users"."user_id"
            WHERE "booked_for_date" >= CURRENT_DATE
            ORDER BY "booked_for_date";`);
        } catch (error) {
            console.error(error);
        }
        try {
            bookings = await this.formatDeskBoookings(bookings);
        } catch (error) {
            console.error(error);
        }
        return bookings;
    }

    static async getCountOfFutureDeskBookings() { //returns the count of all future desk bookings
        let count;
        try {
            count = await db.any(`SELECT COUNT(*) FROM public."DeskBookings" WHERE "booked_for_date" >= CURRENT_DATE`);
        } catch (error) {
            console.error(error);
        }
        if (!count || count.length === 0) return 0;
        return count[0].count;
    }

    static async getFutureDeskBookingsForUser(userId) { //returns an array of all future desk bookings for a user
        if (!userId) return null; //if userId is undefined, then return null
        let bookings;
        try {
            bookings = await db.any(`SELECT public."DeskBookings"."desk_id", public."DeskBookings"."user_id",
            public."DeskBookings"."booked_for_date", public."Users"."first_name", public."Users"."last_name"
            FROM public."DeskBookings"
            INNER JOIN public."Users" ON public."DeskBookings"."user_id" = public."Users"."user_id"
            ORDER BY "booked_for_date";`);
        } catch (error) {
            console.error(error);
        }
        try {
            bookings = await this.formatDeskBoookings(bookings);
        } catch (error) {
            console.error(error);
        }
        return bookings;
    }

    static async getCountOfFutureDeskBookingsForUser(userId) { //returns the count of all future desk bookings for a user
        if (!userId) return null; //if userId is undefined, then return null
        let count;
        try {
            count = await db.any(`SELECT COUNT(*) FROM public."DeskBookings" WHERE "user_id" = $1 AND "booked_for_date" >= CURRENT_DATE`, [userId]);
        } catch (error) {
            console.error(error);
        }
        if (!count || count.length === 0) return 0;
        return count[0].count;
    }

    static async getDeskBookingsByDate(date) { //returns an array of all desk bookings for a date
        if (!date) return null; //if date is undefined, then return null
        date = dateFns.format(new Date(date), 'yyyy-MM-dd');
        let bookings;
        try {
            bookings = await db.any(`SELECT public."DeskBookings"."desk_id", public."DeskBookings"."user_id",
            public."DeskBookings"."booked_for_date", public."Users"."first_name", public."Users"."last_name"
            FROM public."DeskBookings"
            INNER JOIN public."Users" ON public."DeskBookings"."user_id" = public."Users"."user_id"
            WHERE public."DeskBookings"."user_id" = $1
            ORDER BY "booked_for_date";`, [userId]);
        } catch (error) {
            console.error(error);
        }
        try {
            bookings = await this.formatDeskBoookings(bookings);
        } catch (error) {
            console.error(error);
        }
        return bookings;
    }

    static async getDeskBookingsForUserBetweenDates(userId, startDate, endDate) { //returns an array of all desk bookings for a user between two dates
        if (!userId || !startDate || !endDate) return null; //if userId, startDate or endDate is undefined, then return null
        startDate = dateFns.format(new Date(startDate), 'yyyy-MM-dd');
        endDate = dateFns.format(new Date(endDate), 'yyyy-MM-dd');
        let bookings;
        try {
            bookings = await db.any(`SELECT public."DeskBookings"."desk_id", public."DeskBookings"."user_id",
            public."DeskBookings"."booked_for_date", public."Users"."first_name", public."Users"."last_name"
            FROM public."DeskBookings"
            INNER JOIN public."Users" ON public."DeskBookings"."user_id" = public."Users"."user_id"
            WHERE public."DeskBookings"."user_id" = $1
            AND "booked_for_date" >= CURRENT_DATE
            ORDER BY "booked_for_date";`, [userId]);
        } catch (error) {
            console.error(error);
        }
        try {
            bookings = await this.formatDeskBoookings(bookings);
        } catch (error) {
            console.error(error);
        }
        return bookings;
    }

    static async getCountOfDeskBookingsForUserBetweenDates(userId, startDate, endDate) { //returns the count of all desk bookings for a user between two dates
        if (!userId || !startDate || !endDate) return null; //if userId, startDate or endDate is undefined, then return null
        startDate = dateFns.format(new Date(startDate), 'yyyy-MM-dd');
        endDate = dateFns.format(new Date(endDate), 'yyyy-MM-dd');
        let count;
        try {
            count = await db.any(`SELECT COUNT(*) FROM public."DeskBookings" WHERE "user_id" = $1 AND "booked_for_date" BETWEEN $2 AND $3`, [userId, startDate, endDate]);
        } catch (error) {
            console.error(error);
        }
        if (!count || count.length === 0) return 0;
        return count[0].count;
    }

    static async getDeskBookingsBetweenDates(startDate, endDate) { //returns an array of all desk bookings between two dates
        if (!startDate || !endDate) return null; //if startDate or endDate is undefined, then return null
        startDate = dateFns.format(new Date(startDate), 'yyyy-MM-dd');
        endDate = dateFns.format(new Date(endDate), 'yyyy-MM-dd');
        let bookings;
        try {
            bookings = await db.any(`SELECT public."DeskBookings"."desk_id", public."DeskBookings"."user_id",
            public."DeskBookings"."booked_for_date", public."Users"."first_name", public."Users"."last_name"
            FROM public."DeskBookings"
            INNER JOIN public."Users" ON public."DeskBookings"."user_id" = public."Users"."user_id"
            WHERE "booked_for_date" = $1
            ORDER BY "booked_for_date";`, [date]);
        } catch (error) {
            console.error(error);
        }
        try {
            bookings = await this.formatDeskBoookings(bookings);
        } catch (error) {
            console.error(error);
        }
        return bookings;
    }

    static async getDeskBookingsForDates(dates) { //returns an array of all desk bookings for multiple dates (array of dates)
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
                booking = await db.any(`SELECT public."DeskBookings"."desk_id", public."DeskBookings"."user_id",
                public."DeskBookings"."booked_for_date", public."Users"."first_name", public."Users"."last_name"
                FROM public."DeskBookings"
                INNER JOIN public."Users" ON public."DeskBookings"."user_id" = public."Users"."user_id"
                WHERE "booked_for_date" = $1
                ORDER BY "booked_for_date";`, [dates[i]]);
                if (!booking || booking.length === 0) continue;
                if (bookings) bookings = bookings.concat(booking);
                //concat is used instead of push because push adds the array booking as an element to bookings array, whereas concat adds the elements of booking array to bookings array
                else bookings = booking;
            }
        } catch (error) {
            console.error(error);
        }
        try {
            bookings = await this.formatDeskBoookings(bookings);
        } catch (error) {
            console.error(error);
        }
        return bookings;
    }

    static async getDeskBookingsForUserForDates(userId, dates) { //returns an array of all desk bookings for a user for multiple dates (array of dates)
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
                booking = await db.any(`SELECT public."DeskBookings"."desk_id", public."DeskBookings"."user_id",
                public."DeskBookings"."booked_for_date", public."Users"."first_name", public."Users"."last_name"
                FROM public."DeskBookings"
                INNER JOIN public."Users" ON public."DeskBookings"."user_id" = public."Users"."user_id"
                WHERE public."DeskBookings"."user_id" = $1
                AND "booked_for_date" = $2
                ORDER BY "booked_for_date";`, [userId, dates[i]]);
                if (!booking || booking.length === 0) continue;
                if (bookings) bookings = bookings.concat(booking);
                //concat is used instead of push because push adds the array booking as an element to bookings array, whereas concat adds the elements of booking array to bookings array
                else bookings = booking;
            }
        } catch (error) {
            console.error(error);
        }
        try {
            bookings = await this.formatDeskBoookings(bookings);
        } catch (error) {
            console.error(error);
        }
        return bookings;
    }

    static async getDeskBookingsBetweenDates(startDate, endDate) { //returns an array of all desk bookings between two dates
        if (!startDate || !endDate) return null; //if startDate or endDate is undefined, then return null
        startDate = moment(startDate).format('YYYY-MM-DD');
        endDate = moment(endDate).format('YYYY-MM-DD');
        let bookings;
        try {
            bookings = await db.any(`SELECT public."DeskBookings"."desk_id", public."DeskBookings"."user_id",
            public."DeskBookings"."booked_for_date", public."Users"."first_name", public."Users"."last_name"
            FROM public."DeskBookings"
            INNER JOIN public."Users" ON public."DeskBookings"."user_id" = public."Users"."user_id"
            WHERE "booked_for_date" BETWEEN $1 AND $2
            ORDER BY "booked_for_date";`, [startDate, endDate]);
        } catch (error) {
            console.error(error);
        }
        try {
            bookings = await this.formatDeskBoookings(bookings);
        } catch (error) {
            console.error(error);
        }
        return bookings;
    }

    static async getDeskBookingByDeskId(deskId) { //returns an array of all future desk bookings for a desk id
        if (!deskId) return null; //if bookingId is undefined, then return null
        let booking;
        try {
            //bookings should be in ascending order of booked_for_date
            booking = await db.any(`SELECT public."DeskBookings"."desk_id", public."DeskBookings"."user_id", public."DeskBookings"."booked_for_date", public."Users"."first_name", public."Users"."last_name"
            FROM public."DeskBookings"
            INNER JOIN public."Users" ON public."DeskBookings"."user_id" = public."Users"."user_id"
            WHERE "desk_id" = $1
            AND "booked_for_date" >= CURRENT_DATE
            ORDER BY "booked_for_date";`, [deskId]);
        } catch (error) {
            console.error(error);
        }
        if (!count || count.length === 0) return 0;
        return count[0].count;
    }

    static async getDeskBookingByDeskIdAndDates(deskId, dates) { //returns an array of all desk bookings for a desk id for the dates, used to check if desk is already booked for any of the dates in dates array
        if (!deskId || !dates) return null; //if deskId or dates is undefined, then return null
        if (!Array.isArray(dates)) dates = [dates]; //if dates is not an array, then set dates to an array containing dates
        let bookings;
        try {
            bookings = await db.any('SELECT * FROM public."DeskBookings" WHERE "desk_id" = $1 AND "booked_for_date" IN ($2)', [deskId, ...dates]);
        } catch (error) {
            console.error(error);
        }
        return bookings;
    }

    static async bookDesk(deskId, userId, dates) { //book desk function to book a desk using desk id and user id for multiple dates (array of dates) by inserting them into desk bookings table
        if (!deskId || !userId || !dates) return null; //if deskId, userId or dates is undefined, then return null
        if (!Array.isArray(dates)) dates = [dates]; //if dates is not an array, then set dates to an array containing dates
        let bookingId;
        try {
            for (let i = 0; i < dates.length; i++) {
                bookingId = uuidv4(); //generate a random booking id
                await db.any('INSERT INTO public."DeskBookings"("booking_id", "desk_id", "user_id", "booked_for_date", date_of_booking) VALUES($1, $2, $3, $4, CURRENT_TIMESTAMP)', [bookingId, deskId, userId, dates[i]]);
            }
        } catch (error) {
            console.error(error);
        }
        return bookingId; //return last booking id
    }

    static async cancelDeskBooking(userId, date) { //function to cancel a desk booking using user id and date
        if (!userId || !date) return null; //if deskId, userId or date is undefined, then return null
        if (!Array.isArray(date)) date = [date]; //if date is not an array, then set date to an array containing date
        try {
            await db.any('DELETE FROM public."DeskBookings" WHERE "user_id" = $1 AND "booked_for_date" = $2', [userId, date[0]]);
        } catch (error) {
            console.error(error);
        }
    }
}


module.exports = DeskBookings;