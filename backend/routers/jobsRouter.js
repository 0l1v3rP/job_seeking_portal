const { Router } = require('express'); 
const controller = require('../controllers/jobController')

export const app = Router(); 
app.get('/getJobs',controller.getAllJobs);
