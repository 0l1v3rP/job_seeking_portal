const dbHelper = require('../database/dbHelper');

export async function getAllJobs() {
    return await dbHelper.selectAllRecords(dbHelper.Endpoints.JOB);
}