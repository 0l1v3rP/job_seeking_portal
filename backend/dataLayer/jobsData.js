const dbHelper = require('../database/dbHelper');
const {mapAllFromDbFormat} = require('../utils/mapper')
const JobDTO = require('../models/job')

async function getAllJobs() {
    const join = `JOIN "${dbHelper.Endpoints.COMPANY}" ON ${dbHelper.Endpoints.JOB}.employer = ${dbHelper.Endpoints.COMPANY}.company_id`; 
    const records = await dbHelper.selectAllRecords(dbHelper.Endpoints.JOB, join);
    return mapAllFromDbFormat(records, JobDTO);
}

async function insertJob(job) { 
    const dbJob = job.toDBFormat();
    await dbHelper.insertRecord(dbHelper.Endpoints.JOB ,dbJob);
}

module.exports = {
    getAllJobs,
    insertJob
}