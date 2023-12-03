class ValidationService {
    
    static checkForNullOrEmptyCommon(items, errorMessageCallback) {
        const errors = [];
    
        items.forEach((item, index) => {
            if (item === undefined || item === null || item === '') {
                const errorMessage = errorMessageCallback(value, index);
                errors.push(errorMessage);
                console.error(errorMessage);
            }
        });
    
        return errors;
    }
    
    static checkForNullOrEmptyObject(body) {
        return ValidationService.checkForNullOrEmptyCommon(
            Object.values(body),
            (value, key) => `${key}: is null or empty`
        );
    }
    
    static checkForNullOrEmptyPrimitive(...values) {
        return ValidationService.checkForNullOrEmptyCommon(
            values,
            (value, index) => `${value} is null or empty`
        );
    }
    
}
module.exports = ValidationService;