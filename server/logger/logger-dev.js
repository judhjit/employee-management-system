const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;
const { Console } = transports;

const myFormat = printf(({ level, message, timestamp, module, service, userId }) => {
    if(!module && !service && !userId) return `${timestamp} - [${level}] - ${message}`;
    return `${timestamp} - [${level}] - ${module} - ${service} - ${userId} - ${message}`;
});

const devLogger = () => {
    return createLogger({
        level: 'info',
        format: combine(
            colorize(),
            timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
            myFormat
        ),
        transports: [
            new Console()
        ]
    });
}


module.exports = devLogger;