
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
          isTeam: true,
          teams
        });
    })
    .catch((err) => {
      throw err;
    });
});

/** Subteam page */
router.get('/team/:teamName', (req, res) => {
  GetSubTeam(req.params.teamName)
    .then((teamData) => {
      res.render(
        './admins/subteam',
        {
          isAdmin: true,
          message: req.flash('success'),
          teamName:req.params.teamName,
          teamData,
        }
      );
    });
});


/** Upload images */
// GET
router.get('/team/:teamName/upload-image', (req, res) => {
  res.render(
    './admins/upload-img',
    {
      isAdmin: true,
      teamName: req.params.teamName
    }
  );
});

// POST
router.post('/team/:teamName/upload-image', Upload.array('img') ,(req,res) => {
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
        'Sucessfully upload iamges'
      );
      res.status(200).redirect(`/admin/team/${req.params.teamName}`);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
});

// Delete 
router.get('/team/:teamName/:imgId',(req,res) => {
  DeleteImg(req.params.imgId);
});

module.exports = router;
