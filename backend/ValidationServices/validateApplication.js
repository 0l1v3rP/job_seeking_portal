const {checkForNullOrEmpty} = require('./validationCommonService');
const {handleResponseSync} = require('../utils/responseHelper');

function validateApplication(req, res, next) {
    handleResponseSync(() => {
        const application = req.body;        
        checkForNullOrEmpty(...Object.values(application));
    }, next);
}

module.exports = {
    validateApplication,
}