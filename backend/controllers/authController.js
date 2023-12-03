const User = require('../models/user');
const ValidationService = require('../utils/validationService');
const {registerUserBis, signInBis} = require('../businessLayer/authBusiness');

async function registerUser (req, res) {
  const userData = req.body;
  const validationErrors = ValidationService.checkForNullOrEmptyObject(userData);
  if (validationErrors.length !== 0) {
    return res.status(400).json({ error: 'Validation failed', details: validationErrors });
  }
  const user = new User(userData);
  try {
    await registerUserBis(user);
    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
      console.error('Error in registerUser:', error);
      res.status(500).json({ error: 'Failed to register user. Please try again later.' });
  }
};

async function signIn(req, res) {
  const { email, password } = req.body;
  const validationErrors = ValidationService.checkForNullOrEmptyPrimitive(email, password);
  if (validationErrors.length !== 0) {
    return res.status(400).json({ error: 'Validation failed', details: validationErrors });
  } 
  try {
    await signInBis(email, password);
    req.session.user = { email }; 
    res.status(200).json({ message: 'User signed in successfully' });
  } catch (error) {
      console.error('Error in registerUser:', error);
      res.status(500).json({ error: 'Failed to sign user. Please try again later.' });
  }
}

async function checkSignInStatus(req, res) {
  try {
    if (req.session.user) {
      res.status(200).json({ isLoggedIn: true, user: req.session.user });
    } else {
      res.status(200).json({ isLoggedIn: false, user: null });
    }
  } catch (error) {   
    console.error('Error checking sign-in status:', error);
    res.status(500).json({ error: 'Failed to check sign-in status. Please try again later.' });
  }
}

module.exports= {
  registerUser,
  signIn,
  checkSignInStatus
} 