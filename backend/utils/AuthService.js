const bcrypt = require('bcrypt');
const saltRounds = 10;
const {InvalidInputException, AuthorizationException} = require('./exceptions'); 
const {handleResponseSync, payload, handleResponseAsync} = require('./responseHelper');
const companyData = require('../dataLayer/companyData');
const { getUserCompany } = require('../businessLayer/companyBusiness');

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
        }, res);
    }, next);
}

async function getUserCompanysStatus(req, res, next) {
    await handleResponseAsync( async () => {
        let result = 0;
        if (req.session.user.company !== undefined) {
            const data = isUserAdminForCompany(req.session.user.id); 
        }
        payload(result, res);
    },next);
}

function withCompany(req, res, next) {
    handleResponseSync(() => {
        if (req.session.user.company == undefined) {
            throw new AuthorizationException('You need to have registered company ', 401);
        }
    }, next);
}

function withoutCompany(req, res, next) {
    handleResponseSync(() => {
        if (req.session.user.company !== undefined) {
            throw new AuthorizationException('You canno\'t have company registered', 401);
        }
    }, next);
}


async function isUserAdminForCompany(req, res, next) {
    await handleResponseAsync( async () => {
        const result = await getUserCompany.isUserAdminForCompany(req.session.user.id);
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