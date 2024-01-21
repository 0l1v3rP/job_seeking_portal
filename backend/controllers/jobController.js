const business = require('../businessLayer/jobBusiness');
const {handleResponseAsync, handleResponseSync, payload} = require('../utils/responseHelper');

async function getAvailableJobs(req, res, next) {
    await handleResponseAsync( async () => {
        const userId = req.session.user?.id;
        const companyId = req.session.user?.companyId;
        const jobs = await business.getAvailableJobs(userId, companyId);
        payload(jobs, res);
    }, next);
}

async function getCompanyJobs(req, res, next) {
    await handleResponseAsync( async () => {
        const companyId = req.session.user.companyId;
        const jobs = await business.getCompanyJobs(companyId);
        payload(jobs, res);
    }, next);
}

async function create(req,res,next) {
    await handleResponseAsync( async () => {
        const job = res.locals.job;
        await business.create(job);
        payload({message: 'Job offer created successfully'}, res)
    }, next);
}

module.exports = {
    getAvailableJobs,
    create,
    getCompanyJobs
}