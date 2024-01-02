export const companyStatusEnum = {
    ADMIN: 'ADMIN',
    ASSOCIATE: 'ASSOCIATE',
    NONE: 'NONE'
};

export function mapCompanyStatus(code) {
    switch (code) {
        case 1:
            return companyStatusEnum.ASSOCIATE;
        case 2:
            return companyStatusEnum.ADMIN;
        default:
            return companyStatusEnum.NONE;
    }
}