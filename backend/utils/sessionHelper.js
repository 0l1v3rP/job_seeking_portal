function destroySession(req, res, next) { 
    req.session = null;
    res.clearCookie('connect.sid');
    if(next) next();
}

//function used to save mail of signed in user before session is destroyed so the mail can be used in next function
async function saveSessionMail(req, res, next) {
    res.locals.email = req.session.email; 
    next();
}

module.exports = {
    destroySession,
    saveSessionMail
}
