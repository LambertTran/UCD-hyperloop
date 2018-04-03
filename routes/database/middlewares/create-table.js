/** =================================
                Packages
**================================== */

const db = require('../mysql-db.js');

/** =================================
                Body
**================================== */

function CreateTables() {
  const teams = `CREATE TABLE IF NOT EXISTS ${db.tables.teams}
               ( 
                 team_id INT AUTO_INCREMENT,
                 team VARCHAR(100) NOT NULL,
                 team_detail VARCHAR(10000),
                 team_img VARCHAR(255),
                 PRIMARY KEY (team_id)
               )
              `;
  const updates = `CREATE TABLE IF NOT EXISTS ${db.tables.updates} 
                (
                  id INT AUTO_INCREMENT,
                  team_id INT NOT NULL,
                  img_link VARCHAR(255) NOT NULL,
                  detail VARCHAR(10000),
                  PRIMARY KEY (id),
                  FOREIGN KEY (team_id) REFERENCES teams(team_id)
                )
               `;
  
  const members = `CREATE TABLE IF NOT EXISTS ${db.tables.members} 
                  (
                    id INT AUTO_INCREMENT,
                    team_id INT NOT NULL,
                    member_img_link VARCHAR(255),
                    member_name VARCHAR(255),
                    member_title VARCHAR(255),
                    PRIMARY KEY (id),
                    FOREIGN KEY (team_id) REFERENCES teams(team_id)
                  )
`;
  
  const query = {
    teams,
    updates,
    members
  };
  return new Promise((resolve, reject) => {
    for (let item in query) {
      QueryHelper(query[item],item);
    }
    return resolve();
  });
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

module.exports = CreateTables;