const logger = require('../logger/index');
const childLogger = logger.child({ module: 'create-jwt-token' });

let service = "";

function protectRoutes(req, res, next) {
    service = "protectRoutes";
    if (!req.userId) {
        childLogger.error("User not logged in", { service: service });
        return res.status(401).json({
            message: 'You are not logged in'
        });
    }

    if ((req.path.startsWith('/newsAdmin') && !req.isNewsAdmin) && (req.path.startsWith('/newsAdmin') && !req.isAdmin)) {
        childLogger.error("User not authorized to access news admin resource", { service: service, userId: req.userId });
        return res.status(403).json({
            message: 'You are not authorized to access news admin resource'
        });
    }

    if (req.path.startsWith('/admin') && !req.isAdmin) {
        childLogger.error("User not authorized to access admin resource", { service: service, userId: req.userId });
        return res.status(403).json({
            message: 'You are not authorized to access admin resource'
        });
    }

    next();
}

module.exports = protectRoutes;