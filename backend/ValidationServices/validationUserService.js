const {ValidationException} = require('../utils/exceptions');
const User = require('../models/user');
const {handleResponseSync, handleResponseAsync} = require('../utils/responseHelper');
const {checkForNullOrEmpty} = require('./validationCommonService');
const {getAllUsers} = require('../dataLayer/userData');

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidZip (zip) {
    const zipRegex = /^\d{5}(?:-\d{4})?$/;
    return zipRegex.test(zip);
}

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
        const user = req.body;        
        checkForNullOrEmpty(...Object.values(user));
        if (!isValidEmail(user.email)) {
            throw new ValidationException('Invalid email format', 403);
        }
        if(!isValidZip(user.zip)) {
            throw new ValidationException('Invalid zip format', 403);
        }
    }, next);
}

async function checkIfUserAlreadyExist(req,res,next) {
    await handleResponseAsync( async () => {
        const users = await getAllUsers();

        const existEmail = users.find(u => u.email === '');
        if(existEmail) {
            throw new ValidationException('User with same email already exists', 403);
        }

        const existUsername = users.find(u => u.username === '');
        if(existUsername) {
            throw new ValidationException('User with same username already exists', 403);
        }

    }, next)
}

module.exports = {
    validateUser,
    validateUserAcc,
    checkIfUserAlreadyExist
}