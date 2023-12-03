const { query } = require('express');
const {insert, select, Endpoints  }  = require('../database/dbHelper');

async function insertUser(user) {
    return await insert(Endpoints.USER ,user);
}

async function getUserPswd(email) {
    const query = `SELECT password FROM ${Endpoints.USER} WHERE email = $1`;
    return await select(query, [email]);
}
    
module.exports = { 
    insertUser,
    getUserPswd
 };