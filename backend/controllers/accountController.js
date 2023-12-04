const User = require('../models/user');
const ValidationService = require('../utils/validationService');
const {registerUserBis, signInBis, editUserBis, deleteAccountBis} = require('../businessLayer/accountBusiness');
const { InvalidInputException } = require('../utils/exceptions');

async function editUser(req, res) {
  await handleUserOperation(req, res, editUserBis);
}

async function registerUser(req, res) {
  await handleUserOperation(req, res, registerUserBis);
}


async function signIn(req, res) {
  try {
    const { email, password } = req.body;
    const validationErrors = ValidationService.checkForNullOrEmptyPrimitive(email, password);

    if (validationErrors.length !== 0) {
      return res.status(400).json({ error: 'Validation failed', details: validationErrors });
    }

    await signInBis(email, password);
    req.session.user = { email };
    res.status(200).json({ message: 'User signed in successfully' });
  } catch (error) {
    handleSignInError(error, res);
  }
}

async function signOut(req, res) {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        return res.status(500).json({ error: 'Internal Server Error', code: 500 });
      }
      res.clearCookie('connect.sid');
      res.status(200).json({ message: 'User signed out successfully' });
    });
  } catch (error) {
    handleServerError('Error signing out:', error, res);
  }
}

async function checkSignInStatus(req, res) {
  try {
    const isLoggedIn = req.session.user !== undefined;
    res.status(200).json({ isLoggedIn, user: req.session.user || null });
  } catch (error) {
    handleServerError('Error checking sign-in status:', error, res);
  }
}

async function deleteAccount(req, res) {
  try{  
    const email = req.session.user.email;
    await deleteAccountBis(email);
    res.status(200).json({ message: 'User signed out successfully' });
  } catch(error){
    handleServerError('Error deleting accout:', error, res);
  }
}

async function handleUserOperation(req, res, operationCallback) {
  try {
    const userData = req.body;
    const validationErrors = ValidationService.checkForNullOrEmptyObject(userData);
    if (validationErrors.length !== 0) {
      return res.status(400).json({ error: 'Validation failed', details: validationErrors });
    }

    const user = new User(userData);
    await operationCallback(user);

    res.status(200).json({ message: `User ${operationCallback.name} successfully` });
  } catch (error) {
    console.error(`Error in ${operationCallback.name}:`, error);
    res.status(500).json({ error: `Failed to ${operationCallback.name} user. Please try again later.` });
  }
}

function handleSignInError(error, res) {
  if (error instanceof InvalidInputException) {
    console.error('Invalid input error:', error.toString());
    res.status(400).json({ error: error.message, code: error.code });
  } else {
    handleServerError('Error in signIn:', error, res);
  }
}

function handleServerError(logMessage, error, res) {
  console.error(logMessage, error);
  res.status(500).json({ error: 'Internal Server Error', code: 500 });
}

module.exports= {
  registerUser,
  signIn,
  checkSignInStatus,
  signOut,
  editUser,
  deleteAccount
} 