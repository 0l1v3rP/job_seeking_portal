const {handleResponseSync} = require('../utils/responseHelper');

class ApplicationDTO {

    constructor(data) {
        this.resume = data.resume;
        this.jobId = data.jobId;
        this.userId = data.userId;
        this.status = data.status;
    }

    toDBFormat() {
        return {
            job_id : this.jobId,
            user_id: this.userId,
            resume: this.resume,
        } 
    }

    // static fromDBFormat(dbData) {}
      

    static createFromClientFormat(req, res,next)  {
        handleResponseSync(() => {
            const data = req.body;
            let application = new ApplicationDTO({
                resume: data.resume,
                jobId: data.jobId,
                userId: req.session.user.id    
            });
            res.locals.application = application;
        }, next);   
    }
}

const ApplicationStatus = {
    WAITING: 'waiting',
    REJECTED: 'rejected',
    ACCEPTED: 'accepted',
  };
  

module.exports = {
    ApplicationDTO,
    ApplicationStatus
}