var express = require('express');
var router = express.Router();
var db = require('../dbconnection');
const { MongoClient, ObjectId } = require('mongodb'); 
const bcrypt = require('bcrypt'); // At the top of your file
const jwt = require('jsonwebtoken');

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
router.post('/validate', async function(req, res, next) {
    const email = req.body.email; // Get email from request body
    const password = req.body.password; // Get password from request body
    console.log(req.body);
    let client;
    let database;

    try {
        // Connect to the database
        const connection = await db.connectToDatabase();
        
        client = connection.client; // Get the client from the connection
        database = connection.db; // Get the database from the connection
        const collection = database.collection('audio-cast'); // Access the collection
        
        // Find user by email
        const userData = await collection.findOne({ email: email });
        console.log(userData ,'user');
        
        if (userData) {
            // Compare the provided password with the hashed password in the database
            bcrypt.compare(password, userData.password, (error, match) => {
                if (error) {
                    console.error('Error comparing passwords:', error);
                    return res.status(500).send('Error comparing passwords');
                }

                if (match) {
                    console.log('Matched');
                    // Create a token with user information, not the password
                    const accessToken = jwt.sign({ id: userData._id }, process.env.ACCESS_TOKEN_SECRET); // Use user ID for token
                    return res.json({ accessToken: accessToken, user: userData.username, userId: userData._id });
                } else {
                    return res.status(401).json({ error: 'Username or password is incorrect' });
                }
            });
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
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
