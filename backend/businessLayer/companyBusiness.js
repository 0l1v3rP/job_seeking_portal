const data = require('../dataLayer/companyData');

async function isCompany(email) {
    company = await data.isCompany(email);
}

module.exports = {
    isCompany
}