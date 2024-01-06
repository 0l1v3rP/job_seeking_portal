const {handleResponseSync} = require('../utils/responseHelper');

class UserDTO {
    constructor(data){
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.username = data.username;
        this.email = data.email;
        this.address = data.address;
        if(data.password) {
            this.password = data.password;
        }
        if(data.id) {
            this.id = data.id;
        }
        if(data.companyId) {
            this.companyId = data.companyId;
        }
        this.country = data.country;
        this.zip = data.zip;
    }

    toDBFormat() {
        const dbFormat = {
            first_name: this.firstName,
            last_name: this.lastName,
            username: this.username,
            email: this.email,
            address: this.address,
            country: this.country,
            zip: this.zip
        };

        if(this.id) {
            dbFormat.user_id = this.id;
        }
        if(this.password) {
            dbFormat.password = this.password;
        }
        if(this.companyId) {
            dbFormat.user_company = this.companyId;
        }

        return dbFormat;
    }

    static fromDBFormat(dbData) {
        return new UserDTO({
            firstName: dbData.first_name,
            lastName: dbData.last_name,
            username: dbData.username,
            email: dbData.email,
            address: dbData.address,
            password: dbData.password,
            country: dbData.country,
            zip: dbData.zip,
            companyId: dbData.user_company,
            id: dbData.user_id,
        });
    }

    static createFromClientFormat(req, res,next)  {
        handleResponseSync(() => {
            const user = new UserDTO(req.body);
            if(req.session.user) {
                user.email = req.session.user.email;
            }
            res.locals.user = user;
        }, next);   
    }
}
  
module.exports = UserDTO