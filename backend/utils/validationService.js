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

export function checkForNullOrEmptyObject(body) {
    return ValidationService.checkForNullOrEmptyCommon(
        Object.values(body),
    );
}

export function checkForNullOrEmptyPrimitive(...values) {
    return ValidationService.checkForNullOrEmptyCommon(
        values,
    );
}

export function validateUserData(user){
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

export function handleServerError(error, res) {
    const message = 'Internal Server Error';
    console.error(messsage, error);
    res.status(500).json({ error: message, code: 500 });
  }