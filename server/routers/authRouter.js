const { Router } = require('express'); 
const auth = require('../controllers/authController')

const app = Router(); 
  
app.post('/register',auth); 
  
module.exports = app;
