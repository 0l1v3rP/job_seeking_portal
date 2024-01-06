const companyData = require('../dataLayer/companyData');
const userData = require('../dataLayer/userData');

async function getUserCompany(email) {
    return await companyData.getUserCompany(email)[0];
}

async function registerCompany(company) {
    const companyResult =  await companyData.insertCompany(company);
    await userData.registerCompanytoUser(companyResult.admin, companyResult.id);
    return companyResult;
}

module.exports = {
    getUserCompany,
    registerCompany
}