'use strict';
/** =================================
                Packages
**================================== */

const db = require('../../database/mysql-db');

/** =================================
                Body
**================================== */

/*
 *  Insert data into database 
 *  params: team, image link, and description  
 */

function QueryDatabase(data) {
  this.team = data.team;
  this.imgLink = data.imgLink;
  this.description = data.description;
}

QueryDatabase.prototype.Insert = function(){
  const sql = `INSERT INTO images (img_link,detail,team_id)
               VALUES (
                 '${this.imgLink}',
                 '${this.description}',
                 (SELECT team_id from teams
                 WHERE (team = '${this.team}'))
              )`;
  return new Promise( (resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      } 
      return resolve(result);
    })  
  })
}


module.exports = QueryDatabase;