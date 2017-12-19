'use strict';
/** =================================
                Packages
**==================================*/
const mysql = require('mysql');
/** =================================
                Body
**==================================*/
/** mysql database **/
const db = mysql.createConnection({
  host:'localhost',
  user: 'root',
  password: 'abc123',
  database: 'admin'
});

db.connect((err) => {
  if(err) { console.log(err); }
  else {
    console.log("Connecting to mysql database");
  }
});

module.exports = db;