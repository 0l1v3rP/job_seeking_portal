const {ValidationException} = require('../utils/exceptions');

function checkForNullOrEmpty(...items) {
    const errors = [];
    items.forEach((item) => {
        if (typeof item === 'undefined' || item === null || item === '') {
            throw new ValidationException('value is null or empty', 403);
        }
    });
    return errors;
}

module.exports = {
    checkForNullOrEmpty
}