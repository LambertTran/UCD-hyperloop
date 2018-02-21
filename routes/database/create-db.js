
/** =================================
                Packages
**================================== */

const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

// Helpers
const db = require('./mysql-db.js');
const CreateTable = require('./middlewares/create-table');
const InsertTeam = require('./middlewares/insert-team');

/** =================================
                Body
**================================== */
/*
  To create Database for UC Davis Hyperloop
    1. Send GET request to /create/tables
    2. Insert desired username and password in CREATE ADMIN TABLE
    3. Send GET request to /create/admin
    4. Send GET request to /insert/teams
*/


/** Create tables */
router.get('/create/tables',(req, res) => {
  CreateTable()
    .then(() => {
      res.status(200).send({message: 'Successfully create table'});
    })
    .catch(() => {
      res.status(401).send({message: 'Cant create tables'});
    });  
});

/** Create admin table */
router.get('/create/admin', (req, res) => {
  
  // define table parameters
  let sql = `CREATE TABLE IF NOT EXISTS ${db.table.admin} (id int AUTO_INCREMENT,PRIMARY KEY(id), user VARCHAR(255), password VARCHAR(255))`;

  // create table using defined params
  db.query(sql,(err,result) => {
    if(err) {
      console.log(err);
      console.log("Cant create table");
    }
  });
  
  // admin identity
  var username = "hyperloop"; // add username here
  var password = "test123"; // add password here
  
  // hash password before store into database
  bcrypt.genSalt(10,(err,salt) =>{
    bcrypt.hash(password,salt,(err,hash) => {
      password = hash;
      let sqlInsert = `INSERT INTO ${db.table.admin} (user,password) VALUES ('${username}','${password}')`;
      db.query(sqlInsert, (err,result) => {
        if (err) {
          console.log(err);
          console.log("Cant insert data into table");
        }else {
          res.send("Insert sucessfully");
        }
      })
    });
  });
});

/** Insert team data into teams table */
router.get('/insert/teams', (req,res) => {
  InsertTeam()
    .then(() => {
      res.status(200).send({message: 'Successully insert teams'})
    })
    .catch(() => {
      res.status(401).send({message: 'Cant insert teams'})
    });
})


module.exports = router;