const {handleResponseSync} = require('../utils/responseHelper');

function validateCompany(req, res, next) {
    handleResponseSync(() => {
        // const companyData = req.body;     
    }, next);
}

module.exports = {
    validateCompany
}