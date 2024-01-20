const data = require('../dataLayer/jobsData');

async function getAvailableJobs(userId, companyId) {
    return await data.getAvailableJobs(userId, companyId);
}

async function create(job) {
    await data.insertJob(job);
}

module.exports = {
    getAvailableJobs,
    create
}