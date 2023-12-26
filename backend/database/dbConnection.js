const { client } = require('./dbClient');

async function connectToDatabase() {
    await client.connect();
    console.log('Connected to the database');
}

async function disconnectFromDatabase() {
    await client.end();
    console.log('Disconnected from the database');
}

module.exports = {
    connectToDatabase,
    disconnectFromDatabase
}