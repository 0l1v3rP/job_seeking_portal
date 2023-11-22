const { Router } = require('express'); 
const home = require('../controllers/homeController')

const app = Router(); 
  
app.get('/home',home); 
  
module.exports = app;
