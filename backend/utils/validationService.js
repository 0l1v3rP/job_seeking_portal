class ValidationService {
    
    static checkForNullOrEmptyCommon(items) {
        const errors = [];
    
        items.forEach((item, index) => {
            if (item === undefined || item === null || item === '') {
                const errorMessage = `${item}: is null or empty`;
                errors.push(errorMessage);
                console.error(errorMessage);
            }
        });
    
        return errors;
    }
    
    static checkForNullOrEmptyObject(body) {
        return ValidationService.checkForNullOrEmptyCommon(
            Object.values(body),
        );
    }
    
    static checkForNullOrEmptyPrimitive(...values) {
        return ValidationService.checkForNullOrEmptyCommon(
            values,
        );
    }
    
}
module.exports = ValidationService;