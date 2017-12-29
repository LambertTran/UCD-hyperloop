
/** =================================
                Packages
**================================== */

const db = require('../../database/mysql-db');

/** =================================
                Body
**================================== */

/** Get all teams in database */
function GetSubTeam(team) {
  const sql = `select * from teams `;

  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      }
      const teams = result.map((team) => {
        return team.display;
      });
      return resolve(teams);
    });
  });
}

module.exports = GetSubTeam;
