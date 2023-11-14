
function protectRoutes(req, res, next) {
    if (!req.userId) {
        return res.status(401).json({
            message: 'You are not logged in'
        });
    }

    if ((req.path.startsWith('/newsAdmin') && !req.isNewsAdmin) && (req.path.startsWith('/newsAdmin') && !req.isAdmin)) {
        return res.status(403).json({
            message: 'You are not authorized to access news admin resource'
        });
    }

    if (req.path.startsWith('/admin') && !req.isAdmin) {
        return res.status(403).json({
            message: 'You are not authorized to access admin resource'
        });
    }


    next();
}

module.exports = protectRoutes;