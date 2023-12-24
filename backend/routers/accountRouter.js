const { Router } = require('express'); 
const controller = require('../controllers/accountController');
const {isSignedIn, isNotSignedIn, checkSignInStatus} = require('../utils/authService');
export const app = Router(); 
  
app.post('/register', isNotSignedIn, controller.registerUser); 
app.post('/signin', isNotSignedIn, controller.signIn);
app.put('/editaccount', isSignedIn, controller.editUser);
app.get('/signout', isSignedIn, controller.signOut);
app.get('/checksigninstatus', checkSignInStatus);
app.get('/getmyaccount', isSignedIn, controller.getMyAccount);
app.delete('/deleteaccount', isSignedIn, controller.deleteAccount);

