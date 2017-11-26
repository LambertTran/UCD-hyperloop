'use strict';
/** =================================
                Packages
**==================================*/

const express = require('express');
const router  = express.Router();
var mysql = require('mysql');
/** =================================
                Body
**==================================*/
/** mysql database **/
const db = mysql.createConnection({
  host:'localhost',
  user: 'root',
  password: 'Lamson123',
  database: 'nodemysql'
});

db.connect((err) => {
  if(err) { throw err; }
  console.log("Connecting to mysql database");
});

/** database route **/
router.get('/create/db',(req,res) => {
  let sql = 'CREATE DATABASE nodemysql';
  db.query(sql, (err,result) => {
    if (err) throw err;
    console.log(result);
    res.send("database created...");

  });
})

router.get('/create/table', (req, res) => {
  let sql = "CREATE TABLE posts(id int AUTO_INCREMENT, user VARCHAR(255), password VARCHAR(255))";
  
  db.query(sql,(err,result) => {
    if(err) throw err;
    console.log(result);
    res.send("Create table...")

  })

});

module.exports = router;