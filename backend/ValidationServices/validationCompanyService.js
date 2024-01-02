const CompanyDTO = require("../models/company");

function validateCompany(req, res, next) {  
    
}

function validateCompany(req, res, next) {
    handleResponseSync(() => {
        const companyData = req.body;
        // validateCompanyData(companyData);
        const company = new CompanyDTO(companyData);
        
    }, next);
}

module.exports = {
    validateCompany
}