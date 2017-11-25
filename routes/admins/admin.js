'use strict';
/** =================================
                Packages
**==================================*/

const express = require('express');
const router  = express.Router();

/** =================================
                Body
**==================================*/

/** admin page **/
router.get('/login',(req,res) => {
  res.render('login');
})

router.get('/dashboard',(req,res) => {
  res.render('dashboard');
})

module.exports = router;