const { Router } = require('express'); 
const app = Router(); 
const {isSignedIn, notTheSameCompany, withoutCompany, } = require('../utils/authService');
const  {validateApplication} = require('../ValidationServices/validateApplication')
const controller = require('../controllers/applicationController')
const { ApplicationDTO } = require('../models/application')

app.post('/apply', isSignedIn, withoutCompany, validateApplication, ApplicationDTO.createFromClientFormat, controller.apply);

module.exports = app;