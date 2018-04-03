'use strict';
/** =================================
                Packages
**==================================*/

const mysql = require('mysql');
const fs = require('fs');

// database identidy
let dbIdentity;
try{
  // production DB
  // dbIdentity = require('../../identity/prod-db');

  // dev database
  dbIdentity = require('../../identity/db-identity');
} catch(e){
  dbIdentity = require('../../identity-heroku/heroku-db-identity');
}
// dbIdentity = require('../../identity-heroku/heroku-db-identity');

/** =================================
                Body
**==================================*/

/** mysql database **/
let db = mysql.createPool(dbIdentity);

// table names
db.tables = {
  admin:'admin',
  teams:'teams',
  updates:'updates',
  members:'members',
};

function handleDisconnect() {

  // create new connection
  db = mysql.createPool(dbIdentity); 
  
  // re-connect to mySQL and handle err if cant connect
  db.getConnection((err,connection) => {           
    if(err) {                                  
      console.error('error when connecting to db:', err);
      console.log('\\** Try to reconnect to database again... **//')
      setTimeout(handleDisconnect, 2000); // repeat the process
    } else {
      console.log("\\ Reconnecting to mysql database again //");
    }
  });                                     
}

db.getConnection((err,connection) => {
  if (err) {
    console.log('Cant connect to database')
    console.error(err)
    handleDisconnect();
  } else {
    console.log('Connecting to mySQL database')
  }
  return connection;
});


module.exports = db;
