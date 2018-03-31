/**
 * Handling authentication - Admin user
 * Logic flow: 
 *    1. Display the login page of if user has not login yet
 *    2. If user already logged in, redirect them to Admin dashboard
 *    3. If user tries to login, check the ID and Password in the database
 *    4. If it matches, redirect user to Admin dashboard
 *    5. If not, display error 
 */

/** =================================
                Packages
**================================== */
// router
const express = require('express');

// user authentication
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// database
const db = require('../database/mysql-db.js');
const bcrypt = require('bcryptjs');

const router = express.Router();

/** =================================
            Authentication
**================================== */

/** Login */

// GET request
// Check if there is already exist admin user.
// If yes, then redirect to admin page
router.get('/login',(req,res) => {
  if(req.user){
    res.redirect('admin');
  } else {
    var message = req.flash('error');
    res.render('./admins/login',{message:message[0]});
  }
})

// POST request
// Validating user input if its correct -> redirect to admin page
router.post('/login',
  passport.authenticate('local',{
    successRedirect:'/admin',
    failureRedirect:'/login',
    badRequestMessage:'Both fields are required',
    failureFlash:true
  })
);

/** log out */
router.get('/logout', function(req, res){
  req.logout();
  req.session.destroy((err) => {
    res.redirect('/login');
  });
});

/** Helper */
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
  done(null, user); // this line will attach req.user
});

passport.deserializeUser(function(user,done) {
  done(null,user); // this line will remove req.user 
})

function ValidateUser(username,password){
  // look for username
  return new Promise((resolve,reject) => {

    var sql = `SELECT * FROM admin WHERE user = '${username}'`;

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