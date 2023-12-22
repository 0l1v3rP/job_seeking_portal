function checkForNullOrEmptyCommon(items) {
    const errors = [];

    items.forEach((item) => {
        if (item === undefined || item === null || item === '') {
            const errorMessage = `${item}: is null or empty`;
            errors.push(errorMessage);
            console.error(errorMessage);
        }
    });

    return errors;
}

function checkForNullOrEmptyObject(body) {
    return ValidationService.checkForNullOrEmptyCommon(
        Object.values(body),
    );
}

function checkForNullOrEmptyPrimitive(...values) {
    return ValidationService.checkForNullOrEmptyCommon(
        values,
    );
}

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

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const isValidZip = (zip) => {
    const zipRegex = /^\d{5}(?:-\d{4})?$/;
    return zipRegex.test(zip);
};