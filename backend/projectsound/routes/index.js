var express = require('express');
var router = express.Router();
var db = require('../dbconnection')


function con(){
  try{
  this.db.con()
  }
  catch{
    console.log('failed')
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('hgello')
  res.render('index', { title: 'Express' });
});

module.exports = router;
