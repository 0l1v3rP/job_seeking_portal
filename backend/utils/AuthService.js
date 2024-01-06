const bcrypt = require('bcrypt');
const saltRounds = 10;
const {InvalidInputException, AuthorizationException} = require('./exceptions'); 
const {handleResponseSync, payload, handleResponseAsync} = require('./responseHelper');
const companyData = require('../dataLayer/companyData');

async function hashPassword(password) {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
}

async function compareHashedPswds(enteredPassword, storedHashPassword){
    const passwordsMatch = await bcrypt.compare(enteredPassword, storedHashPassword);
    if (passwordsMatch) {
        console.log('Passwords match');
    } else {
        console.log('Passwords don\'t match');
        throw new InvalidInputException('Wrong password', 422);
    }        
}

function isSignedIn(req, res, next) {
    handleResponseSync(() => {
        if (typeof req.session.user === 'undefined') {
            throw new AuthorizationException('You need to be signed in', 401);
        }
    }, next);
}

function isNotSignedIn(req, res, next) {
    handleResponseSync(() => {
        if (typeof req.session.user !== 'undefined') {
            throw new AuthorizationException('You cannot be signed in', 401);
        }
    }, next);
}

function checkSignInStatus(req, res, next) {
    handleResponseSync(() => {
        const isLoggedIn = typeof req.session.user !== 'undefined';
        payload({
            isLoggedIn,
            user: isLoggedIn ? req.session.user : null
        }, res);
    }, next);
}

async function isUserAdminForCompany(id) {
    const result = await companyData.isUserAdminForCompany(id);
    return Object.values(result[0])[0] === 1;
}

async function getUserCompanysStatus(req, res, next) {
    await handleResponseAsync( async () => {
        let result = 0;
        if (typeof  req.session.user.companyId !== 'undefined') {
            result = isUserAdminForCompany(req.session.user.id) ? 2 : 1; 
        }
        payload(result, res);
    },next);
}

function withCompany(req, res, next) {
    handleResponseSync(() => {
        if (typeof req.session.user.companyId === 'undefined') {
            throw new AuthorizationException('You need to have registered company ', 401);
        }
    }, next);
}

function withoutCompany(req, res, next) {
    handleResponseSync(() => {
        if (req.session.user.companyId !== 'undefined') {
            throw new AuthorizationException('You canno\'t have company registered', 401);
        }
    }, next);
}

module.exports = {
    hashPassword,
    compareHashedPswds,
    isSignedIn,
    isNotSignedIn,
    checkSignInStatus,
    getUserCompanysStatus
}