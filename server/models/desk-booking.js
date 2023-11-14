const db = require('../data/database');
const { v4: uuidv4 } = require('uuid');
const dateFns = require('date-fns');

const logger = require('../logger/index');
const childLogger = logger.child({ module: 'desk-booking' });

let service = "";

class DeskBookings {
    constructor(bookingId, deskId, userId, bookedForDate, dateOfBooking) {
        service = "DeskBookings constructor";
        this.bookingId = bookingId;
        this.deskId = deskId;
        this.userId = userId;
        this.bookedForDate = bookedForDate;
        this.dateOfBooking = dateOfBooking;
        childLogger.info("DeskBookings object created", { service: service });
    }

    static async formatDeskBoookings(deskBookings) {
        service = "formatDeskBoookings";
        if (!deskBookings) {
            childLogger.error("Desk bookings is undefined", { service: service });
            return null; //if deskBookings is undefined, then return null
        } 
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
        childLogger.info("Successfully formatted desk bookings", { service: service });
        return deskBookings;
    }

    static async getDeskLayout() { //returns an object with desk id as key and an object containing deskNumber and bookedBy as values
        service = "getDeskLayout";
        let desks = {
            dateBooked: [],
            A1: {
                deskId: 'A1',
                deskNumber: 1,
                bookedBy: [],
            },
            A2: {
                deskId: 'A2',
                deskNumber: 2,
                bookedBy: [],
            },
            A3: {
                deskId: 'A3',
                deskNumber: 3,
                bookedBy: [],
            },
            A4: {
                deskId: 'A4',
                deskNumber: 4,
                bookedBy: [],
            },
            A5: {
                deskId: 'A5',
                deskNumber: 5,
                bookedBy: [],
            },
            A6: {
                deskId: 'A6',
                deskNumber: 6,
                bookedBy: [],
            },
            A7: {
                deskId: 'A7',
                deskNumber: 7,
                bookedBy: [],
            },
            A8: {
                deskId: 'A8',
                deskNumber: 8,
                bookedBy: [],
            },
            A9: {
                deskId: 'A9',
                deskNumber: 9,
                bookedBy: [],
            },
            A10: {
                deskId: 'A10',
                deskNumber: 10,
                bookedBy: [],
            },
            B1: {
                deskId: 'B1',
                deskNumber: 11,
                bookedBy: [],
            },
            B2: {
                deskId: 'B2',
                deskNumber: 12,
                bookedBy: [],
            },
            B3: {
                deskId: 'B3',
                deskNumber: 13,
                bookedBy: [],
            },
            B4: {
                deskId: 'B4',
                deskNumber: 14,
                bookedBy: [],
            },
            B5: {
                deskId: 'B5',
                deskNumber: 15,
                bookedBy: [],
            },
            B6: {
                deskId: 'B6',
                deskNumber: 16,
                bookedBy: [],
            },
            B7: {
                deskId: 'B7',
                deskNumber: 17,
                bookedBy: [],
            },
            B8: {
                deskId: 'B8',
                deskNumber: 18,
                bookedBy: [],
            },
            B9: {
                deskId: 'B9',
                deskNumber: 19,
                bookedBy: [],
            },
            B10: {
                deskId: 'B10',
                deskNumber: 20,
                bookedBy: [],
            },
            C1: {
                deskId: 'C1',
                deskNumber: 21,
                bookedBy: [],
            },
            C2: {
                deskId: 'C2',
                deskNumber: 22,
                bookedBy: [],
            },
            C3: {
                deskId: 'C3',
                deskNumber: 23,
                bookedBy: [],
            },
            C4: {
                deskId: 'C4',
                deskNumber: 24,
                bookedBy: [],
            },
            C5: {
                deskId: 'C5',
                deskNumber: 25,
                bookedBy: [],
            },
            C6: {
                deskId: 'C6',
                deskNumber: 26,
                bookedBy: [],
            },
            C7: {
                deskId: 'C7',
                deskNumber: 27,
                bookedBy: [],
            },
            C8: {
                deskId: 'C8',
                deskNumber: 28,
                bookedBy: [],
            },
            C9: {
                deskId: 'C9',
                deskNumber: 29,
                bookedBy: [],
            },
            C10: {
                deskId: 'C10',
                deskNumber: 30,
                bookedBy: [],
            },
            D1: {
                deskId: 'D1',
                deskNumber: 31,
                bookedBy: [],
            },
            D2: {
                deskId: 'D2',
                deskNumber: 32,
                bookedBy: [],
            },
            D3: {
                deskId: 'D3',
                deskNumber: 33,
                bookedBy: [],
            },
            D4: {
                deskId: 'D4',
                deskNumber: 34,
                bookedBy: [],
            },
            D5: {
                deskId: 'D5',
                deskNumber: 35,
                bookedBy: [],
            },
            D6: {
                deskId: 'D6',
                deskNumber: 36,
                bookedBy: [],
            },
            D7: {
                deskId: 'D7',
                deskNumber: 37,
                bookedBy: [],
            },
            D8: {
                deskId: 'D8',
                deskNumber: 38,
                bookedBy: [],
            },
            D9: {
                deskId: 'D9',
                deskNumber: 39,
                bookedBy: [],
            },
            D10: {
                deskId: 'D10',
                deskNumber: 40,
                bookedBy: [],
            },
            E1: {
                deskId: 'E1',
                deskNumber: 41,
                bookedBy: [],
            },
            E2: {
                deskId: 'E2',
                deskNumber: 42,
                bookedBy: [],
            },
            E3: {
                deskId: 'E3',
                deskNumber: 43,
                bookedBy: [],
            },
            E4: {
                deskId: 'E4',
                deskNumber: 44,
                bookedBy: [],
            },
            E5: {
                deskId: 'E5',
                deskNumber: 45,
                bookedBy: [],
            },
            E6: {
                deskId: 'E6',
                deskNumber: 46,
                bookedBy: [],
            },
            E7: {
                deskId: 'E7',
                deskNumber: 47,
                bookedBy: [],
            },
            E8: {
                deskId: 'E8',
                deskNumber: 48,
                bookedBy: [],
            },
            E9: {
                deskId: 'E9',
                deskNumber: 49,
                bookedBy: [],
            },
            E10: {
                deskId: 'E10',
                deskNumber: 50,
                bookedBy: [],
            },
            F1: {
                deskId: 'F1',
                deskNumber: 51,
                bookedBy: [],
            },
            F2: {
                deskId: 'F2',
                deskNumber: 52,
                bookedBy: [],
            },
            F3: {
                deskId: 'F3',
                deskNumber: 53,
                bookedBy: [],
            },
            F4: {
                deskId: 'F4',
                deskNumber: 54,
                bookedBy: [],
            },
            F5: {
                deskId: 'F5',
                deskNumber: 55,
                bookedBy: [],
            },
            F6: {
                deskId: 'F6',
                deskNumber: 56,
                bookedBy: [],
            },
            F7: {
                deskId: 'F7',
                deskNumber: 57,
                bookedBy: [],
            },
            F8: {
                deskId: 'F8',
                deskNumber: 58,
                bookedBy: [],
            },
            F9: {
                deskId: 'F9',
                deskNumber: 59,
                bookedBy: [],
            },
            F10: {
                deskId: 'F10',
                deskNumber: 60,
                bookedBy: [],
            },
            G1: {
                deskId: 'G1',
                deskNumber: 61,
                bookedBy: [],
            },
            G2: {
                deskId: 'G2',
                deskNumber: 62,
                bookedBy: [],
            },
            G3: {
                deskId: 'G3',
                deskNumber: 63,
                bookedBy: [],
            },
            G4: {
                deskId: 'G4',
                deskNumber: 64,
                bookedBy: [],
            },
            G5: {
                deskId: 'G5',
                deskNumber: 65,
                bookedBy: [],
            },
            G6: {
                deskId: 'G6',
                deskNumber: 66,
                bookedBy: [],
            },
            G7: {
                deskId: 'G7',
                deskNumber: 67,
                bookedBy: [],
            },
            G8: {
                deskId: 'G8',
                deskNumber: 68,
                bookedBy: [],
            },
            G9: {
                deskId: 'G9',
                deskNumber: 69,
                bookedBy: [],
            },
            G10: {
                deskId: 'G10',
                deskNumber: 70,
                bookedBy: [],
            },
            H1: {
                deskId: 'H1',
                deskNumber: 71,
                bookedBy: [],
            },
            H2: {
                deskId: 'H2',
                deskNumber: 72,
                bookedBy: [],
            },
            H3: {
                deskId: 'H3',
                deskNumber: 73,
                bookedBy: [],
            },
            H4: {
                deskId: 'H4',
                deskNumber: 74,
                bookedBy: [],
            },
            H5: {
                deskId: 'H5',
                deskNumber: 75,
                bookedBy: [],
            },
            H6: {
                deskId: 'H6',
                deskNumber: 76,
                bookedBy: [],
            },
            H7: {
                deskId: 'H7',
                deskNumber: 77,
                bookedBy: [],
            },
            H8: {
                deskId: 'H8',
                deskNumber: 78,
                bookedBy: [],
            },
            H9: {
                deskId: 'H9',
                deskNumber: 79,
                bookedBy: [],
            },
            H10: {
                deskId: 'H10',
                deskNumber: 80,
                bookedBy: [],
            },
            I1: {
                deskId: 'I1',
                deskNumber: 81,
                bookedBy: [],
            },
            I2: {
                deskId: 'I2',
                deskNumber: 82,
                bookedBy: [],
            },
            I3: {
                deskId: 'I3',
                deskNumber: 83,
                bookedBy: [],
            },
            I4: {
                deskId: 'I4',
                deskNumber: 84,
                bookedBy: [],
            },
            I5: {
                deskId: 'I5',
                deskNumber: 85,
                bookedBy: [],
            },
            I6: {
                deskId: 'I6',
                deskNumber: 86,
                bookedBy: [],
            },
            I7: {
                deskId: 'I7',
                deskNumber: 87,
                bookedBy: [],
            },
            I8: {
                deskId: 'I8',
                deskNumber: 88,
                bookedBy: [],
            },
            I9: {
                deskId: 'I9',
                deskNumber: 89,
                bookedBy: [],
            },
            I10: {
                deskId: 'I10',
                deskNumber: 90,
                bookedBy: [],
            },
            J1: {
                deskId: 'J1',
                deskNumber: 91,
                bookedBy: [],
            },
            J2: {
                deskId: 'J2',
                deskNumber: 92,
                bookedBy: [],
            },
            J3: {
                deskId: 'J3',
                deskNumber: 93,
                bookedBy: [],
            },
            J4: {
                deskId: 'J4',
                deskNumber: 94,
                bookedBy: [],
            },
            J5: {
                deskId: 'J5',
                deskNumber: 95,
                bookedBy: [],
            },
            J6: {
                deskId: 'J6',
                deskNumber: 96,
                bookedBy: [],
            },
            J7: {
                deskId: 'J7',
                deskNumber: 97,
                bookedBy: [],
            },
            J8: {
                deskId: 'J8',
                deskNumber: 98,
                bookedBy: [],
            },
            J9: {
                deskId: 'J9',
                deskNumber: 99,
                bookedBy: [],
            },
            J10: {
                deskId: 'J10',
                deskNumber: 100,
                bookedBy: [],
            },
        }
        childLogger.info("Successfully returned desk layout", { service: service });
        return desks;
    }

