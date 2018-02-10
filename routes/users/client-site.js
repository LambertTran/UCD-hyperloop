
/** =================================
                Packages
**================================== */

const express = require('express');
const router = express.Router();

// helpers
const HandleSendEmail = require('./middlewares/send-email');

/** Database */
const QueryDatabase = require('../database/middlewares/query-db');

/** =================================
                Body
**================================== */

/** Homepage */
router.get('/', (req, res) => {
  res.status(200).render('./clients/homepage', { home: true });
});

/** Teampage */
router.get('/teams', (req, res) => {
  const newQuery = new QueryDatabase({team: ''});
  newQuery.GetTeams()
    .then((teams) => {
      teams.forEach((subTeam) => {
        subTeam.display = subTeam.team.replace(/-/g,' ');
      });
      res.status(200).render('./clients/teams',{teams});
    })
    .catch((err) => {
      throw err;
    });
});

/** Sub-team page */
router.get('/teams/:teamName', (req, res) => {
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
      let teamDetail = results[0][0].team_detail.split('\r\n');
      teamData.mainTeamDetail = teamDetail[0];
      teamData.moreDetail = teamDetail.slice(1,teamDetail.length).join('\r\n');
      teamData.teamImg = results[0][0].team_img;
      teamData.imgData = results[1];
      res.status(200).render('./clients/sub-team', {
        teams:true,
        name:req.params.teamName.replace(/-/g,' '),
        teamData,
      })
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

/** Contact page */
// GET
router.get('/contact', (req, res) => {
  res.render('./clients/contact',{
    contact: true,
    message: req.flash('success') || req.flash('error'),
  })
});

// POST - send email
router.post('/contact', (req, res) => {
  let input = req.body;
  let message = "name: "    + input.name.toString() + "\n" +
                "email: "   + input.email.toString() + "\n" + 
                "message: " + input.message.toString() + "\n"; 
  HandleSendEmail(message)
    .then(() => {
      req.flash('success','Sent your email');
      res.status(200).redirect('/contact');
    })
    .catch(() => {
      req.flash('success','Something went wrong! Please email us directly...');
      res.status(401).redirect('/contact');
    })
});

/** Donation page */
// router.get('/donate', (req, res) => {
//   res.render('./clients/donate', { donate:true });
// });


module.exports = router;
