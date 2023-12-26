const business = require('../businessLayer/jobBusiness');
const {handleResponseAsync, handleResponseSync, payload} = require('../utils/responseHelper');

async function getAllJobs(req, res, next) {
    await handleResponseAsync( async () => {
        const jobs = await business.getAllJobs();
        payload(jobs);
    }, next);
}

module.exports = {
    getAllJobs
}