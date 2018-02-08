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
let db = mysql.createConnection(dbIdentity);

// table names
db.table = {
  admin:'admin',
  teams:'teams',
  images:'images',
  descriptions:'descriptions'
};

function handleDisconnect() {
  // create new connection
  db = mysql.createConnection(dbIdentity); 
  // re-connect to mySQL and handle err if cant connect
  db.connect(function(err) {              
    if(err) {                                     
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // repeat the process
    }                                     
  });                                     

  // handle disconnection 
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
      handleDisconnect();                         
    } else {                                      
      throw err;                                  
    }
  });
}

db.connect((err) => {
  if(err) { 
    console.log(err);
    setTimeout(handleDisconnect, 2000); 
  }
  else {
    console.log("Connecting to mysql database");
  }
})


module.exports = db;
