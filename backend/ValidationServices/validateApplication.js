const {checkForNullOrEmpty} = require('./validationCommonService');
const {handleResponseSync} = require('../utils/responseHelper');
const { ApplicationStatus } = require('../models/application');
const {ValidationException} = require('../utils/exceptions');

function validateApplication(req, res, next) {
    handleResponseSync(() => {
        const application = req.body;        
        checkForNullOrEmpty(...Object.values(application));
    }, next);
}

function checkStatus(req,res,next) {
    handleResponseSync(() => {
        if(!Object.values(ApplicationStatus).includes(req.body.status)) {
            throw new ValidationException('Not A Valid Status', 403);
        }
    }, next);
}

module.exports = {
    validateApplication,
    checkStatus
}