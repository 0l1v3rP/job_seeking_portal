const data = require('../dataLayer/userData');
const {hashPassword, compareHashedPswds} = require('../utils/authService');
const { InvalidInputException } = require('../utils/exceptions');

async function registerUser(user){
    const hashPasswordValue = await hashPassword(user.password);
    user.password = hashPasswordValue;
    await data.insertUser(user);
}

async function editUser(user){
    await data.editUser(user);
}

async function getMyAccount(email){
    return await data.getAccount(email);
}

async function signIn(email, password) {
    const userPswd = (await data.getUserPswd(email))[0];
    if (userPswd) {
        const storedHashPassword = userPswd.password;
        await compareHashedPswds(password, storedHashPassword);
    } else {
        throw new InvalidInputException('Invalid email',422);
    }
}

async function deleteAccount(email) {
    await data.deleteUser(email);
}

async function getUserId(email) {
    await data.getUserId(email);
}

module.exports = {
    registerUser,
    editUser,
    getMyAccount,
    signIn,
    deleteAccount,
    getUserId
}