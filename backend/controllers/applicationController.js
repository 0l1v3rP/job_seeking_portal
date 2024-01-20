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

async function myApplications(req,res,next) {
    await handleResponseAsync( async () => {
        const applications = await business.myApplications(req.sessoin.user.id);
        payload(applications, res)
    }, next);
}

async function companyApplications(req, res, next) {
    await handleResponseAsync( async () => {
        const applications = await business.companyApplications(req.sessoin.user.companyId);
        payload(applications, res)
    }, next);
}

module.exports = {
    apply,
    myApplications,
    companyApplications
}