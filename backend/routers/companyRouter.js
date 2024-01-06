const { Router } = require('express'); 
const company = require('../controllers/companyController')
const {isSignedIn} = require('../utils/authService');
const {validateCompany} = require('../ValidationServices/validationCompanyService')
const {getUserCompanysStatus} = require('../utils/authService');
const app = Router(); 
const fileHelper = require('../utils/fileHelper'); 
const companyDTO = require('../models/company');

app.get('/getCompany', isSignedIn, company.getCompany);
app.post('/registerCompany', isSignedIn, fileHelper.upload.single('imageFile'), validateCompany, companyDTO.createFromClientFormat, company.registerCompany);
app.get('/getCompanyStatus', getUserCompanysStatus )

module.exports = app;