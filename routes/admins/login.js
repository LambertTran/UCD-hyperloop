'use strict';
/** =================================
                Packages
**==================================*/
// router
const express = require('express');
const router  = express.Router();
// user authentication
const passport= require('passport');
const LocalStrategy = require('passport-local').Strategy;

// database 
const db = require('../database/mysql.js');
const bcrypt  = require('bcryptjs');

/** =================================
            Authentication
**==================================*/

/** Login **/

// GET request
router.get('/login',(req,res) => {
  if(res.user === undefined){
    var message = req.flash('error'); 
    res.render('login',{message:message[0]});
  } else {
    res.redirect('/');
  }
})

// POST request
router.post('/login',
  passport.authenticate('local',{
    successRedirect:'/admin',
    failureRedirect:'/login',
    badRequestMessage:'Both fields are required',
    failureFlash:true
  })
);

/** log out **/
router.get('/logout', function(req, res){
  req.session.destroy((err) => {
    res.redirect('/login');
  });
});

/** Helper **/
passport.use(new LocalStrategy(
  (username,password, done) => {
    // check if user enter both field
    if (!username || !passport) {
      return done(null,false, {message:'Wrong credentials'});
    }
    ValidateUser(username,password)
      .then(() => {
        done(null,username);
      })
      .catch((err) => {
        return done(null,false, {message:'Wrong username or password'});
      })
  }      
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user,done) {
  done(null,user);
})

function ValidateUser(username,password){
  // look for username
  return new Promise((resolve,reject) => {
    var sql = `SELECT * FROM ${db.name} WHERE user = '${username}'`;
    db.query(sql,(err,result) => {
      if (err) {
        return reject(err);
      }
      if (result.length === 0){
        return reject();
      } 
      else {
        // look for password
        bcrypt.compare(password,result[0].password,(err,res) => {
          if (err) {
            return reject(err);
          }
          if (res === false){
            return reject();
          } else {
            return resolve();
          }
        })
      }
    });
  })
}

module.exports = router;