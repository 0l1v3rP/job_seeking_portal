const business = require('../businessLayer/userBusiness');
const {destroySession} = require('../utils/sessionHelper')
const {handleResponseAsync, handleResponseSync, payload} = require('../utils/responseHelper');

async function editUser(req, res, next) {
  await handleResponseAsync(async () => {
    const user = res.locals.user;
    await business.editUser(user);
    payload({ message: `user edit was successfull` }, res);
  }, next);
}

async function registerUser(req, res, next) {
  await handleResponseAsync(async () => {
    const user = res.locals.user;
    await business.registerUser(user);
    payload({ message: `user registration was successfull` });
  }, next);
}

async function getMyAccount(req, res, next) {
  await handleResponseAsync(async () => {
    const email = req.session.user.email;
    const user = await business.getMyAccount(email);
    payload({user: user}, res);
  }, next);
}

async function signIn(req, res, next) {
  await handleResponseAsync(async () => {
    const password = res.locals.password;
    const email = res.locals.email;
    await business.signIn(email, password);
    const user = await business.getMyAccount(email);
    req.session.user = { ...user }; //setting session
    payload({ message: 'User signed in successfully' }, res);
  }, next);
}

function signOut(req, res, next) {
  handleResponseSync(() => {
    destroySession(req,res)
    payload({ message: 'User signed out successfully' }, res);
  }, next);
}

async function deleteAccount(req, res, next) {
  await handleResponseAsync(async () => {
    const email = res.locals.email; 
    await business.deleteAccount(email);
    payload({ message: 'account deleted succesfully' }, res);
  }, next);
}

module.exports = {
  editUser,
  registerUser,
  getMyAccount,
  signIn,
  signOut,
  deleteAccount
}