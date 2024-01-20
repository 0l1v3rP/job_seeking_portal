const dbHelper = require('../database/dbHelper');
const { ApplicationDTO } = require('../models/application');
const {mapAllFromDbFormat} = require('../utils/mapper')

async function insertApplication(application) { 
    const dbApplication = application.toDBFormat();
    await dbHelper.insertRecord(dbHelper.Endpoints.APPLICATION ,dbApplication);
}

async function getCompanyApplications(companyId) {
    const query = `SELECT * FROM "${dbHelper.Endpoints.APPLICATION}" JOIN "${dbHelper.Endpoints.JOB}" ON  
    ${dbHelper.Endpoints.APPLICATION}.job_id = ${dbHelper.Endpoints.JOB}.job_id WHERE  ${dbHelper.Endpoints.JOB}.job_id = $1`;
    const records =  await dbHelper.selectRecords(query, [companyId]);
    return mapAllFromDbFormat(records, ApplicationDTO);

}

async function getMyApplications(userId) {
    const query = `SELECT * FROM "${dbHelper.Endpoints.APPLICATION}" WHERE user_id = $1`;
    const records =  await dbHelper.selectRecords(query, [userId]);
    return mapAllFromDbFormat(records, ApplicationDTO);
}

module.exports = {
    insertApplication,
    getCompanyApplications,
    getMyApplications
}