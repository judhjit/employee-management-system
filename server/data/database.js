let pgp = require('pg-promise')();
const dotenv = require('dotenv');
dotenv.config("../.env");

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const db = pgp({
    host: PGHOST,
    database: PGDATABASE,
    username: PGUSER,
    password: PGPASSWORD,
    port: 5432,
    ssl: true,
    // connection: {
    //     options: `project=${ENDPOINT_ID}`,
    // },
});

module.exports = db;