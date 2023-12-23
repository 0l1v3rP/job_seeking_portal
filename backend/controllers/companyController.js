const business = require('../businnessLayer/companyBusiness');
const ValidationService = require('../utils/validationService');

export async function isCompany(req, res) {
    try{
        const email = req.session.user.email;
        business.isCompany(email);
    } catch (error) {
        ValidationService.handleServerError(error, res);
    }
}

export async function createCompany(req, res) {
}