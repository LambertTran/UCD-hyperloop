// 'use strict';
// /** =================================
//                 Packages
// **================================== */

// const db = require('../../database/mysql-db');

// /** =================================
//                 Body
// **================================== */

// /*
//  *  Insert data into database 
//  *  params: team, image link, and description  
//  */

// function QueryDatabase(data) {
//   this.team = data.team;
//   this.imgLink = data.imgLink;
//   this.description = data.description;
// }

// QueryDatabase.prototype.Insert = function(){
//   const sql = `INSERT INTO images (img_link,detail,team_id)
//                VALUES (
//                  '${this.imgLink}',
//                  '${this.description}',
//                  (SELECT team_id from teams
//                  WHERE (team = '${this.team}'))
//               )`;
//   return new Promise( (resolve, reject) => {
//     db.query(sql, (err, result) => {
//       if (err) {
//         return reject(err);
//       } 
//       return resolve(result);
//     })  
//   })
// }

// QueryDatabase.prototype.GetSubTeam = function(team) {
//   const sql = `select * from images
//                where team_id = (
//                  select team_id from teams
//                    where (team = '${team}')
//                ) 
//               `;
//   return QueryHelper(sql);
// }

// function QueryHelper(sql) {
//   return new Promise((resolve, reject) => {
//     db.query(sql, (err, result) => {
//       if (err) {
//         return reject(err);
//       }
//       return resolve(result);
//     });
//   });
// }


// module.exports = QueryDatabase;