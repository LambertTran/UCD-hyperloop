
/** =================================
                Packages
**================================== */

const db = require('../../database/mysql-db');

/** =================================
                Body
**================================== */

/** Get all teams in database */
function GetTeams() {
  const sql = 'select * from teams';

  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      }
      const teams = result.map((data) => {
        return data.team;
      });
      return resolve(teams);
    });
  });
}

module.exports = GetTeams;
