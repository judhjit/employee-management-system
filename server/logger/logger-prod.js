const { createLogger, format, transports } = require('winston');
const { combine, timestamp, json, prettyPrint } = format;
// const { Console } = transports;
require('winston-daily-rotate-file');

const fileRotateTransport = new transports.DailyRotateFile({
    filename: 'logs/combined/combined-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d',
});

const errorFileRotateTransport = new transports.DailyRotateFile({
    filename: 'logs/error/error-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d',
    level: 'error',
});

const prodLogger = () => {
    return createLogger({
        level: 'info',
        format: combine(
            timestamp(),
            json(),
            prettyPrint(),
        ),
        transports: [
            // new Console(),
            fileRotateTransport,
            errorFileRotateTransport,
        ]
    });
}

module.exports = prodLogger;