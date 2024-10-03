// db.js or your database connection file
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // Replace with your MongoDB connection string
const dbName = 'sound'; // Replace with your database name

export async function connectToDatabase() {
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db(dbName);
        return db; // Return the db instance for further use
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        throw err;
    }
}

module.exports = connectToDatabase; // Ensure you're exporting the function
