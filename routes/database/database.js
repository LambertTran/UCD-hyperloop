'use strict';
/** =================================
                Packages
**==================================*/

const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');
const db   = require("./mysql");

/** =================================
                Body
**==================================*/

/** create database **/
router.get('/create/db',(req,res) => {
  let sql = 'CREATE DATABASE test';
  db.query(sql, (err,result) => {
    if (err){ console.log(err)}
    else {
      res.send("database created...");
    }
  });
})

/** create admin table **/
router.get('/create/admin', (req, res) => {
  
  // define table parameters
  let sql = "CREATE TABLE IF NOT EXISTS user_data(id int AUTO_INCREMENT,PRIMARY KEY(id), user VARCHAR(255), password VARCHAR(255))";

  // create table using defined params
  db.query(sql,(err,result) => {
    if(err) {
      console.log(err);
      console.log("Cant create table");
    }
  });
  
  // admin identity
  var username = "hyperloop";
  var password = "test123";
  
  // hash password before store into database
  bcrypt.genSalt(10,(err,salt) =>{
    bcrypt.hash(password,salt,(err,hash) => {
      password = hash;
      let sqlInsert = `INSERT INTO user_data (user,password) VALUES ('${username}','${password}')`;
      console.log(sqlInsert);
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


module.exports = router;