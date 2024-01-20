const data = require('../dataLayer/applicationData');

async function apply(application) {
    await data.insertApplication(application);
}

module.exports = {
    apply
}