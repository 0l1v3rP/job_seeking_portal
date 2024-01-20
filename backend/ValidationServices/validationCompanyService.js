const {handleResponseSync} = require('../utils/responseHelper');
const {checkForNullOrEmpty} = require('./validationCommonService');

function validateCompany(req, res, next) {
    handleResponseSync(() => {
        const company = req.body;        
        checkForNullOrEmpty(...Object.values(company));
    }, next);
}

module.exports = {
    validateCompany
}