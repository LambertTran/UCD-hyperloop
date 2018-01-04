
/** =================================
                Packages
**================================== */

const express = require('express');
const router = express.Router();
const GetTeams = require('../admins/middlewares/get-teams');
const GetSubTeam = require('../admins/middlewares/get-subteam');

/** Database */
const QueryDatabase = require('../database/middlewares/query-db');

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
  const reqTeamData = {
    team:req.params.teamName,
    img_link:null,
    detail: null
  }
  const newQuery = new QueryDatabase(reqTeamData);
  Promise.all([
    newQuery.GetSubTeamDetail(),
    newQuery.GetSubTeamImg()
  ])
    .then((results) => {
      let teamData = {};
      teamData.teamDetail = results[0][0].team_detail;
      teamData.imageData = results[1];
      res.status(200).render('./clients/sub-team', {
        teams:true,
        name:req.params.teamName,
        teamData,
      })
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});


module.exports = router;