    static async getDesksAvailabilityByDate(date) { //uses desk layout to get availability of all desks by date
        service = "getDesksAvailabilityByDate";
        if (!date) {
            childLogger.error("Date not provided", { service: service });
            return null; //if date is undefined, then return null
        }
        let desks, bookings;
        try {
            desks = await this.getDeskLayout();
            childLogger.info("Successfully got desk layout", { service: service });
            desks.dateBooked = [];
            desks.dateBooked.push(dateFns.format(new Date(date), 'yyyy-MM-dd'));
            bookings = await this.getDeskBookingsByDate(date);
            childLogger.info("Successfully got desk bookings for a particular date", { service: service, request: { date: date } });
        } catch (error) {
            childLogger.error("Failed to get desk bookings for a particular date", { service: service, request: { date: date }, error: error });
        }
        bookings.forEach((booking) => {
            desks[booking.deskId].bookedBy.push(booking.name);
        });
        //iterate over desks object and set bookedBy to null if bookedBy is empty
        for (const key in desks) {
            if (key == "dateBooked") continue;
            if (desks[key].bookedBy.length === 0) desks[key].bookedBy.push(null);
        }
        childLogger.info("Successfully returned availability of all desks for a particular date", { service: service, request: { date: date } });
        return desks;
    }

    static async getFutureDeskBookings() { //returns an array of all future desk bookings
        service = "getFutureDeskBookings";
        let bookings;
        try {
            bookings = await db.any(`SELECT public."DeskBookings"."desk_id", public."DeskBookings"."user_id",
            public."DeskBookings"."booked_for_date", public."Users"."first_name", public."Users"."last_name"
            FROM public."DeskBookings"
            INNER JOIN public."Users" ON public."DeskBookings"."user_id" = public."Users"."user_id"
            WHERE "booked_for_date" >= CURRENT_DATE
            ORDER BY "booked_for_date";`);
            childLogger.info("Successfully got all future desk bookings", { service: service });
        } catch (error) {
            childLogger.error("Failed to get all future desk bookings", { service: service, error: error });
        }
        try {
            bookings = await this.formatDeskBoookings(bookings);
            childLogger.info("Successfully formatted all future desk bookings", { service: service });
        } catch (error) {
            childLogger.error("Failed to format all future desk bookings", { service: service, error: error });
        }
        childLogger.info("Successfully returned all future desk bookings", { service: service });
        return bookings;
    }

