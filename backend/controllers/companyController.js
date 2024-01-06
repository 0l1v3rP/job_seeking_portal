const business = require('../businessLayer/companyBusiness');
const {handleResponseAsync, handleResponseSync, payload} = require('../utils/responseHelper');

async function getCompany(req, res, next) {
    await handleResponseAsync( async () => {
        const company = business.getUserCompany(req.session.user.email);
        payload({company : company}, res);
    }, next);
}

async function registerCompany(req, res, next) {
    await handleResponseAsync( async () => {
        const company = await business.registerCompany( res.locals.company);
        req.session.user.companyId = company.id;
        payload({company : company}, res);
    }, next);
}

async function deleteCompany(req, res, next) {
    await handleResponseAsync( async () => {
        
    }, next);
}

async function editCompany(req, res, next) {
    await handleResponseAsync( async () => {

    }, next);
}


module.exports = {
    getCompany,
    registerCompany
}