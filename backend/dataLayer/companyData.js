const dbHelper = require('../database/dbHelper');

export async function isCompany(email) {
    const query = `SELECT 1 FROM ${dbHelper.Endpoints.COMPANY} 
                    JOIN ${dbHelper.Endpoints.USER}
                        ON ${dbHelper.Endpoints.COMPANY}.company_id=${dbHelper.Endpoints.USER}.user_company
                    WHERE ${dbHelper.Endpoints.USER}.email=$1 LIMIT 1`;

    return await dbHelper.selectRecords(query, [email]);
}

export async function insertCompany(company) {
    return await dbHelper.insertRecord(dbHelper.Endpoints.COMPANY, company);
}