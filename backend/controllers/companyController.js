const business = require('../businessLayer/companyBusiness');
const {handleResponseAsync, handleResponseSync, payload} = require('../utils/responseHelper');

async function getCompany(res, req, next) {
    await handleResponseAsync( async () => {
        const company = business.getCompany();
    }, next);
}

module.exports = {
    isCompany,
    createCompany
}