    static async getCountOfFutureDeskBookings() { //returns the count of all future desk bookings
        service = "getCountOfFutureDeskBookings";
        let count;
        try {
            count = await db.any(`SELECT COUNT(*) FROM public."DeskBookings" WHERE "booked_for_date" >= CURRENT_DATE`);
            childLogger.info("Successfully got count of all future desk bookings", { service: service });
        } catch (error) {
            childLogger.error("Failed to get count of all future desk bookings", { service: service, error: error });
        }
        if (!count || count.length === 0) {
            childLogger.info("Count of all future desk bookings is 0", { service: service });
            return 0;
        }
        childLogger.info("Successfully returned count of all future desk bookings", { service: service });
        return count[0].count;
    }

    static async getFutureDeskBookingsForUser(userId) { //returns an array of all future desk bookings for a user
        service = "getFutureDeskBookingsForUser";
        if (!userId) {
            childLogger.error("User id not provided", { service: service });
            return null; //if userId is undefined, then return null
        }
        let bookings;
        try {
            bookings = await db.any(`SELECT public."DeskBookings"."desk_id", public."DeskBookings"."user_id",
            public."DeskBookings"."booked_for_date", public."Users"."first_name", public."Users"."last_name"
            FROM public."DeskBookings"
            INNER JOIN public."Users" ON public."DeskBookings"."user_id" = public."Users"."user_id"
            WHERE public."DeskBookings"."user_id" = $1
            AND "booked_for_date" >= CURRENT_DATE
            ORDER BY "booked_for_date";`, [userId]);
            childLogger.info("Successfully got all future desk bookings for a user", { service: service, userId: userId });
        } catch (error) {
            childLogger.error("Failed to get all future desk bookings for a user", { service: service, userId: userId, error: error });
        }
        try {
            bookings = await this.formatDeskBoookings(bookings);
            childLogger.info("Successfully formatted all future desk bookings for a user", { service: service, userId: userId });
        } catch (error) {
            childLogger.error("Failed to format all future desk bookings for a user", { service: service, userId: userId, error: error });
        }
        childLogger.info("Successfully returned all future desk bookings for a user", { service: service, userId: userId });
        return bookings;
    }

