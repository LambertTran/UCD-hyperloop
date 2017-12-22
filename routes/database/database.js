'use strict';
/** =================================
                Packages
**==================================*/

const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');
const db   = require("./mysql-db.js");

/** =================================
                Body
**==================================*/
/** create tables **/
router.get('/create/tables',(req,res) => {
  let teams = `CREATE TABLE IF NOT EXISTS ${db.table.teams}
               ( 
                 team_id INT AUTO_INCREMENT,
                 teams VARCHAR(100) NOT NULL,
                 PRIMARY KEY (team_id)
               )
              `
  let images = `CREATE TABLE IF NOT EXISTS ${db.table.images} 
                (
                  img_id INT AUTO_INCREMENT,
                  team_id INT NOT NULL,
                  img_link VARCHAR(255) NOT NULL,
                  PRIMARY KEY (img_id),
                  FOREIGN KEY (team_id) REFERENCES teams(team_id)
                )
               `
  let descriptions = `CREATE TABLE IF NOT EXISTS ${db.table.descriptions}
                     (
                      id INT AUTO_INCREMENT,
                      img_id INT NOT NULL,
                      descriptions VARCHAR(1000) NOT NULL,
                      PRIMARY KEY (id),
                      FOREIGN KEY (img_id) REFERENCES images(img_id)
                     )
                    `
  db.query(teams, (err,result) => {
    if (err){ 
      console.log(err) 
      console.log("Cant create team table")
    }
  });
  db.query(images, (err,result) => {
    if (err){ 
      console.log(err) 
      console.log("Cant create images table")
    }
  });
  db.query(descriptions, (err,result) => {
    if (err){ 
      console.log(err) 
      console.log("Cant create description table")
    }
  });
  res.send('Successfully create table');
})

/** create admin table **/
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
  var username = "hyperloop";
  var password = "test123";
  
  // hash password before store into database
  bcrypt.genSalt(10,(err,salt) =>{
    bcrypt.hash(password,salt,(err,hash) => {
      password = hash;
      let sqlInsert = `INSERT INTO ${db.table.admin} (user,password) VALUES ('${username}','${password}')`;
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