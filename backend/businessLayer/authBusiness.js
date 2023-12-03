const {insertUser, getUserPswd} = require('../dataLayer/authData')
const {hashPassword, compareHashedPswds} = require('../utils/AuthService')
async function registerUserBis(user){
    const hashPasswordValue = await hashPassword(user.password);
    user.password = hashPasswordValue;
    await insertUser(user);
}

async function signInBis(email, password) {
    const userPswd = await getUserPswd({ email });
    if (!user) {
        throw new InvalidInputException('Invalid username or password');
    }
    await compareHashedPswds(password, userPswd);
}

module.exports = {
    registerUserBis,
    signInBis,
}