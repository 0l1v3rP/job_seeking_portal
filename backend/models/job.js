const {handleResponseSync} = require('../utils/responseHelper');
const CompanyDTO = require('./company');


class JobDTO {
    constructor(data){
        this.title = data.title,
        this.description = data.description,
        this.hourlyPay = data.hourlyPay,
        this.jobLocation = data.jobLocation,
        this.employer = data.employer,
        this.arrangements = data.arrangements,
        this.employementTypes = data.employementTypes,
        this.company = data.company,
        this.datePosted = data.datePosted,
        this.jobId = data.id

    }

    toDBFormat() {
        return {
            title: this.title,
            description: this.description,
            hourly_pay: this.hourlyPay,
            job_location: this.jobLocation,
            employer: this.employer,
            arrangements: this.arrangements,
            employement_types: this.employementTypes
        };
    }
    
    static fromDBFormat(dbData) {
        return new JobDTO({
            title: dbData.title,
            description: dbData.description,
            hourlyPay: dbData.hourly_pay,
            jobLocation: dbData.job_location,
            employer: dbData.employer,
            arrangements: dbData.arrangements,
            employementTypes: dbData.employement_types,
            datePosted: dbData.dateposted,
            company: CompanyDTO.fromDBFormat(dbData),
            id: dbData.job_id
        });
    }

    static createFromClientFormat(req, res,next)  {
        handleResponseSync(() => {
            const data = req.body;
            const job = new JobDTO({
                title: data.title,
                description: data.description,
                hourlyPay: data.hourlyPay,
                jobLocation: data.location,
                employer: req.session.user.companyId,
                arrangements: data.arrangement.map(i => i.value).join(', '),
                employementTypes: data.employment.map(i => i.value).join(', ')
            });
            res.locals.job = job;
        }, next);   
    }
}

module.exports = JobDTO