const { Router } = require('express'); 
const controller = require('../controllers/jobController')
const app = Router(); 

app.get('/getJobs',controller.getAllJobs);

module.exports = app;