const data = require('../dataLayer/companyData');

export async function isCompany(email) {
    company = await data.isCompany(email);
}