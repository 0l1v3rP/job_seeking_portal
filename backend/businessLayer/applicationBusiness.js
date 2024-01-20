const data = require('../dataLayer/applicationData');

async function apply(application) {
    await data.insertApplication(application);
}

async function myApplications(userId) {
    data.getMyApplications(userId);
}

async function companyApplications(companyId) {
    data.getCompanyApplications(companyId);
}

module.exports = {
    apply,
    myApplications,
    companyApplications
}