const business = require('../businnessLayer/jobsBusiness');
const ValidationService = require('../utils/validationService');

async function getAllJobs(req, res) {
    try{
        const jobs = await business.getAllJobs();
        res.status(200).json({ jobs });
    } catch (error) {
        ValidationService.handleServerError(error, res);
    }
}

module.exports = {
    getAllJobs
}