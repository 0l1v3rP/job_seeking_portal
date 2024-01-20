const dbHelper = require('../database/dbHelper');

async function insertApplication(application) { 
    const dbApplication = application.toDBFormat();
    await dbHelper.insertRecord(dbHelper.Endpoints.APPLICATION ,dbApplication);
}

module.exports = {
    insertApplication,
}