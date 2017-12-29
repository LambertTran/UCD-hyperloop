'use strict';

/** =================================
                Packages
**================================== */

const express = require('express');
const router = express.Router();

/** =================================
                Body
**================================== */

/** homepage */
router.get('/', (req, res) => {
  res.render('homepage', { home: true });
})

/** teampage */
router.get('/teams', (req, res) => {
  res.render('teams', { teams: true });
});

/** team */
router.get('/teams/:team', (req, res) => {
  res.render('individual-team', {
    teams: true,
    team: {
      name: 'Team1',
      images: [
        'https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/68dd54ca-60cf-4ef7-898b-26d7cbe48ec7/10-dithering-opt.jpg',
        'https://beebom-redkapmedia.netdna-ssl.com/wp-content/uploads/2016/01/Reverse-Image-Search-Engines-Apps-And-Its-Uses-2016.jpg'
      ]
    },
  });
});


module.exports = router;
