const dbHelper = require('../database/dbHelper');

async function getArrangements() {
    const query = `SELECT work_arrangement_name FROM "${dbHelper.Endpoints.ARRANGEMENTS}"`;
    return await dbHelper.selectRecords(query);
}

async function getEmployementTypes() {
    const query = `SELECT employement_type_name FROM "${dbHelper.Endpoints.EMPLOYEMENT}"`;
    return await dbHelper.selectRecords(query);}

module.exports = {
    getArrangements,
    getEmployementTypes
}