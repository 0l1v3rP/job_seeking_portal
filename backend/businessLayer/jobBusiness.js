const data = require('../dataLayer/jobsData');

async function getAvailableJobs(userId, companyId) {
    return await data.getAvailableJobs(userId, companyId);
}

async function create(job) {
    await data.insertJob(job);
}

async function getCompanyJobs(companyId) {
    return await data.getCompanyJobs(companyId);
}

module.exports = {
    getAvailableJobs,
    create,
    getCompanyJobs
}