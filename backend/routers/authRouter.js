const { Router } = require('express'); 
const auth = require('../controllers/authController')

const app = Router(); 
  
app.post('/register',auth.registerUser); 
app.post('/signin',auth.signIn);
app.post('/checksigninstatus', auth.checkSignInStatus);
module.exports = app;
