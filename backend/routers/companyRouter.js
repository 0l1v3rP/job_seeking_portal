const { Router } = require('express'); 
const company = require('../controllers/companyController')
const {isSignedIn} = require('../utils/authService');
const {validateCompany} = require('../ValidationServices/validationCompanyService')
const {getUserCompanysStatus} = require('../utils/authService');
const app = Router(); 

app.get('/getCompany', isSignedIn, company.getCompany);
app.post('/registerCompany', isSignedIn, validateCompany ,company.registerCompany);
app.get('/getCompanyStatus', getUserCompanysStatus )

module.exports = app;