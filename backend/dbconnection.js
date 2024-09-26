const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // Change this if your MongoDB instance is elsewhere
const dbName = 'audiocast';

async function con() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        const db = client.db(dbName);
        return db;
    } catch (err) {
        console.error(err);
        throw err; // Rethrow the error for handling
    } finally {
        // Uncomment the following line if you want to close the connection after one use
        // await client.close();
    }
}