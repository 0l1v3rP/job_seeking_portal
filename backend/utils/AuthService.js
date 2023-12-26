const bcrypt = require('bcrypt');
const saltRounds = 10;
const {InvalidInputException, AuthorizationException} = require('./exceptions'); 
const {handleResponseSync, payload} = require('./responseHelper');

async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}

async function compareHashedPswds(enteredPassword, storedHashPassword){
    const passwordsMatch = await bcrypt.compare(enteredPassword, storedHashPassword);
    if (passwordsMatch) {
        console.log('Passwords match');
    } else {
        console.log('Passwords don\'t match');
        throw new InvalidInputException('Wrong password');
    }        
}

function isSignedIn(req, res, next) {
    handleResponseSync(() => {
        if (req.session.user === undefined) {
            throw new AuthorizationException('You need to be signed in', 401);
        }
    }, next);
}

function isNotSignedIn(req, res, next) {
    handleResponseSync(() => {
        if (req.session.user !== undefined) {
            throw new AuthorizationException('You cannot be signed in', 401);
        }
    }, next);
}

function checkSignInStatus(req, res, next) {
    handleResponseSync(() => {
        const isLoggedIn = req.session.user !== undefined;
        payload({
            isLoggedIn,
            user: isLoggedIn ? req.session.user : null
        });
    }, next);
}


module.exports = {
    hashPassword,
    compareHashedPswds,
    isSignedIn,
    isNotSignedIn,
    checkSignInStatus
}