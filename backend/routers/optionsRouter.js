const { Router } = require('express'); 
const data = require('../dataLayer/optionsData')
const app = Router(); 
const {handleResponseAsync,  payload} = require('../utils/responseHelper');

app.get('/arrangements', async (req, res, next) => {
    await handleResponseAsync( async () => {
        const arrangements = (await data.getArrangements()).map(item => item.work_arrangement_name);
        payload(arrangements, res);
    }, next);
});

app.get('/employemnttypes', async (req, res, next) => {
    await handleResponseAsync( async () => {
        const employementTypes = (await data.getEmployementTypes()).map(item => item.employement_type_name);
        payload(employementTypes, res);
    }, next);
});

module.exports = app;