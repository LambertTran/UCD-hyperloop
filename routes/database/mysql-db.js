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

function handleDisconnect(db) {
  // create new connection
  db = mysql.createConnection(dbIdentity); 
  // re-connect to mySQL and handle err if cant connect
  db.connect(function(err) {              
    if(err) {                                  
      console.error('error when connecting to db:', err);
      console.log('\\** Try to reconnect to database again... **//')
      setTimeout(handleDisconnect, 2000); // repeat the process
    } else {
      console.log("\\ Reconnecting to mysql database again //");
    }
  });                                     

  // handle disconnection 
  db.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
      console.log("\\ Try to connect database again //")
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect(db);

// db.connect((err) => {
//   if(err) { 
//     console.log(err);
//     setTimeout(handleDisconnect, 10000); // repeat the process
//   }
//   else {
//     console.log("\\ Connecting to mysql database //");
//   }
// })
// db.on('error', function(err) {
//   console.error('db error', err);
//   if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
//     handleDisconnect();
//   } else {
//     throw err;
//   }
// });


module.exports = db;
