/** =================================
                Packages
**================================== */
const db = require('../mysql-db.js');
const QueryHelper = require('./query-helper.js');

/** =================================
                Body
**================================== */

function CreateTables() {
  const teams = `CREATE TABLE IF NOT EXISTS ${db.table.teams}
               ( 
                 team_id INT AUTO_INCREMENT,
                 team VARCHAR(100) NOT NULL,
                 PRIMARY KEY (team_id)
               )
              `;
  const images = `CREATE TABLE IF NOT EXISTS ${db.table.images} 
                (
                  id INT AUTO_INCREMENT,
                  team_id INT NOT NULL,
                  img_link VARCHAR(255) NOT NULL,
                  detail VARCHAR(10000),
                  PRIMARY KEY (id),
                  FOREIGN KEY (team_id) REFERENCES teams(team_id)
                )
               `;

  const query = {
    teams,
    images,
  };
  return new Promise((resolve, reject) => {
    for (let item in query) {
      QueryHelper(query[item],item);
    }
    return resolve();
  });
}

module.exports = CreateTables;