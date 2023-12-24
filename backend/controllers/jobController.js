const business = require('../businessLayer/jobBusiness');
const validationService = require('../utils/validationService');

async function getAllJobs(req, res) {
    try{
        const jobs = await business.getAllJobs();
        res.status(200).json({ jobs });
    } catch (error) {
        validationService.handleServerError(error, res);
    }
}

module.exports = {
    getAllJobs
}