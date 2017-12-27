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

// middlewares
const VerifyAuthentication = require('./middlewares/verify-auth');
const Upload = require('./middlewares/upload-img-aws');
const QueryDataBase = require('./middlewares/insert-data');

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
router.get('/team/:name/upload-image',(req,res) => {
  res.render('upload-img',
    {
      isAdmin:true,
      teamName:req.params.name
    }
  );
})

// POST
router.post('/team/:name/upload-image', Upload.array('img') ,(req,res) => {
  var data = {
    team:req.params.name,
    imgLink: req.files[0].location,
    description: req.body.description
  }
  var insertNewData = new QueryDataBase(data);
  insertNewData.Insert();
  res.status(200).send({message: "Upload Sucessfully"})
})




module.exports = router;