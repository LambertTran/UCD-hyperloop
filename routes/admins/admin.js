
/** =================================
                Packages
**================================== */

// router
const express = require('express');

const router = express.Router();

// middlewares
const VerifyAuth = require('./middlewares/verify-auth');
const Upload = require('./middlewares/upload-img-aws');
const QueryDataBase = require('./middlewares/insert-data');
const GetTeams = require('./middlewares/get-teams');
const GetSubTeam = require('./middlewares/get-subteam');
const DeleteImg = require('./middlewares/delete-img');
const InsertTeamDetail = require('./middlewares/insert-team-detail');

/** =================================
                Body
**================================== */

/** Admin dashboard page */
// GET
router.get('/', VerifyAuth, (req, res) => {
  GetTeams()
    .then((teams) => {
      res.render(
        './admins/dashboard',
        { 
          isAdmin: true,
          isUpload:false,
          isTeam: true,
          teams
        });
    })
    .catch((err) => {
      throw err;
    });
});

/** Subteam page */
router.get('/team/:teamName', VerifyAuth, (req, res) => {
  GetSubTeam(req.params.teamName)
    .then((teamData) => {
      res.render(
        './admins/subteam',
        {
          isAdmin: true,
          isUpload:true,
          message: req.flash('success'),
          teamName:req.params.teamName,
          teamData,
        }
      );
    });
});

/** Upload team detail */
// GET
router.get('/team/:teamName/upload-team-detail', (req, res)=> {
  res.render(
    './admins/upload-team-detail',
    {
      isAdmin: true,
      isUpload:true,
      teamName: req.params.teamName
    }
  )
});

// POST 
router.post('/team/:teamName/upload-team-detail', (req,res) => {
  const data = {
    teamName:req.params.teamName,
    detail : req.body.description
  };
  InsertTeamDetail(data)
    .then(() => {
      req.flash(
        'success',
        'Sucessfully upload team description'
      );
      res.status(200).redirect(`/admin/team/${req.params.teamName}`);
    })
})

/** Upload images */
// GET
router.get('/team/:teamName/upload-image', VerifyAuth, (req, res) => {
  res.render(
    './admins/upload-img',
    {
      isAdmin: true,
      isUpload:true,
      teamName: req.params.teamName
    }
  );
});

// POST
router.post('/team/:teamName/upload-image', VerifyAuth, Upload.array('img') ,(req,res) => {
  const data = {
    team: req.params.teamName,
    imgLink: req.files[0].location,
    description: req.body.description
  };
  const insertNewData = new QueryDataBase(data);
  insertNewData.Insert()
    .then(() => {
      req.flash(
        'success',
        'Sucessfully upload image'
      );
      res.status(200).redirect(`/admin/team/${req.params.teamName}`);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
});

// Delete 
router.get('/team/:teamName/:imgId', VerifyAuth,(req,res) => {
  DeleteImg(req.params.imgId)
    .then(() => {
      req.flash(
        'success',
        'Sucessfully delete image'
      )
      res.status(200).redirect(`/admin/team/${req.params.teamName}`);
    })
    .catch(() =>{
      res.status(401).send(err);
    })
});

module.exports = router;
