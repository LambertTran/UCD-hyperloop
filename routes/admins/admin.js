
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
const InsertTeamDetail = require('./middlewares/insert-team-detail');

// GCP
const imgHandler = require('./middlewares/image-handler');

// AWS
// const DeleteImg = require('./middlewares/delete-img');
const Upload = require('./middlewares/upload-img-aws');

/** =================================
                Body
**================================== */
function AdminStatus(isAdmin, isSubteam, subteamFolder, imageFolder){
  return {
    isAdmin,
    isSubteam,
    subteamFolder,
    imageFolder,
  }
}

/** Admin dashboard page */
// GET
router.get('/', (req, res) => {
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
router.get('/team/:teamName', (req,res) => {
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


/** Upload team image */
// POST
router.post('/team/:teamName/upload-image', upload.single('img'), async (req, res) => {
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

/** Upload team detail */
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
        'Uploaded team description'
      );
      res.status(200).redirect(`/admin/team/${req.params.teamName}`);
    })
})

/** Upload images that team working on */
// GET
router.get('/team/:teamName/images', (req, res) => {
  const status = AdminStatus(true,true,false,true);
  const newQuery = new QueryDataBase({team:req.params.teamName})
  newQuery.GetSubTeamImg()
    .then((teamData) => {
      res.render(
        './admins/images',
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
router.post('/team/:teamName/images/upload-image', VerifyAuth, upload.single('img'), async (req,res) => {
  const newImage = await imgHandler.upload(req.file);
  const data = {
    team: req.params.teamName,
    imgLink: newImage,
    description: req.body.description
  };
  const insertNewData = new QueryDataBase(data);
  insertNewData.Insert()
    .then(() => {
      req.flash(
        'success',
        'Uploaded your image'
      );
      res.status(200).redirect(`/admin/team/${req.params.teamName}/images`);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
});

// Delete 
router.get('/team/:teamName/images/:imgId', VerifyAuth,(req,res) => {
  DeleteImg(req.params.imgId)
  
    .then(() => {
      req.flash(
        'success',
        'Deleted image'
      )
      res.status(200).redirect(`/admin/team/${req.params.teamName}/images`);
    })
    .catch(() =>{
      res.status(401).send(err);
    })
});

module.exports = router;
