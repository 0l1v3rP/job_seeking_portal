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
    let query = `SELECT ${dbHelper.Endpoints.JOB}.*, "${dbHelper.Endpoints.COMPANY}".* FROM "${dbHelper.Endpoints.JOB}" ${joinCompany()}`;

    if (typeof userId !== 'undefined') {
      query += ` LEFT JOIN "${dbHelper.Endpoints.APPLICATION}" ON ${dbHelper.Endpoints.APPLICATION}.job_id = ${dbHelper.Endpoints.JOB}.job_id AND ${dbHelper.Endpoints.APPLICATION}.user_id = $1 WHERE ${dbHelper.Endpoints.APPLICATION}.user_id IS NULL`;
      values.push(userId);
      if (typeof companyId !== 'undefined') {
        query += ` AND ${dbHelper.Endpoints.JOB}.employer != $2`;
        values.push(companyId);  
      } 
    } 
    
    const records = await dbHelper.selectRecords(query, values);
    return mapAllFromDbFormat(records, JobDTO);
}

async function getCompanyJobs(companyId) {
    const query = `SELECT * FROM "${dbHelper.Endpoints.JOB}" ${joinCompany()} WHERE employer = $1`;  
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