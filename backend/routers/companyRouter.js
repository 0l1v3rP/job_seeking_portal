const { Router } = require('express'); 
const company = require('../controllers/companyController')
const {isSignedIn} = require('../utils/authService');

export const app = Router(); 
app.post('/createCompany',company.createCompany);
app.get('/isCompany', isSignedIn, company.isCompany);