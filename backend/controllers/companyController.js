const business = require('../businessLayer/companyBusiness');
const {handleResponseAsync, handleResponseSync, payload} = require('../utils/responseHelper');
const { registerUser } = require('./userController');
const CompanyDTO = require('../models/company');
//TODO: get company if user has company registered
async function getCompany(res, req, next) {
    await handleResponseAsync( async () => {
        const company = business.getUserCompany(req.session.user.email);
        payload({company : company}, res);
    }, next);
}

async function registerCompany(res, req, next) {
    await handleResponseAsync( async () => {

    }, next);
}

async function deleteCompany(res, req, next) {
    await handleResponseAsync( async () => {
        
    }, next);
}

async function editCompany(res, req, next) {
    await handleResponseAsync( async () => {

    }, next);
}


module.exports = {
    getCompany,
    registerCompany
}