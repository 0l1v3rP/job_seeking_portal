const data = require('../dataLayer/jobsData');

async function getAllJobs() {
    return await data.getAllJobs();
}

async function create(job) {
    await data.insertJob(job);
}

module.exports = {
    getAllJobs,
    create
}