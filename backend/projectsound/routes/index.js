var express = require('express');
var router = express.Router();
var db = require('../dbconnection');
const { MongoClient, ObjectId } = require('mongodb'); 
const bcrypt = require('bcrypt'); // At the top of your file
const jwt = require('jsonwebtoken');
require('dotenv').config();


async function connectToDatabase() {
    try {
      const connection = await db.connectToDatabase();
      console.log("Connected successfully to server");
      return connection.client.db('user');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      throw error;
    }
}

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
                    const accessToken = jwt.sign({ id: userData._id }, process.env.ACCESS_TOKEN); // Use user ID for token
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


router.post('/CreateUser', async function(req, res, next) {
    const { email, password, username } = req.body;
    console.log(req.body ,email , password , username)
    if (!email || !password || !username) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    let database;
    try {
        database = await connectToDatabase();
        const collection = database.collection('audio-cast');

        // Check if user already exists
        const existingUser = await collection.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' });
        }

        const hash = await bcrypt.hash(password, 10);
        const userDetails = { username, email, password: hash };
        const userData = await collection.findOne({ email: email });
        if(userData){
            res.status(304).json({message : 'email already exits'})
        }else{
            const result = await collection.insertOne(userDetails);
            console.log('Document inserted successfully:', result);
            res.status(201).json({ message: 'User created successfully', userId: result.insertedId });
        }

    } catch (error) {
        console.error('Error creating user:', error);
        if (error.name === 'MongoServerError' && error.code === 11000) {
            // Duplicate key error (e.g., unique index violation)
            return res.status(409).json({ error: 'User already exists' });
        }
        if (error.name === 'MongoNetworkError') {
            return res.status(503).json({ error: 'Database connection error' });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
