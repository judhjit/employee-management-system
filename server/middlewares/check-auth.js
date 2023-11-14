const logger = require('../logger/index');
const childLogger = logger.child({ module: 'check-auth' });

let service = "";

function checkAuthStatus(req, res, next) {
    service = "checkAuthStatus";
    const userId = req.userId;
    if (!userId) { //user not logged in
        childLogger.error("User not logged in", { service: service });
        return res.status(401).json({
            message: 'You are not logged in'
        });
    }
    childLogger.info("User authenticated", { service: service, userId: userId });
    next(); //proceed to next middleware
}

module.exports = checkAuthStatus;