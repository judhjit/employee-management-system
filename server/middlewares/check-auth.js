
function checkAuthStatus(req, res, next) {
    const userId = req.userId;
    if (!userId) { //user not logged in
        return res.status(401).json({
            message: 'You are not logged in'
        });
    }
    next(); //proceed to next middleware
}

module.exports = checkAuthStatus;