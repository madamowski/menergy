var express = require('express');
var emailController = require('../controllers/email');

var router = express.Router();

router.route('/api/testemail')
    .get(emailController.testEmail);

module.exports = router;