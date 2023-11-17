const logger = require('../logger/index');
const childLogger = logger.child({ module: 'error-handler' });

let service = "";

function handleErrors(error, req, res, next) { //something went wrong on the server and we are not able to recover from it
    service = "handleErrors";
    childLogger.error("Something went wrong on the server", { service: service, error: error });
    if (error.code === 404) {
        childLogger.error("Not Found", { service: service });
        return res.status(404).json({ message: 'Not Found' });
    }
    childLogger.error("Internal Server Error", { service: service });
    return res.status(500).json({ message: 'Internal Server Error' });
}

module.exports = handleErrors;