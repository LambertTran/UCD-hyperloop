'use strict';
/** =================================
                Packages
**==================================*/

const mysql = require('mysql');

// database identidy 
const dbIdentity = require('../../identity/db-identity');

/** =================================
                Body
**==================================*/
/** mysql database **/
const db = mysql.createConnection(dbIdentity);

// table names
db.table = {
  admin:'admin',
  teams:'teams',
  images:'images',
  descriptions:'descriptions'
};

db.connect((err) => {
  if(err) { console.log(err); }
  else {
    console.log("Connecting to mysql database");
  }
});


module.exports = db;