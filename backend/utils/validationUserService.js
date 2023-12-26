const {ValidationException} = require('./exceptions');
const User = require('../models/user');
const {handleResponseSync} = require('./responseHelper')

function checkForNullOrEmpty(...items) {
    const errors = [];
    items.forEach((item) => {
        if (item === undefined || item === null || item === '') {
            throw new ValidationException('value is null or empty', 403);
        }
    });
    return errors;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

function isValidZip (zip) {
    const zipRegex = /^\d{5}(?:-\d{4})?$/;
    return zipRegex.test(zip);
};

async function validateUserAcc(req, res, next) {
    handleResponseSync(() => {
        const { email, password } = req.body;
        checkForNullOrEmpty(email, password);
        res.locals.email = email;
        res.locals.password = password;
    }, next);

}

function validateUser(req, res, next) {
    handleResponseSync(() => {
        const userData = req.body;
        validateUserData(userData);
        const user = new User(userData);
        if(req.session.user) { //if user has session, add an email to user and send it to the next middlware function
            user.email = req.session.user.email;
        }
        res.locals.user = user;
    }, next);
}

function validateUserData(user){
    checkForNullOrEmpty(...Object.values(user));
    if (!isValidEmail(user.email)) {
        throw new ValidationException('Invalid email format', 403);
    }
    if(!isValidZip(user.zip)) {
        throw new ValidationException('Invalid zip format', 403);
    }
}


//TODO: implement checkIfUserExists function
async function checkIfUserAlreadyExist(req,res,next) {
    next();
}

module.exports = {
    validateUser,
    validateUserAcc,
    checkIfUserAlreadyExist
}