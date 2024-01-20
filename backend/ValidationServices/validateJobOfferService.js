const {checkForNullOrEmpty} = require('./validationCommonService');

function validateJobOffer(req, res, next) {
    handleResponseSync(() => {
        const job = req.body;        
        checkForNullOrEmpty(...Object.values(job));
    }, next);
}

module.exports = {
    validateJobOffer,
}