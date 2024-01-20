const dbHelper = require('../database/dbHelper');
const {mapAllFromDbFormat} = require('../utils/mapper')
const JobDTO = require('../models/job')

function joinCompany() {
    return  `JOIN "${dbHelper.Endpoints.COMPANY}" ON ${dbHelper.Endpoints.JOB}.employer = ${dbHelper.Endpoints.COMPANY}.company_id`; 
}

async function getAllJobs() {
    const records = await dbHelper.selectAllRecords(dbHelper.Endpoints.JOB, joinCompany());
    return mapAllFromDbFormat(records, JobDTO);
}

async function getAvailableJobs(userId, companyId) {
    let values = [];
    let query = `SELECT ${dbHelper.Endpoints.JOB}.*, "${dbHelper.Endpoints.COMPANY}".* FROM "${dbHelper.Endpoints.JOB}" ${joinCompany()} `;

    if (typeof userId !== 'undefined') {
      query += `JOIN "${dbHelper.Endpoints.APPLICATION}" USING(job_id) WHERE user_id != $1 `;
      values.push(userId);
      if (typeof companyId !== 'undefined') {
        query += `AND ${dbHelper.Endpoints.JOB}.employer != $2`;
        values.push(companyId);  
      } 
    } 
    
    const records = await dbHelper.selectRecords(query, values);
    return mapAllFromDbFormat(records, JobDTO);
}

async function getCompanyJobs(companyId) {
    const query = `SELECT * FROM "${dbHelper.Endpoints.JOB}" WHERE employer = $1`;  
    const records = await dbHelper.selectRecords(query, [companyId]);
    return mapAllFromDbFormat(records, JobDTO);
}



async function insertJob(job) { 
    const dbJob = job.toDBFormat();
    await dbHelper.insertRecord(dbHelper.Endpoints.JOB ,dbJob);
}

module.exports = {
    getAllJobs,
    insertJob,
    getAvailableJobs,
    getCompanyJobs
}