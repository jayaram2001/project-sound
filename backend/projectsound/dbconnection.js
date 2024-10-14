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
        
        if (db) {
            const collection = db.collection('audio-cast'); // Access the collection
            
            // Query for a document by its _id
            const query = { _id: new ObjectId('67057f1948ec5adf8ed698bc') };
            const result = await collection.find(); // Find one document
            
            // Log the result
            if (result) {
                console.log('Document found:', result);
            } else {
                console.log('No document matches the provided query.');
            }
        }

        return db; // Return the database instance
    } catch (err) {
        console.error("Failed to connect to MongoDB", err); // Log connection errors
        throw err; // Propagate error
    } finally {
        await client.close(); // Ensure the client is closed
    }
}

// Export the connectToDatabase function and ObjectId for use in other files
module.exports = { connectToDatabase, ObjectId };
