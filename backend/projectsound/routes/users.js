var express = require('express');
var router = express.Router();
const db = require('../dbconnection'); // Import your DB connection function
const bcrypt = require('bcrypt'); // For password hashing and comparison
const mongoose = require('mongoose');

// Create a Mongoose schema and model for 'audio-cast' collection
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  username: String,
});

// Define the model and explicitly specify the collection name 'audio-cast'
const User = mongoose.model('User', userSchema, 'audio-cast');

// Route to fetch all users
router.get('/', async (req, res) => {
  // try {
  //   const users = await User.find(); // Fetch all users from 'audio-cast' collection
  //   res.json(users); // Send the users as JSON response
  // } catch (err) {
  //   res.status(500).json({ message: err.message });
  // }
});

module.exports = router;
