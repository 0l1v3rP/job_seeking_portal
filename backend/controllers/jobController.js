const business = require('../businessLayer/jobBusiness');
const validationService = require('../utils/validationUserService');
const {handleResponseAsync, handleResponseSync, payload} = require('../utils/responseHelper');

async function getAllJobs(req, res, next) {
    handleResponseAsync( async () => {
        const jobs = await business.getAllJobs();
        payload(jobs);
    }, next);
}

module.exports = {
    getAllJobs
}