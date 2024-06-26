const dbHelper = require('../database/dbHelper');
const CompanyDTO = require('../models/company');

async function insertCompany(company) {
    const dbCompany = company.toDBFormat()
    const result = await dbHelper.insertRecord(dbHelper.Endpoints.COMPANY, dbCompany);
    const resultModel = CompanyDTO.fromDBFormat(result[0]);
    return resultModel
}


async function isUserAdminForCompany(user_id) {
    const query =  `SELECT 1 FROM ${dbHelper.Endpoints.COMPANY} WHERE ${user_id}=super_admin LIMIT 1`
    return await dbHelper.selectRecords(query, []);
}


async function getUserCompany(email) {
    const query = getUserCompanyQuery('*');
    const result = await dbHelper.selectRecords(query, [email]);
    const resultModel = CompanyDTO.fromDBFormat(result[0]);
    return resultModel;
}

async function insertCompany(company) {
    const dbCompany = company.toDBFormat();
    const result = await dbHelper.insertRecord(dbHelper.Endpoints.COMPANY ,dbCompany);
    const resultModel = CompanyDTO.fromDBFormat(result);
    return resultModel;
}

function getUserCompanyQuery(select) {
    `SELECT ${select} FROM ${dbHelper.Endpoints.COMPANY} JOIN ${dbHelper.Endpoints.USER} ON ${dbHelper.Endpoints.COMPANY}.company_id=${dbHelper.Endpoints.USER}.user_company WHERE ${dbHelper.Endpoints.USER}.email=$1 LIMIT 1`
}
module.exports = {
    insertCompany,
    getUserCompany,
    isUserAdminForCompany,
    insertCompany
}