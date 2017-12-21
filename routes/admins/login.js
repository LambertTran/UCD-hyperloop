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
    console.log(req.flash('error'));
    res.render('login',{message:req.flash('message')});
  } else {
    res.redirect('/');
  }
})

// POST request
router.post('/login',
  passport.authenticate('local',{
    successRedirect:'/admin',
    failureRedirect:'/login',
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
  {passReqToCallback:true},
  (username,password, done) => {
    // check if user enter both field
    if (!username || !passport) {
      return done(null,false, {message:'All fields are required!'});
    }
    ValidateUser(username,password)
      .then(() => {
        done(null,username);
      })
      .catch((err) => {
        throw err;
      })
  }      
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user,done) {
  // var sql = `SELECT * FROM user_data WHERE id = '${id}'`;
  // db.query(sql,(err,result) => {
  //   done(err,result[0].user)
  // });
  done(null,user);
})

function ValidateUser(username,password){
  // look for username
  return new Promise((resolve,reject) => {
    var sql = `SELECT * FROM user_data WHERE user = '${username}'`;
    db.query(sql,(err,result) => {
      if (err) {
        return reject(err);
      }
      if (result.length === 0){
        return reject(false);
      } 
      else {
        // look for password
        bcrypt.compare(password,result[0].password,(err,res) => {
          if (err) {
            return reject(err);
          }
          if (res === false){
            return reject(false);
          } else {
            return resolve(true);
          }
        })
      }
    });
  })
}

module.exports = router;