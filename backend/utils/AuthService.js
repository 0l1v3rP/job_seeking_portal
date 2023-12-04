const bcrypt = require('bcrypt');
const saltRounds = 10;
const {InvalidInputException} = require('../utils/exceptions'); 

async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}

async function  compareHashedPswds(enteredPassword, storedHashPassword){
    try{
        const passwordsMatch = await bcrypt.compare(enteredPassword, storedHashPassword);
        if (passwordsMatch) {
          console.log('Passwords match');
        } else {
          console.log('Passwords don\'t match');
          throw new InvalidInputException('Wrong password');
        }    } catch(err){
        console.error('Error comparing password', err.message);
        throw err;
    }
}

module.exports = {
    hashPassword,
    compareHashedPswds
}