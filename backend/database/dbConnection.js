const { client } = require('./dbClient');

export async function connectToDatabase() {
    await client.connect();
    console.log('Connected to the database');
}

export async function disconnectFromDatabase() {
    await client.end();
    console.log('Disconnected from the database');
}