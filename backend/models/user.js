const company = require("./company");

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
        if(data.company) {
            this.company = data.company;
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
        
        if(this.password) {
            dbFormat.password = this.password;
        }
        if(this.company) {
            dbFormat.user_company = company;
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
            company: dbData.user_company
        });
    }
}
  
module.exports = UserDTO