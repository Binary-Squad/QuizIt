const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

function ValidateEmail(email){
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
    return true
  }
    return false
}

// Register
router.post('/register', (req, res, next) => {
  const errors = [];
  let newUser = new User ({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  if(!ValidateEmail(newUser.email)){
    errors.push("You must enter a valid email address (example@quizit.com)")
  }
  if(newUser.username.length < 3 || newUser.username.length >20){
    errors.push("Username must be 3 to 20 characters long")
  }
  if(newUser.password.length < 3 || newUser.password.length >20){
    errors.push("Password must be 3 to 20 characters long")
  }
  if (errors.length > 0){
    res.json({errors})
  }
  else{
    User.getUserByUsername(newUser.username,function(err,userInfo){
      if(userInfo){
        errors.push("Username already registered")
        res.json({errors});
      }
      if(!userInfo){
        User.findOne({email:newUser.email},function(err,emailInfo){
          if(emailInfo){
            errors.push("Email already registered")
            res.json({errors})
          }
          if(!emailInfo){
            User.addUser(newUser, (err, user) => {
              if(err) {
                res.json({success: false, msg: 'Failed to register user', err:err});
              } else {
                res.json({success: true, msg: 'User registered'});
              }
            });
          }
        })
      }
    })
  }
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user) {
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch) {
        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: 604800 // 1 week
        });
        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        })
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  if(req.user){
    console.log(req.user);  
  }
  res.json({user: req.user});
});

module.exports = router;
