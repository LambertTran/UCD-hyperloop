
/** =================================
                Packages
**================================== */

const db = require('../../database/mysql-db');

/** =================================
                Body
**================================== */

function InsertTeamDetail(data) {
  const sql = `update teams
                 set team_detail = '${data.detail}'
                 where team = '${data.teamName}'
              `;
  return new Promise((resolve,reject) => {
    db.query(sql,(err,result) => {
      if (err) {
        console.log(err);
        return reject(err);    
      }
        return resolve();
    })
  });
}

module.exports = InsertTeamDetail
