
/** =================================
                Packages
**================================== */

const db = require('../../database/mysql-db');

/** =================================
                Body
**================================== */

function DeleteImgInDb(team) {
  const sql = `select * from images
               where team_id = (
                 select team_id from teams
                   where (team = '${team}')
               ) 
              `;
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
}

module.exports = GetSubTeam;
