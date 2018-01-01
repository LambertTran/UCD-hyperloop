
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

// /** Subteam page */
// router.get('/teams/:name', VerifyAuth, (req, res) => {
//   res.render(
//     'admin-subteam',
//     team:
// });


/** Upload images */
// GET
router.get('/team/:name/upload-image', (req, res) => {
  res.render(
    './admins/upload-img',
    {
      isAdmin: true,
      teamName: req.params.name
    }
  );
});

// POST
router.post('/team/:name/upload-image', Upload.array('img') ,(req,res) => {
  const data = {
    team: req.params.name,
    imgLink: req.files[0].location,
    description: req.body.description
  };
  const insertNewData = new QueryDataBase(data);
  insertNewData.Insert()
    .then(() => {
      res.status(200).send({ message: 'Sucessfully upload iamges'});
    })
    .catch((err) => {
      res.status(400).send(err);
    })
});

module.exports = router;