    static async getCountOfFutureDeskBookingsForUser(userId) { //returns the count of all future desk bookings for a user
        service = "getCountOfFutureDeskBookingsForUser";
        if (!userId) {
            childLogger.error("User id not provided", { service: service });
            return null; //if userId is undefined, then return null
        }
        let count;
        try {
            count = await db.any(`SELECT COUNT(*) FROM public."DeskBookings" WHERE "user_id" = $1 AND "booked_for_date" >= CURRENT_DATE`, [userId]);
            childLogger.info("Successfully got count of all future desk bookings for a user", { service: service, userId: userId });
        } catch (error) {
            childLogger.error("Failed to get count of all future desk bookings for a user", { service: service, userId: userId, error: error });
        }
        if (!count || count.length === 0) {
            childLogger.info("Count of all future desk bookings for a user is 0", { service: service, userId: userId });
        }
        childLogger.info("Successfully returned count of all future desk bookings for a user", { service: service, userId: userId });
        return count[0].count;
    }

    static async getDeskBookingsByDate(date) { //returns an array of all desk bookings for a date
        service = "getDeskBookingsByDate";
        if (!date) {
            childLogger.error("Date not provided", { service: service });
            return null; //if date is undefined, then return null
        }
        date = dateFns.format(new Date(date), 'yyyy-MM-dd');
        let bookings;
        try {
            bookings = await db.any(`SELECT public."DeskBookings"."desk_id", public."DeskBookings"."user_id",
            public."DeskBookings"."booked_for_date", public."Users"."first_name", public."Users"."last_name"
            FROM public."DeskBookings"
            INNER JOIN public."Users" ON public."DeskBookings"."user_id" = public."Users"."user_id"
            WHERE "booked_for_date" = $1
            ORDER BY "booked_for_date";`, [date]);
            childLogger.info("Successfully got all desk bookings for a particular date", { service: service, request: { date: date } });
        } catch (error) {
            childLogger.error("Failed to get all desk bookings for a particular date", { service: service, request: { date: date }, error: error });
        }
        try {
            bookings = await this.formatDeskBoookings(bookings);
            childLogger.info("Successfully formatted all desk bookings for a particular date", { service: service, request: { date: date } });
        } catch (error) {
            childLogger.error("Failed to format all desk bookings for a particular date", { service: service, request: { date: date }, error: error });
        }
        childLogger.info("Successfully returned all desk bookings for a particular date", { service: service, request: { date: date } });
        return bookings;
    }

