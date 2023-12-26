class JobDTO {
    constructor(data){
        this.title = data.title,
        this.description = data.description,
        this.logoPath = data.logoPath,
        this.hourlyPay = data.hourlyPay,
        this.jobLocation = data.jobLocation,
        this.employer = data.employer
    }

    toDBFormat() {
        return {
            title: this.title,
            description: this.description,
            logo_path: this.logoPath,
            hourly_pay: this.hourlyPay,
            job_location: this.jobLocation,
            employer: this.employer
        };
    }
    
    static fromDBFormat(dbData) {
        return new JobDTO({
            title: dbData.title,
            description: dbData.description,
            logoPath: dbData.logo_path,
            hourlyPay: dbData.hourly_pay,
            jobLocation: dbData.job_location,
            employer: dbData.employer
        });
    }
}

module.exports = JobDTO