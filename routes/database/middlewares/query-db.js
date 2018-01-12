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
  this.detail = data.detail;
}

// insert team image into TEAMS TABLE
QueryDatabase.prototype.InsertTeamImg = function(){
  const sql = `update teams
                set team_img = '${this.imgLink}'
                 where team = '${this.team}'
              `; 
  return QueryHelper(sql);
}

// insert image link and detail into IMAGES TABLE
QueryDatabase.prototype.Insert = function(){
  const sql = `INSERT INTO images (img_link,detail,team_id)
               VALUES (
                 '${this.imgLink}',
                 '${this.detail}',
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

// get image link and detail from each subteam
QueryDatabase.prototype.GetSubTeamImg = function() {
  const sql = `select * from images
               where team_id = (
                 select team_id from teams
                   where (team = '${this.team}')
               )`;
  return QueryHelper(sql);
}

// get all teams
QueryDatabase.prototype.GetTeams = function(){
  const sql = 'select * from teams';
  return QueryHelper(sql);
}

// get sub-team detail
QueryDatabase.prototype.GetSubTeamDetail = function() {
  const sql = `select * from teams
               where team = '${this.team}' 
              `;
  return QueryHelper(sql);
}

function QueryHelper(sql) {
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
}


module.exports = QueryDatabase;