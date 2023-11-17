const devLogger = require('./logger-dev');
const prodLogger = require('./logger-prod');

let logger = null;

if(process.env.NODE_ENV === 'production') {
    logger = prodLogger();
}

if(process.env.NODE_ENV === 'development') {
    logger = devLogger();
}

module.exports = logger;