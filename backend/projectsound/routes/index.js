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
            const match = await bcrypt.compare(password, userData.password);
            if (match) {
                console.log('Matched');
                // Create a token with user information, not the password
                const accessToken = jwt.sign({ id: userData._id }, process.env.ACCESS_TOKEN); // Use user ID for token
                return res.json({ accessToken: accessToken, user: userData.username, userId: userData._id });
            } else {
                return res.status(401).json({ error: 'Username or password is incorrect' });
            }

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

// Middleware to validate JWT token
function authenticateToken(req, res, next) {
    // Get token from headers
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({ error: 'Access denied, no token provided' });
    }

    // Verify token
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }

        // Attach the user to the request object
        req.user = user;
        next(); // Proceed to the next middleware or route handler
    });
}

module.exports = router;
