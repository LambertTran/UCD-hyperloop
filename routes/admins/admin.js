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
                Body
**==================================*/

/** admin page **/
/* login */
router.get('/login',(req,res) => {
  if(res.user === undefined){
    res.render('login');
  } else {
    res.redirect('/login');
  }
})

router.post('/login',
  passport.authenticate('local',{
    successRedirect:'/admin',
    failureRedirect:'/login',
    failureFlash:true
  })
);

router.get('/',(req,res) => {
  res.render('dashboard',{isAdmin:true});
})

passport.use(new LocalStrategy(
  (username,password, done) => {
    // check if user enter both field
    if (!username || !passport) {
      return done(null,false, ('message','All fields are required!'));
    }
    if (ValidateUser(username,password)) {
      console.log("good")
      done(null,username);
    }      
  }
));

function ValidateUser(username,password){
  // look for username
  var sql = `SELECT * FROM user_data WHERE user = '${username}'`;
  db.query(sql,(err,result) => {
    if (err) {
      console.log('Cant find user');
      return false;
    };
    // look for password
    bcrypt.compare(password,result[0].password,(err) => {
      if (err) {
        console.log("password is not matched");
        return false;
      }
      console.log("look good")
    })
  });
  return true;
}

module.exports = router;