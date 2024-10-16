var express = require('express');
var router = express.Router();
var db = require('../dbconnection');
const { MongoClient, ObjectId } = require('mongodb'); 

// Route to test database connection
router.get('/', async function(req, res, next) {
    let client;
    try {
        // Connect to the database
        const connection = await db.connectToDatabase();
        client = connection.client; // Assuming the client is part of the returned object
        console.log('Database connected');
        res.send('Database connected');
    } catch (error) {
        console.error('Error connecting to the database:', error);
        res.status(500).send('Database connection fails');
    } finally {
        if (client) {
            await client.close(); // Close the client connection if it was initialized
        }
    }
});

// Route to fetch data from the audio-cast collection
router.get('/validate', async function(req, res, next) {
    let client;
    let database;
    try {
        // Connect to the database
        const connection = await db.connectToDatabase();
        
        client = connection.client; // Get the client from the connection
        database = connection.db; // Get the database from the connection
        const collection = database.collection('audio-cast'); // Access the collection
        const result = await collection.find().toArray(); // Convert cursor to array
        console.log(result);
        res.json(result); // Send the result back as JSON
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    } finally {
        if (client) {
            await client.close(); // Close the client connection if it was initialized
        }
    }
});

module.exports = router;
