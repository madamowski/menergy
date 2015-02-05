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
      
     if(users.length===0){
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
         console.error('error reading user');
         res.status(401).send('error reading user');
         return;
     }
      
     if(users.length>0){
         console.error('User already exists');
         res.status(401).send('User already exists');
         return;
     }  
     
    var user = new User({
        username: req.body.username,
        password: req.body.password
    });
    
    user.save(function(err, user) {
        if (err){
          console.error(err);
          res.send(err);
        }

        var token = jsonwebtoken.sign(user, secret, {expiresInMinutes: 1});
        res.json({
          token : token,
          user: user.toJSON()
        });  
      
  });  
      
    //var user = userController.postUsers(req,res);
      
    console.info('login: '+user);
      
    //
//
//        res.json({
//          token : token,
//          user: user.toJSON()
//        });
      
  });
}); 

module.exports = router;
