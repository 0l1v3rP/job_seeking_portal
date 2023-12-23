const dbHelper = require('../database/dbHelper');

export async function insertUser(user) {
    return await dbHelper.insertRecord(dbHelper.Endpoints.USER ,user);
}

export async function getUserPswd(email) {
    const query = `SELECT password FROM ${dbHelper.Endpoints.USER} WHERE email = $1`;
    return await dbHelper.selectRecords(query, [email]);
}

export async function editUser(user){
    dbHelper.updateRecord(dbHelper.Endpoints.USER ,user, 'email', user.email);
}

export async function deleteUser(email){
    dbHelper.deleteRecord(dbHelper.Endpoints.USER ,'email', email);
}

export async function getAccount(email){
    const query = `SELECT * FROM ${dbHelper.Endpoints.USER} WHERE email = $1`;
    const result = (await dbHelper.selectRecords(query, [email]))[0];
    return result;
}
