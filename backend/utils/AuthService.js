const bcrypt = require('bcrypt');
const saltRounds = 10; 

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

async function compareHashedPswds(enteredPassword, storedHashPassword){
    try{
        return await bcrypt.compare(enteredPassword, storedHashPassword)
    } catch(err){
        console.error('Error comparing password', err);
        throw err;
    }
}

module.exports = {
    hashPassword,
    compareHashedPswds
}