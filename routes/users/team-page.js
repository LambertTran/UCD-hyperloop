'use strict';
/** =================================
                Packages
**==================================*/

const express = require('express');
const router  = express.Router();

/** =================================
                Body
**==================================*/

/** teampage **/
router.get('/team', (req,res) => {
  res.render('team-page');
});

module.exports = router;