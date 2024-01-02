const data = require('../dataLayer/companyData');
const {getAccount} = require('../dataLayer/userData')

async function getUserCompany(email) {
    return await data.getUserCompany(email)[0];
}

module.exports = {
    getUserCompany,
}