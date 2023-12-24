const dbHelper = require('../database/dbHelper');

async function getAllJobs() {
    return await dbHelper.selectAllRecords(dbHelper.Endpoints.JOB);
}

module.exports = {
    getAllJobs
}