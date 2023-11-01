
function createUserSession(req, user, action) {
    // console.log("In createUserSession, user: ", user);
    req.session.userId = user.user_id;
    req.session.isAdmin = user.isAdmin;
    req.session.isNewsAdmin = user.isNewsAdmin;
    req.session.save(action); //executes action once the session is saved
    // console.log("In createUserSession, req.session: ", req.session);
}

function destroyUserAuthSession(req, user, action) {
    req.session.userId = null;
    req.session.isAdmin = null;
    req.session.isNewsAdmin = null;
    // req.session.destroy(action); //executes action once the session is destroyed
    // req.session.save(); //express does this automatically when we don't have any action to be performed
}

module.exports = {
    createUserSession: createUserSession,
    destroyUserAuthSession: destroyUserAuthSession,
}