const { client } = require('./dbClient');

export async function insertRecord(endPoint, dataObj) {
  try {
    const columns = Object.keys(dataObj);
    const values = Object.values(dataObj);
    const query = `INSERT INTO ${endPoint} (${columns.join(', ')}) VALUES (${values.map((_, i) => `$${1 + i}`).join(', ')}) RETURNING *`;

    console.log('Inserting record into:', endPoint);
    const result = await client.query(query, values);
    console.log('Insert result:', result.rows[0]);
  } catch (error) {
    handleDatabaseError('Error inserting into database:', error);
  }
}
  
export async function selectAllRecords(endPoint) {
  try {
    const query = `SELECT * FROM ${endPoint}`;
    const result = await client.query(query);
    console.log('Select all result:', result.rows);
    return result.rows;
  } catch (error) {
    handleDatabaseError('Error selecting from database:', error);
  }
}

export async function selectRecords(query, values = []) {
  try {
    const result = await client.query(query, values);
    console.log('Select result:', result.rows);
    return result.rows;
  } catch (error) {
    handleDatabaseError('Error selecting from database:', error);
  }
}

export async function updateRecord(endPoint, dataObj, keyName, keyValue) {
  handleUpdateOperation(async () => {
    const values = Object.values(dataObj);
    const columns = Object.keys(dataObj);

    const setClause = columns.map((col, index) => `${col} = $${index + 1}`).join(', ');
    const whereClause = `${keyName} = $${columns.length + 1}`;
    const updateQuery = `UPDATE ${endPoint} SET ${setClause} WHERE ${whereClause}`;

    return await client.query(updateQuery, [...values, keyValue]);
  }, endPoint);
}

//field[0] - is attribute name
//fiedd[1] - is value
export async function updateField(endPoint, fieldName, fieldValue, keyName, keyValue ) {
  handleUpdateOperation(async () => {
    const setClause = `${fieldName}=$1`;
    const whereClause = `${keyName} = $2}`;
    const updateQuery = `UPDATE ${endPoint} SET ${setClause} WHERE ${whereClause}`;
    return await client.query(updateQuery, [fieldValue, keyValue]);
  }, endPoint);
}

export async function deleteRecord(endPoint, keyName, keyValue) {
  try {
    const deleteQuery = `DELETE FROM ${endPoint} WHERE ${keyName} = $1`;
    const result = await client.query(deleteQuery, [keyValue]);

    const successMessage = `Record in ${endPoint} deleted successfully`;
    const failureMessage = `No record found in ${endPoint} with ${keyName} = ${keyValue}`;
    handleResult(result, successMessage, failureMessage);
  } catch (error) {
    handleDatabaseError(`Error deleting record in ${endPoint}:`, error);
  }
}

function handleUpdateOperation(action) {
  try {
    const result = action();
    const successMessage = `Record in ${endPoint} updated successfully`;
    const failureMessage = `Failed to update record in ${endPoint}`
    handleResult(result, successMessage, failureMessage);
  } catch (error) {
    handleDatabaseError(`Error updating record in ${endPoint}:`, error);
  }
}


function handleDatabaseError(message, error) {
  console.error(message, error);
  throw error;
}

function handleResult(result, successMessage, failureMessage) {
  if (result.rowCount > 0) {
    console.log(successMessage);
  } else {
    console.error(failureMessage);
    throw new Error(failureMessage);
  }
}

  export const Endpoints = {
    USER: 'user',
    JOB: 'job',
    COMPANY: 'company'
  };