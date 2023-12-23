const data = require('../dataLayer/accountData')
const {hashPassword, compareHashedPswds} = require('../utils/authService');
const { InvalidInputException } = require('../utils/exceptions');

export async function registerUserBis(user){
    const hashPasswordValue = await hashPassword(user.password);
    user.password = hashPasswordValue;
    await data.insertUser(user);
}

export async function editUserBis(user){
    await data.editUser(user);
}

export async function getMyAccount(email){
    return data.getAccount(email);
}

export async function signInBis(email, password) {
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

export async function deleteAccountBis(email) {
   data.deleteUser(email);
}