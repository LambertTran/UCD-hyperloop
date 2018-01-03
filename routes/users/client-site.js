
/** =================================
                Packages
**================================== */

const express = require('express');
const router = express.Router();
const GetTeams = require('../admins/middlewares/get-teams');
const GetSubTeam = require('../admins/middlewares/get-subteam');

/** =================================
                Body
**================================== */

/** homepage */
router.get('/', (req, res) => {
  res.render('./clients/homepage', { home: true });
});

/** teampage */
router.get('/teams', (req, res) => {
  GetTeams()
    .then((teamData) => {
      res.status(200).render('./clients/teams',{
        teams:true,
        teamData,
      });
    })
    .catch((err) => {
      res.status(400).send(err);
    })
});

/** sub-team page */
router.get('/teams/:teamName', (req,res) => {
  GetSubTeam(req.params.teamName)
    .then((teamData) => {
      res.status(200).render('./clients/sub-team', {
        teams:true,
        name:req.params.teamName,
        teamData,
      })
    })
    .catch((err) => {
      res.status(400).send(err);
    })
});


module.exports = router;
