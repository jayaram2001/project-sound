// Import MongoClient and ObjectId from the 'mongodb' package
const { MongoClient, ObjectId } = require('mongodb'); 

// MongoDB connection URI and database name
const uri = 'mongodb://localhost:27017'; 
const dbName = 'user'; 

// Connect to the MongoDB database
async function connectToDatabase() {
    const client = new MongoClient(uri);

    try {
        await client.connect(); // Connect to the MongoDB server
        const db = client.db(dbName); // Select the database
        return {client , db}; 
    } catch (err) {
        console.error("Failed to connect to MongoDB", err); // Log connection errors
        throw err; // Propagate error
    }
}

// Export the connectToDatabase function and ObjectId for use in other files
module.exports = { connectToDatabase, ObjectId };
