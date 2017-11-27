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
/* login */
router.get('/login',(req,res) => {
  res.render('login');
})

router.post('/login',(req,res) => {
  res.redirect('/admin');
})

router.get('/',(req,res) => {
  res.render('dashboard',{isAdmin:true});
})

module.exports = router;