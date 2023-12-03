class User {
    constructor(body){
        this.firstName = body.firstName;
        this.lastName = body.lastName;
        this.username = body.username;
        this.email = body.email;
        this.address = body.address;
        this.password = body.password;
        this.country = body.country;
        this.zip = body.zip;
    }
}
  
module.exports = User;