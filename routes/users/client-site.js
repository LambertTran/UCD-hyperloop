'use strict';
/** =================================
                Packages
**==================================*/

const express = require('express');
const router  = express.Router();

/** =================================
                Body
**==================================*/

/** homepage **/
router.get('/',(req,res) => {
  res.render('homepage',{home:true});
})

/** teampage **/
router.get('/teams', (req,res) => {
  res.render('teams',{teams:true});
});


module.exports = router;    