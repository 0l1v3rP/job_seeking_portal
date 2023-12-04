const { Router } = require('express'); 
const auth = require('../controllers/accountController')

const app = Router(); 
  
app.post('/register',auth.registerUser); 
app.post('/signin',auth.signIn);
app.get('/signout',auth.signOut);
app.get('/checksigninstatus', auth.checkSignInStatus);
app.get('/getmyaccount', auth.getMyAccount);
app.delete('/deleteaccount', auth.deleteAccount);
module.exports = app;