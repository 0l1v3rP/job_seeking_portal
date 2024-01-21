const { Router } = require('express'); 
const app = Router(); 
const {isSignedIn, withoutCompany, withCompany} = require('../utils/authService');
const  {validateApplication, checkStatus} = require('../ValidationServices/validateApplication')
const controller = require('../controllers/applicationController')
const { ApplicationDTO } = require('../models/application')

app.post('/apply', isSignedIn, withoutCompany, validateApplication, ApplicationDTO.createFromClientFormat, controller.apply);
app.get('/myapplication', isSignedIn, controller.myApplications);
app.get('/companyapplications',isSignedIn, withCompany, controller.companyApplications);
//app.put('/changestatus', checkStatus, );

module.exports = app;