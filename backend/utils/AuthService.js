const bcrypt = require('bcrypt');
const saltRounds = 10;
const {InvalidInputException} = require('./exceptions').default; 

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

async function isSignedIn(req, res, next) {
    if (req.session.user !== undefined) {
        return next();
    }
    res.status(401).json({ error: 'You need to be signed in.' });
}

async function isNotSignedIn(req, res, next) {
    if (req.session.user === undefined) {
        return next();
    }
    res.status(401).json({ error: 'You cannot be signed in.' });
}

function checkSignInStatus(req, res) {
    const isLoggedIn = req.session.user !== undefined;
    const response = {
        isLoggedIn,
        user: isLoggedIn ? req.session.user : null
    };
    res.status(isLoggedIn ? 200 : 400).json(response);
}

  

module.exports = {
    hashPassword,
    compareHashedPswds,
    isSignedIn,
    isNotSignedIn,
    checkSignInStatus
}