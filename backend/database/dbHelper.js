const { client } = require('./dbClient');
const {UnsuccessfullOperationException, DatabaseErrorException} = require('../utils/exceptions');

async function insertRecord(endPoint, dataObj) {
  await handleDatabaseOperation(async () => {
    const columns = Object.keys(dataObj);
    const values = Object.values(dataObj);
    const query = `INSERT INTO "${endPoint}" (${columns.join(', ')}) VALUES (${values.map((_, i) => `$${1 + i}`).join(', ')}) RETURNING *`;

    console.log('Inserting record into:', endPoint);
      const result = await client.query(query, values);
    console.log('Insert result:', result.rows[0]);
  }, `Error inserting into database | table: ${endPoint}`);
} 

async function selectAllRecords(endPoint) {
  return await handleDatabaseOperation(async () => {
    const query = `SELECT * FROM "${endPoint}"`;
    const result = await client.query(query);
    console.log('Select all result:', result.rows);
    return result.rows;
  },`Error selecting from database | table: ${endPoint}`);
  
}

async function selectRecords(query, values = []) {
  return await handleDatabaseOperation(async () => {
    const result = await client.query(query, values);
    console.log('Select result:', result.rows);
    return result.rows;
  }, `Error selecting from database`);
}

async function updateRecord(endPoint, dataObj, keyName, keyValue) {
  return await handleUpdateOperation(async () => {
    const values = Object.values(dataObj);
    const columns = Object.keys(dataObj);
    const setClause = columns.map((col, index) => `${col} = $${index + 1}`).join(', ');
    const whereClause = `${keyName} = $${columns.length + 1}`;
    const updateQuery = `UPDATE "${endPoint}" SET ${setClause} WHERE ${whereClause} RETURNING *`;
    return await client.query(updateQuery, [...values, keyValue]);
  }, endPoint);
}

async function updateField(endPoint, fieldName, fieldValue, keyName, keyValue ) {
  return await handleUpdateOperation(async () => {
    const setClause = `${fieldName}=$1`;
    const whereClause = `${keyName} = $2}`;
    const updateQuery = `UPDATE "${endPoint}" SET ${setClause} WHERE ${whereClause} RETURNING *`;
    return await client.query(updateQuery, [fieldValue, keyValue]);
  }, endPoint);
}

async function deleteRecord(endPoint, keyName, keyValue) {
  await handleDatabaseOperation(async () => {
    const deleteQuery = `DELETE FROM "${endPoint}" WHERE ${keyName} = $1`;
    const result = await client.query(deleteQuery, [keyValue]);
    const successMessage = `Record in ${endPoint} deleted successfully`;
    const failureMessage = `No record found in ${endPoint} with ${keyName} = ${keyValue}`;
    handleResult(result, successMessage, failureMessage);
  },`Error deleting record from database | table: ${endPoint}`);
}

//---------------------------HANDLER FUNCTIONS FOR DATABASE OPERATIONS------------------------------- 

async function handleUpdateOperation(action, endPoint) {
  await handleDatabaseOperation(async () => {
    const result = await action();
    const successMessage = `Record in ${endPoint} updated successfully`;
    const failureMessage = `Failed to update record in ${endPoint}`
    handleResult(result, successMessage, failureMessage);
  }, `Error updating database | table: ${endPoint}`);
}

async function handleDatabaseOperation(action, message) {
  try {
    return await action();
  } catch (er){
    console.error(message);
    throw new DatabaseErrorException(message, 401)  } 
}

function handleResult(result, successMessage, failureMessage) {
  if (result.rowCount > 0) {
    console.log(successMessage);
  } else {
    console.error(failureMessage);
    throw new UnsuccessfullOperationException(failureMessage);
  }
}

//----------------------------------------------------------------------------------------------------


const Endpoints = {
  USER: 'user',
  JOB: 'job',
  COMPANY: 'company'
};

module.exports = {
  insertRecord,
  selectAllRecords,
  selectRecords,
  deleteRecord,
  updateRecord,
  updateField,
  Endpoints
}