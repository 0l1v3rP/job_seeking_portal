const { client } = require('./dbClient');

async function insert(endPoint, dataObj){
    try{
      const columns = Object.keys(dataObj);
      const values = Object.values(dataObj);
      const query = `INSERT INTO ${endPoint} (${columns.join(', ')}) VALUES (${values.map((_, i) => `$${1 + i}`).join(', ')}) RETURNING *`;
      console.log('inserting record into: ', endPoint);
      const result = await client.query(query, values);
      console.log('Insert result: ', result.rows[0])
    } catch (error) {
      console.error('Error inserting into database:', error);
      throw error;
    }
  }
  
  async function selectAll(endPoint){
    try {
      const query = `SELECT * FROM ${endPoint}`
      const result = await client.query(query);
      console.log('selectAll result: ', result.rows[0]);
      return result.rows;
    } catch (error) {
      console.error('Error selecting from database:', error);
      throw error;
    }
  }
  
  async function select(query, values = []) {
    try {
      const result = await client.query(query, values);
      console.log('select result: ', result.rows);
      return result.rows;
    } catch (error) {
      console.error('Error selecting from database:', error);
      throw error;
    }
  }
  
  
  const Endpoints = {
    USER: 'users',
  };
  
  module.exports = {
    insert,
    select,
    selectAll,
    Endpoints
  }