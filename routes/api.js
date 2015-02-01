var express = require('express');
var router = express.Router();

//HEADER
//Authorization=Bearer your-token

/* GET home page. */
router.get('/test', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;