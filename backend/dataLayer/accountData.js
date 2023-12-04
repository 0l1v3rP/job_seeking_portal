const dbHelper = require('../database/dbHelper');

async function insertUser(user) {
    return await dbHelper.insertRecord(dbHelper.Endpoints.USER ,user);
}

async function getUserPswd(email) {
    const query = `SELECT password FROM ${dbHelper.Endpoints.USER} WHERE email = $1`;
    return await dbHelper.selectRecords(query, [email]);
}

async function editUser(user){
    dbHelper.updateRecord(dbHelper.Endpoints.USER ,user, 'email', user.email);
}

async function deleteUser(email){
    dbHelper.deleteRecord(dbHelper.Endpoints.USER ,'email', email);
}
    
module.exports = { 
    insertUser,
    getUserPswd,
    editUser,
    deleteUser, 
 };