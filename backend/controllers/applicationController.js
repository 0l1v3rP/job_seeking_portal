const business = require('../businessLayer/applicationBusiness');
const { ApplicationStatus } = require('../models/application');
const {handleResponseAsync, handleResponseSync, payload} = require('../utils/responseHelper');

async function apply(req,res,next) {
    await handleResponseAsync( async () => {
        const application = res.locals.application;
        application.status = ApplicationStatus.WAITING;  
        await business.apply(application);
        payload({message: 'Application applied successfully'}, res)
    }, next);
}

module.exports = {
    apply
}