    static async getDeskBookingsForDates(dates) { //returns an array of all desk bookings for multiple dates (array of dates)
        service = "getDeskBookingsForDates";
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
            childLogger.info("Successfully got all desk bookings for multiple dates", { service: service, request: { dates: dates }  });
        } catch (error) {
            childLogger.error("Failed to get all desk bookings for multiple dates", { service: service, request: { dates: dates }, error: error });
        }
        try {
            bookings = await this.formatDeskBoookings(bookings);
            childLogger.info("Successfully formatted all desk bookings for multiple dates", { service: service, request: { dates: dates } });
        } catch (error) {
            childLogger.error("Failed to format all desk bookings for multiple dates", { service: service, request: { dates: dates }, error: error });
        }
        childLogger.info("Successfully returned all desk bookings for multiple dates", { service: service, request: { dates: dates } });
        return bookings;
    }

    static async getDeskBookingsForUserForDates(userId, dates) { //returns an array of all desk bookings for a user for multiple dates (array of dates)
        service = "getDeskBookingsForUserForDates";
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
            childLogger.info("Successfully got all desk bookings for a user for multiple dates", { service: service, userId: userId, request: { dates: dates } });
        } catch (error) {
            childLogger.error("Failed to get all desk bookings for a user for multiple dates", { service: service, userId: userId, request: { dates: dates }, error: error });
        }
        try {
            bookings = await this.formatDeskBoookings(bookings);
            childLogger.info("Successfully formatted all desk bookings for a user for multiple dates", { service: service, userId: userId, request: { dates: dates } });
        } catch (error) {
            childLogger.error("Failed to format all desk bookings for a user for multiple dates", { service: service, userId: userId, request: { dates: dates }, error: error });
        }
        childLogger.info("Successfully returned all desk bookings for a user for multiple dates", { service: service, userId: userId, request: { dates: dates } });
        return bookings;
    }

    static async getDeskBookingsForUserBetweenDates(userId, startDate, endDate) { //returns an array of all desk bookings for a user between two dates
        service = "getDeskBookingsForUserBetweenDates";
        if (!userId || !startDate || !endDate) {
            childLogger.error("User id, start date or end date not provided", { service: service });
            return null; //if userId, startDate or endDate is undefined, then return null
        }
        startDate = dateFns.format(new Date(startDate), 'yyyy-MM-dd');
        endDate = dateFns.format(new Date(endDate), 'yyyy-MM-dd');
        let bookings;
        try {
            bookings = await db.any(`SELECT public."DeskBookings"."desk_id", public."DeskBookings"."user_id",
            public."DeskBookings"."booked_for_date", public."Users"."first_name", public."Users"."last_name"
            FROM public."DeskBookings"
            INNER JOIN public."Users" ON public."DeskBookings"."user_id" = public."Users"."user_id"
            WHERE public."DeskBookings"."user_id" = $1
            AND "booked_for_date" BETWEEN $2 AND $3
            ORDER BY "booked_for_date";`, [userId, startDate, endDate]);
            childLogger.info("Successfully got all desk bookings for a user between two dates", { service: service, userId: userId, request: { startDate: startDate, endDate: endDate } });
        } catch (error) {
            childLogger.error("Failed to get all desk bookings for a user between two dates", { service: service, userId: userId, request: { startDate: startDate, endDate: endDate }, error: error });
        }
        try {
            bookings = await this.formatDeskBoookings(bookings);
            childLogger.info("Successfully formatted all desk bookings for a user between two dates", { service: service, userId: userId, request: { startDate: startDate, endDate: endDate } });
        } catch (error) {
            childLogger.error("Failed to format all desk bookings for a user between two dates", { service: service, userId: userId, request: { startDate: startDate, endDate: endDate }, error: error });
        }
        childLogger.info("Successfully returned all desk bookings for a user between two dates", { service: service, userId: userId, request: { startDate: startDate, endDate: endDate } });
        return bookings;
    }

    static async getCountOfDeskBookingsForUserBetweenDates(userId, startDate, endDate) { //returns the count of all desk bookings for a user between two dates
        service = "getCountOfDeskBookingsForUserBetweenDates";
        if (!userId || !startDate || !endDate) {
            childLogger.error("User id, start date or end date not provided", { service: service });
            return null; //if userId, startDate or endDate is undefined, then return null
        }
        startDate = dateFns.format(new Date(startDate), 'yyyy-MM-dd');
        endDate = dateFns.format(new Date(endDate), 'yyyy-MM-dd');
        let count;
        try {
            count = await db.any(`SELECT COUNT(*) FROM public."DeskBookings" WHERE "user_id" = $1 AND "booked_for_date" BETWEEN $2 AND $3`, [userId, startDate, endDate]);
            childLogger.info("Successfully got count of all desk bookings for a user between two dates", { service: service, userId: userId, request: { startDate: startDate, endDate: endDate } });
        } catch (error) {
            childLogger.error("Failed to get count of all desk bookings for a user between two dates", { service: service, userId: userId, request: { startDate: startDate, endDate: endDate }, error: error });
        }
        if (!count || count.length === 0) {
            childLogger.info("Count of all desk bookings for a user between two dates is 0", { service: service, userId: userId, request: { startDate: startDate, endDate: endDate } });
            return 0;
        }
        childLogger.info("Successfully returned count of all desk bookings for a user between two dates", { service: service, userId: userId, request: { startDate: startDate, endDate: endDate } });
        return count[0].count;
    }

    static async getDeskBookingsBetweenDates(startDate, endDate) { //returns an array of all desk bookings between two dates
        service = "getDeskBookingsBetweenDates";
        if (!startDate || !endDate) {
            childLogger.error("Start date or end date not provided", { service: service });
            return null; //if startDate or endDate is undefined, then return null
        }
        startDate = dateFns.format(new Date(startDate), 'yyyy-MM-dd');
        endDate = dateFns.format(new Date(endDate), 'yyyy-MM-dd');
        let bookings;
        try {
            bookings = await db.any(`SELECT public."DeskBookings"."desk_id", public."DeskBookings"."user_id",
            public."DeskBookings"."booked_for_date", public."Users"."first_name", public."Users"."last_name"
            FROM public."DeskBookings"
            INNER JOIN public."Users" ON public."DeskBookings"."user_id" = public."Users"."user_id"
            WHERE "booked_for_date" BETWEEN $1 AND $2
            ORDER BY "booked_for_date";`, [startDate, endDate]);
            childLogger.info("Successfully got all desk bookings between two dates", { service: service, request: { startDate: startDate, endDate: endDate } });

        } catch (error) {
            childLogger.error("Failed to get all desk bookings between two dates", { service: service, request: { startDate: startDate, endDate: endDate }, error: error });
        }
        try {
            bookings = await this.formatDeskBoookings(bookings);
            childLogger.info("Successfully formatted all desk bookings between two dates", { service: service, request: { startDate: startDate, endDate: endDate } });
        } catch (error) {
            childLogger.error("Failed to format all desk bookings between two dates", { service: service, request: { startDate: startDate, endDate: endDate }, error: error });
        }
        childLogger.info("Successfully returned all desk bookings between two dates", { service: service, request: { startDate: startDate, endDate: endDate } });
        return bookings;
    }

    static async getCountOfDeskBookingsBetweenDates(startDate, endDate) { //returns the count of all desk bookings between two dates
        service = "getCountOfDeskBookingsBetweenDates";
        if (!startDate || !endDate) {
            childLogger.error("Start date or end date not provided", { service: service });
            return null; //if startDate or endDate is undefined, then return null
        }
        startDate = dateFns.format(new Date(startDate), 'yyyy-MM-dd');
        endDate = dateFns.format(new Date(endDate), 'yyyy-MM-dd');
        let count;
        try {
            count = await db.any(`SELECT COUNT(*) FROM public."DeskBookings" WHERE "booked_for_date" BETWEEN $1 AND $2`, [startDate, endDate]);
            childLogger.info("Successfully got count of all desk bookings between two dates", { service: service, request: { startDate: startDate, endDate: endDate } });
        } catch (error) {
            childLogger.error("Failed to get count of all desk bookings between two dates", { service: service, request: { startDate: startDate, endDate: endDate }, error: error });
        }
        if (!count || count.length === 0) {
            childLogger.info("Count of all desk bookings between two dates is 0", { service: service, request: { startDate: startDate, endDate: endDate } });
            return 0;
        }
        childLogger.info("Successfully returned count of all desk bookings between two dates", { service: service, request: { startDate: startDate, endDate: endDate } });
        return count[0].count;
    }

    static async getDeskBookingByDeskIdAndDates(deskId, dates) { //returns an array of all desk bookings for a desk id for the dates, used to check if desk is already booked for any of the dates in dates array
        service = "getDeskBookingByDeskIdAndDates";
        if (!deskId || !dates) {
            childLogger.error("Desk id or dates not provided", { service: service });
            return null; //if deskId or dates is undefined, then return null
        }
        if (!Array.isArray(dates)) dates = [dates]; //if dates is not an array, then set dates to an array containing dates
        let bookings;
        try {
            bookings = await db.any('SELECT * FROM public."DeskBookings" WHERE "desk_id" = $1 AND "booked_for_date" IN ($2)', [deskId, ...dates]);
            childLogger.info("Successfully got all desk bookings for a desk id for the dates", { service: service, request: { deskId: deskId, dates: dates } });
        } catch (error) {
            childLogger.error("Failed to get all desk bookings for a desk id for the dates", { service: service, request: { deskId: deskId, dates: dates }, error: error });
        }
        childLogger.info("Successfully returned all desk bookings for a desk id for the dates", { service: service, request: { deskId: deskId, dates: dates } });
        return bookings;
    }

    static async bookDesk(deskId, userId, dates) { //book desk function to book a desk using desk id and user id for multiple dates (array of dates) by inserting them into desk bookings table
        service = "bookDesk";
        if (!deskId || !userId || !dates) {
            childLogger.error("Desk id, user id or dates not provided", { service: service });
            return null; //if deskId, userId or dates is undefined, then return null
        }
        if (!Array.isArray(dates)) dates = [dates]; //if dates is not an array, then set dates to an array containing dates
        let bookingId;
        try {
            for (let i = 0; i < dates.length; i++) {
                bookingId = uuidv4(); //generate a random booking id
                await db.any('INSERT INTO public."DeskBookings"("booking_id", "desk_id", "user_id", "booked_for_date", date_of_booking) VALUES($1, $2, $3, $4, CURRENT_TIMESTAMP)', [bookingId, deskId, userId, dates[i]]);
            }
            childLogger.info("Successfully booked a desk", { service: service, userId: userId, request: { deskId: deskId, dates: dates } });
        } catch (error) {
            childLogger.error("Failed to book a desk", { service: service, userId: userId, request: { deskId: deskId, dates: dates },  error: error });
        }
        childLogger.info("Successfully returned booking id", { service: service, bookingId: bookingId });
        return bookingId; //return last booking id
    }

    static async cancelDeskBooking(userId, date) { //function to cancel a desk booking using user id and date
        service = "cancelDeskBooking";
        if (!userId || !date) {
            childLogger.error("User id or date not provided", { service: service });
            return null; //if userId or date is undefined, then return null
        }
        if (!Array.isArray(date)) date = [date]; //if date is not an array, then set date to an array containing date
        try {
            await db.any('DELETE FROM public."DeskBookings" WHERE "user_id" = $1 AND "booked_for_date" = $2', [userId, date[0]]);
            childLogger.info("Successfully cancelled a desk booking", { service: service, userId: userId, request: { date: date } });
        } catch (error) {
            childLogger.error("Failed to cancel a desk booking", { service: service, userId: userId, request: { date: date }, error: error });
        }
    }
}


module.exports = DeskBookings;