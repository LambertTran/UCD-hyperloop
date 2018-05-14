const express = require('express');
const router = express.Router();

// helpers
const TokenAuth = require('./middlewares/TokenAuth');
const QueryDataBase = require('../database/middlewares/QueryDataBase');
const tokenVerifyAuth = require('./middlewares/token-verify-auth');


// Login
router.post('/admin/login', (req,res) => {
  const newAuth = new TokenAuth({
    username: req.body.username,
    password: req.body.password,
  });

  newAuth.validateUSer()
    .then(() => {
      newAuth.generateToken()
        .then((token) => {
          res.status(200).header('admin-auth',token).send();
        })
        .catch((err) => {
          res.status(400).send();
        })
    })
    .catch((err) => {
      res.status(400).send({ Error: "Wrong username or password"});
    })
});

// Admin main page
router.get('/admin/dashboard', (req,res) => {
  QueryDataBase.prototype.GetTeams()
    .then((teams) => {
      res.status(200).send(teams);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// Sub team page
router.get('/admin/team/:teamName', (req,res) => {
  const newQuery = new QueryDataBase({ team:req.params.teamName });

  newQuery.GetSubTeamDetail()
    .then((teamData) => {
      res.status(200).send(teamData)
    })
    .catch((err) =>{
      res.status(400).send(err)
    })
})


module.exports = router;