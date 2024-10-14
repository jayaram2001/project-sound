var express = require('express');
var router = express.Router();
var db = require('../dbconnection');

router.get('/', async function(req, res, next) {
  try {
    console.log('Attempting to connect to the database...');
    const connection = await db.connectToDatabase();
    console.log('Database connected');
    res.send('Database connected');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    res.status(500).send('Database connection fails');
  }
});


module.exports = router;
