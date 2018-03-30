/**
 * This middleware helps query database
 * including: read, insert, delete data.
 * The input paramater is in form of an object,
 * which contains 3 different data: 
 * @param data.team: name of team we want to work on
 * @param data.imgLink: link to the image on cloud storage
 * @param data.detail: detail for what we want to insert into database
 * 
 * Note: imgLink and detail have different meaning in different operation
 * 
 * Example: if we work on the team table, then the imgLink refers to
 *    image of the team and detail refers to the description about the team
 *    . However, if we work on subteam progress (an update of what they are
 *    working on), imgLink is image of what they are working on and detail 
 *    is the description about that image    
 */

'use strict';
/** =================================
                Packages
**================================== */

const db = require('../../database/mysql-db');

/** =================================
                Body
**================================== */


function QueryDataBase(data) {
  this.team = data.team;
  this.imgLink = data.imgLink;
  this.detail = data.detail;
}

// insert team image (1 simgple image represent the team) into TEAMS TABLE
QueryDataBase.prototype.InsertTeamImg = function(){
  const sql = `update teams
                set team_img = '${this.imgLink}'
                 where team = '${this.team}'
              `; 
  return QueryHelper(sql);
}

// insert detail about the team
QueryDataBase.prototype.InsertTeamDetail = function() {
  const sql = `update teams
                 set team_detail = '${this.detail}'
                 where team = '${this.team}'
              `;
  return QueryHelper(sql);
}

// insert image links - details of the work they have done into IMAGES TABLE
QueryDataBase.prototype.InsertWorkImg = function(){
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
QueryDataBase.prototype.GetSubTeamImg = function() {
  const sql = `select * from images
               where team_id = (
                 select team_id from teams
                   where (team = '${this.team}')
               )`;
  return QueryHelper(sql);
}

// get all teams
QueryDataBase.prototype.GetTeams = function(){
  const sql = 'select * from teams';
  return QueryHelper(sql);
}

// get sub-team detail
QueryDataBase.prototype.GetSubTeamDetail = function() {
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


module.exports = QueryDataBase;