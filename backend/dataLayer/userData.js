const dbHelper = require('../database/dbHelper');
const UserDTO = require('../models/user')
const {mapAllFromDbFormat} = require('../utils/mapper')

async function insertUser(user) {
    const dbUser = user.toDBFormat();
    const result = await dbHelper.insertRecord(dbHelper.Endpoints.USER ,dbUser);
    const resultModel = UserDTO.fromDBFormat(result);
    return resultModel;
}

async function getUserPswd(email) {
    const query = `SELECT password FROM "${dbHelper.Endpoints.USER}" WHERE email = $1`;
    return await dbHelper.selectRecords(query, [email]);
}

async function getUserId(email) {
    const query = `SELECT user_id FROM "${dbHelper.Endpoints.USER}" WHERE email = $1`;
    return (await dbHelper.selectRecords(query, [email]))[0];
}

async function editUser(user) {
    const dbUser = user.toDBFormat();
    const keyName = 'email';
    const result = await dbHelper.updateRecord(dbHelper.Endpoints.USER ,dbUser, keyName, user.email);
    const resultModel = UserDTO.fromDBFormat(result[0]);
    return resultModel;
}

async function deleteUser(email) {
    await dbHelper.deleteRecord(dbHelper.Endpoints.USER ,'email', email);
}

async function getAccount(email) {
    const query = `SELECT * FROM "${dbHelper.Endpoints.USER}" WHERE email = $1`;
    const result = await dbHelper.selectRecords(query, [email]);
    const resultModel = UserDTO.fromDBFormat(result[0]);
    return resultModel;
}

async function userExist(email) {
    const query = `SELECT 1 FROM "${dbHelper.Endpoints.USER}" WHERE email = $1`;
    const result = await dbHelper.selectRecords(query, [email]);
    return result;
}

async function getAllUsers() {
    const result = await dbHelper.selectAllRecords(dbHelper.Endpoints.USER);
    const resultModel = mapAllFromDbFormat(result, UserDTO);
    return resultModel;
}

async function registerCompanytoUser(userId, companyId) {
    const fieldName = 'user_company';
    const keyName = 'user_id';
    await dbHelper.updateField(dbHelper.Endpoints.USER, fieldName, companyId, keyName, userId); 
}

async function userHasCompany() {
    const query = `SELECT 1 FROM "${dbHelper.Endpoints.USER}" WHERE user_company IS NOT NULL`;
    return await dbHelper.selectRecords(query, [email]);
}


module.exports = {
    insertUser,
    getUserPswd,
    editUser,
    deleteUser,
    getAccount,
    registerCompanytoUser,
    userExist,
    getAllUsers,
    getUserId,
    userHasCompany,
}