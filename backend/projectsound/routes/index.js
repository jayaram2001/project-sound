var express = require('express');
var router = express.Router();
var db = require('../dbconnection');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const connection = await db.connectToDatabase;
});

module.exports = router;
