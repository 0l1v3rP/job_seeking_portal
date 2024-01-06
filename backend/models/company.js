const {handleResponseSync} = require('../utils/responseHelper');
const fs = require('fs');
const {PATHS} = require('../utils/fileHelper');

class CompanyDTO {

    constructor(data) {
        this.name = data.name;
        this.admin = data.admin;
        this.logoPath = data.logoPath;
        this.description = data.description;
        this.file = data.file;
        this.id = data.id;
    }

    toDBFormat() {
        return {
            company_name : this.name,
            super_admin: this.admin,
            img_logo_path: this.logoPath,
            description: this.description
        } 
    }

    static fromDBFormat(dbData) {
        return new CompanyDTO({
            name: dbData.company_name,
            admin: dbData.super_admin,
            logoPath: dbData.img_logo_path,
            description: dbData.description,
            file: fs.readFileSync(PATHS.imgPath + `/${dbData.img_logo_path}`),
            id: dbData.company_id
        })
    }

    static createFromClientFormat(req, res,next)  {
        handleResponseSync(() => {
            let company = new CompanyDTO(req.body);
            company.file = req.file;
            company.logoPath = req.file.filename;           
            company.admin = req.session.user.id;
            res.locals.company = company;
        }, next);   
    }
}

module.exports = CompanyDTO