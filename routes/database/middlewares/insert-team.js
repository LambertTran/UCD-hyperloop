'use strict';

/** =================================
                Body
**================================== */

function InsertTeam() {
  const teams = [
    'Eddy-Current-Bakes',
    'Wheels',
    'Propulsion',
    'Business',
    'Controls',
    'Friction-Brakes',
    'Air-Bearings',
  ];

  return new Promise ((resolve,reject) => {
    for (let i =0; i < teams.length; ++i) {
      const sql = sqlTemplate(teams[i]);
      QueryHelper(sql, 'teams' );
    }
    return resolve();
  })

  function sqlTemplate(team) {
    return `INSERT INTO teams (team) Values ('${team}')`;
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
}

module.exports = InsertTeam;

