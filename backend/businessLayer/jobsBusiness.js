const data = require('../dataLayer/jobsData');

export async function getAllJobs() {
    return await data.getAllJobs();
}