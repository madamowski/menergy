var express = require('express');
var router = express.Router();

var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res) {
  //res.render('index', { title: 'Express' });
  res.sendfile('views/index.html');
});

router.get('/test', function(reg,res){
   res.json({
        gas : 100,
        electricity: 200
        }); 
});

module.exports = router;
