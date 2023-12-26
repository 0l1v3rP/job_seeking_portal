const { Router } = require('express'); 
const company = require('../controllers/companyController')
const {isSignedIn} = require('../utils/authService');
const app = Router(); 

app.get('/getCompany', isSignedIn, company.getCompany);

module.exports = app;