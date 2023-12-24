const data = require('../dataLayer/jobsData');

async function getAllJobs() {
    return await data.getAllJobs();
}

module.exports = {
    getAllJobs
}