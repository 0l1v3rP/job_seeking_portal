const business = require('../businessLayer/companyBusiness');
const ValidationService = require('../utils/validationUserService');

async function isCompany(req, res) {
    try{
        const email = req.session.user.email;
        business.isCompany(email);
    } catch (error) {
        ValidationService.handleServerError(error, res);
    }
}

async function createCompany(req, res) {
    
}

module.exports = {
    isCompany,
    createCompany
}