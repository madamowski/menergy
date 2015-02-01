var express = require('express');
var jsonwebtoken = require('jsonwebtoken');
//var userController = require('../controllers/user');
var User = require('../models/user');
var userController = require('../controllers/user');

var secret = "top secret";

var router = express.Router();

router.post('/login', function (req, res) {
  //validate req.body.username and req.body.password
  //if is invalid, return 401
            
  User.find({'username':req.body.username},function(err,users){
            
     if(err){
         res.status(401).send('Wrong username');
         return;
     }
      
     if(users.length==0){
         res.status(401).send('User not found');
         return;
     }  
      
     var user = users[0];
      
     user.verifyPassword(req.body.password,function(err,ismatch){
        if (err){
            res.status(401).send('Could not verify password');
            return;
        }
        
        if(!ismatch){
            res.status(401).send('Wrong password');
            return;
        }
         
        var token = jsonwebtoken.sign(user, secret, {expiresInMinutes: 1});

        res.json({
          token : token,
          user: user.toJSON()
        });
     }); 
  });
}); 

router.post('/register', function (req, res) {
  //validate req.body.username and req.body.password
  //if is invalid, return 401    
    
  User.find({'username':req.body.username},function(err,users){
            
     if(err){
         res.status(401).send('Wrong username');
         return;
     }
      
     if(users.length>0){
         res.status(401).send('User already exists');
         return;
     }  
     
    userController.postUsers(req,res);
      
  });
}); 

module.exports = router;
