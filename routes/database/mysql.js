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
  host:'mysqlinstance.cqel7ccv9iks.us-west-1.rds.amazonaws.com',
  user: 'alirom93',
  password: '',
  database: 'test'
});

db.connect((err) => {
  if(err) { console.log(err); }
  else {
    console.log("Connecting to mysql database");
  }
});

db.name = 'test';

module.exports = db;