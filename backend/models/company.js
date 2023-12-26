class CompanyDTO {
    constructor(data) {
        this.name = data.name;
        this.admin = data.admin;
        this.logoPath = data.logoPath;
        this.description = data.description;
    }

    toDBFormat() {
        return {
            name: this.name,
            admin: this.admin,
            logo_path: this.logoPath,
            description: this.description
        } 
    }

    static fromDBFormat(dbData) {
        new CompanyDTO({
            name: dbData.name,
            admin: dbData.admin,
            logoPath: logo_path,
            description: description
        })
    }
}

module.exports = CompanyDTO
