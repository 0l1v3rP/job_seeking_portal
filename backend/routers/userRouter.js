const { Router } = require('express'); 
const controller = require('../controllers/userController');
const {isSignedIn, isNotSignedIn, checkSignInStatus} = require('../utils/authService');
const {validateUser, validateUserAcc, checkIfUserAlreadyExist} = require('../utils/validationUserService');
const { destroySession, saveSessionMail } = require('../utils/sessionHelper');
const app = Router(); 
  
app.post('/register', isNotSignedIn, validateUser, checkIfUserAlreadyExist, controller.registerUser); 
app.post('/signin', isNotSignedIn, validateUserAcc, controller.signIn);
app.put('/editaccount', isSignedIn, validateUser, controller.editUser);
app.get('/signout', isSignedIn, controller.signOut);
app.get('/checksigninstatus', checkSignInStatus);
app.get('/getmyaccount', isSignedIn, controller.getMyAccount);
app.delete('/deleteaccount', isSignedIn, saveSessionMail, destroySession, controller.deleteAccount);

module.exports = app;