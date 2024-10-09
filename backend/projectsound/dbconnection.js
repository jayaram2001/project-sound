const { MongoClient, ObjectId } = require('mongodb'); // Import ObjectId along with MongoClient

const uri = 'mongodb://localhost:27017'; // Replace with your MongoDB connection string
const dbName = 'user'; // Replace with your database name

async function connectToDatabase() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db(dbName);
        
        if (db) {
            const collection = db.collection('audio-cast');
            const query = { _id: new ObjectId('67057f1948ec5adf8ed698bc') };
            
            // Use await instead of callback
            const result = await collection.findOne(query);
            
            if (result) {
                console.log('Document found:', result);
            } else {
                console.log('No document matches the provided query.');
            }
        }

        return db; // Return the db instance for further use
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        throw err; // You can choose whether to throw or handle the error
    } finally {
        await client.close(); // Ensure the client is closed
    }
}


module.exports = connectToDatabase(); // Export the function, not the result of the function
