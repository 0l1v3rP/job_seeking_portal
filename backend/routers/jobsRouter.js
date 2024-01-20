const { Router } = require('express'); 
const controller = require('../controllers/jobController')
const app = Router(); 
const {isSignedIn, withCompany} = require('../utils/authService');
const JobDTO = require('../models/job');

app.get('/getJobs',controller.getAvailableJobs);
app.post('/create',isSignedIn, withCompany, JobDTO.createFromClientFormat, controller.create )
module.exports = app;