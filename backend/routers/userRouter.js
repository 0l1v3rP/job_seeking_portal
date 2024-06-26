const { Router } = require('express'); 
const controller = require('../controllers/userController');
const {isSignedIn, isNotSignedIn, checkSignInStatus} = require('../utils/authService');
const {validateUser, validateUserAcc, checkIfUserAlreadyExist} = require('../ValidationServices/validationUserService');
const { destroySession, saveSessionMail } = require('../utils/sessionHelper');
const app = Router(); 
const UserDTO = require('../models/user')
  
app.post('/register', isNotSignedIn, validateUser, checkIfUserAlreadyExist,  UserDTO.createFromClientFormat, controller.registerUser); 
app.post('/signin', isNotSignedIn, validateUserAcc, controller.signIn);
app.put('/editaccount', isSignedIn, validateUser, UserDTO.createFromClientFormat, controller.editUser);
app.get('/signout', isSignedIn, controller.signOut);
app.get('/checksigninstatus', checkSignInStatus);
app.get('/getmyaccount', isSignedIn, controller.getMyAccount);
app.delete('/deleteaccount', isSignedIn, saveSessionMail, destroySession, controller.deleteAccount);

module.exports = app;