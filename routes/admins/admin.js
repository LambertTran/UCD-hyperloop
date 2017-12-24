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
const upload = require('./middlewares/upload-img-aws');

/** =================================
                Body
**==================================*/

/** admin dashboard page **/
// get
router.get('/', VerifyAuthentication ,(req,res) => {
  res.render('dashboard',{isAdmin:true});
})

/** upload images **/
// GET
router.get('/team/:name/upload-image', VerifyAuthentication ,(req,res) => {
  res.render('upload-img',{isAdmin:true});
})
// POST
router.post('/team/:name/upload-image', VerifyAuthentication , upload.array('img') ,(req,res) => {
  console.log(req.files[0].location);
  console.log(req.body.description)
})




module.exports = router;