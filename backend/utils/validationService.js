const {ValidationException} = require('./exceptions');

function checkForNullOrEmpty(...items) {
    const errors = [];

    items.forEach((item) => {
        if (item === undefined || item === null || item === '') {
            const errorMessage = 'value is null or empty';
            console.error(errorMessage);
            throw new ValidationException(errorMessage);
        }
    });

    return errors;
}

// function checkForNullOrEmptyObject(body) {
//     return checkForNullOrEmptyCommon(
//         Object.values(body),
//     );
// }

// function checkForNullOrEmptyPrimitive(...values) {
//     return checkForNullOrEmptyCommon(
//         values,
//     );
// }

function validateUserData(user){
    let errors = checkForNullOrEmptyObject(user);
    if (isValidEmail(user.email)) {
        errors.push("Incorrect email format");
    }
    if(isValidZip(user.zip)) {
        errors.push("Incorrect zip fromat");
    }
    return errors;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

function isValidZip (zip) {
    const zipRegex = /^\d{5}(?:-\d{4})?$/;
    return zipRegex.test(zip);
};

function handleServerError(error, res) {
    const message = 'Internal Server Error';
    console.error(message, error);
    res.status(500).json({ error: message, code: 500 });
  }

module.exports = {
    checkForNullOrEmpty,
    validateUserData,
    handleServerError
}