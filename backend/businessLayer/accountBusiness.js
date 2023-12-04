const data = require('../dataLayer/accountData')
const {hashPassword, compareHashedPswds} = require('../utils/AuthService');
const { InvalidInputException } = require('../utils/exceptions');

async function registerUserBis(user){
    const hashPasswordValue = await hashPassword(user.password);
    user.password = hashPasswordValue;
    await data.insertUser(user);
}

async function editUserBis(user){
    await editUser(user);
}


async function signInBis(email, password) {
    const userPswd = await data.getUserPswd(email);
    if (userPswd && userPswd.length > 0) {
        const firstUser = userPswd[0];
        if (firstUser && 'password' in firstUser) {
          const storedHashPassword = firstUser.password;
          await compareHashedPswds(password, storedHashPassword);
        }
  
    } else {
        throw new InvalidInputException('Invalid email');
    }
}

async function deleteAccountBis(email) {
   data.deleteUser(email);
}

module.exports = {
    registerUserBis,
    signInBis,
    editUserBis,
    deleteAccountBis
}