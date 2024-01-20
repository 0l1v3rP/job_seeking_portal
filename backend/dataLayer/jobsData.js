const dbHelper = require('../database/dbHelper');

async function getAllJobs() {
    return await dbHelper.selectAllRecords(dbHelper.Endpoints.JOB);
}

async function insertJob(job) { 
    const dbJob = job.toDBFormat();
    await dbHelper.insertRecord(dbHelper.Endpoints.JOB ,dbJob);
}

module.exports = {
    getAllJobs,
    insertJob
}