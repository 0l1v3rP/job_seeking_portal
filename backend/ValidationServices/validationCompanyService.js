const {handleResponseSync} = require('../utils/responseHelper');

function validateCompany(req, res, next) {
    handleResponseSync(() => {
    }, next);
}

module.exports = {
    validateCompany
}