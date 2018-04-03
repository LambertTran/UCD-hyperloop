/**
 * Handling any route relate to CMS (or admin)
 * Current functionalities: 
 *    + Display Admin dashboard
 *    + Upload team image + description about the team
 *    + Upload/Delete updates of what team working on 
 */


/** =================================
                Packages
**================================== */

// router
const express = require('express');
const router = express.Router();

// express multer for upload
const multer  = require('multer')
const upload = multer({ storage: multer.memoryStorage() })

// middlewares
const VerifyAuth = require('./middlewares/verify-auth');
const QueryDataBase = require('../database/middlewares/QueryDataBase');
const AdminStatus = require('./middlewares/status-handler');

// GCP
const imgHandler = require('./middlewares/image-handler');


/** =================================
                Body
**================================== */

/** Admin dashboard page */
// GET
router.get('/', VerifyAuth, (req, res) => {
  const status = AdminStatus(true,false,false,false);
  QueryDataBase.prototype.GetTeams()
    .then((teams) => {
      res.render(
        './admins/dashboard',
        {...status,teams}
      );
    })
    .catch((err) => {
      throw err;
    });
});

/** Subteam page */
router.get('/team/:teamName', VerifyAuth, (req,res) => {
  const status = AdminStatus(true,true,true,false);
  const newQuery = new QueryDataBase({team:req.params.teamName});
  newQuery.GetSubTeamDetail()
    .then((teamData) => {
      teamData = teamData[0];
      res.render(
        './admins/subteam',
        {...status,...teamData,message:req.flash('success')}
      );
    })
    .catch((err) =>{
      throw err;
    })
})


/** Upload team image - 1 single image represent the */
// POST
router.post('/team/:teamName/upload-image', VerifyAuth, upload.single('img'), async (req, res) => {
  const newImage = await imgHandler.upload(req.file);
  const newQuery = new QueryDataBase({
    team: req.params.teamName,
    imgLink: newImage,
    description: null,
  });
  newQuery.InsertTeamImg()
    .then(() => {
      req.flash('success','Uploaded team image');
      res.status(200).redirect(`/admin/team/${req.params.teamName}`)
    })
    .catch((err) => {
      console.error(err);
      res.status(400)
    });
});

/** Manage team detail */
// POST 
router.post('/team/:teamName/upload-team-detail', VerifyAuth, (req,res) => {

  const newQuery = new QueryDataBase({
    team: req.params.teamName,
    detail: req.body.description,
  });

  newQuery.InsertTeamDetail()
    .then(() => {
      req.flash(
        'success',
        'Uploaded team description'
      );
      res.status(200).redirect(`/admin/team/${req.params.teamName}`);
    })
})

/** Manage team members */
// GET
router.get('/team/:teamName/members', VerifyAuth, (req, res) => {

  const status = AdminStatus(true,true,false,false,true);
  
  const newQuery = new QueryDataBase({team:req.params.teamName})
  newQuery.GetSubTeamMembers()
    .then((teamData) => {
      res.render(
        './admins/member-folder',
        {
          ...status,
          message: req.flash('success'),
          team:req.params.teamName,
          teamData,
        }
      );
    });
});

// POST
router.post('/team/:teamName/members/upload-image', VerifyAuth, upload.single('img'), async (req,res) => {
  const newImage = await imgHandler.upload(req.file);
  const insertNewMember = new QueryDataBase({
    team: req.params.teamName,
    imgLink: newImage,
    memberName: req.body.name,
    memberTitle: req.body.title,
  });
  insertNewMember.InsertMember()
    .then(() => {
      req.flash(
        'success',
        'Uploaded your image'
      );
      res.status(200).redirect(`/admin/team/${req.params.teamName}/members`);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
});

/** Upload updates that team working on */
// GET
router.get('/team/:teamName/updates', VerifyAuth, (req, res) => {
  const status = AdminStatus(true,true,false,true);
  const newQuery = new QueryDataBase({team:req.params.teamName})
  newQuery.GetSubTeamImg()
    .then((teamData) => {
      res.render(
        './admins/update-folder',
        {
          ...status,
          message: req.flash('success'),
          team:req.params.teamName,
          teamData,
        }
      );
    });
});

// POST
router.post('/team/:teamName/updates/upload-image', VerifyAuth, upload.single('img'), async (req,res) => {
  const newImage = await imgHandler.upload(req.file);
  const insertNewData = new QueryDataBase({
    team: req.params.teamName,
    imgLink: newImage,
    detail: req.body.description
  });
  insertNewData.InsertWorkImg()
    .then(() => {
      req.flash(
        'success',
        'Uploaded your image'
      );
      res.status(200).redirect(`/admin/team/${req.params.teamName}/updates`);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
});

// Delete 
router.post('/team/:teamName/updates/:imgId', VerifyAuth, async (req,res) => {
  const isDeleted = await imgHandler.delete(req.params.imgId);
  if (isDeleted) {
    req.flash(
      'success',
      'Deleted image'
    )
    res.status(200).redirect(`/admin/team/${req.params.teamName}/updates`);
  } else {
    req.flash(
      'success',
      'Can NOT delete image'
    )
    res.status(400).redirect(`/admin/team/${req.params.teamName}/updates`);
  }

});

module.exports = router;
