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
const db = require('../database/mysql-db.js');
const bcrypt  = require('bcryptjs');

// middlewares
const VerifyAuthentication = require('./middlewares/verify-auth');

/** =================================
                Body
**==================================*/

/** admin page **/
router.get('/', VerifyAuthentication ,(req,res) => {
  res.render('dashboard',{isAdmin:true});
})

module.exports = router;