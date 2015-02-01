var express = require('express');
var userController = require('../controllers/user');

var router = express.Router();

router.route('/api/users')
  .post(userController.postUsers)
  .get(userController.getUsers);

module.exports = router;
