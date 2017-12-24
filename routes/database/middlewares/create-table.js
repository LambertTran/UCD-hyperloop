'use strict';
/** =================================
                Packages
**==================================*/
const db   = require("../mysql-db.js");

/** =================================
                Body
**==================================*/

function CreateTables(){
  let teams = `CREATE TABLE IF NOT EXISTS ${db.table.teams}
               ( 
                 team_id INT AUTO_INCREMENT,
                 teams VARCHAR(100) NOT NULL,
                 display VARCHAR(100) NOT NULL,
                 PRIMARY KEY (team_id)
               )
              `
  let images = `CREATE TABLE IF NOT EXISTS ${db.table.images} 
                (
                  img_id INT AUTO_INCREMENT,
                  team_id INT NOT NULL,
                  img_link VARCHAR(255) NOT NULL,
                  PRIMARY KEY (img_id),
                  FOREIGN KEY (team_id) REFERENCES teams(team_id)
                )
               `
  let descriptions = `CREATE TABLE IF NOT EXISTS ${db.table.descriptions}
                     (
                      id INT AUTO_INCREMENT,
                      img_id INT NOT NULL,
                      descriptions VARCHAR(1000) NOT NULL,
                      PRIMARY KEY (id),
                      FOREIGN KEY (img_id) REFERENCES images(img_id)
                     )
                    `
  let query = {
    teams,
    images,
    descriptions
  }
  
  return new Promise((resolve,reject) => {
    for (let item in query){
      QueryHelper(query[item],item);
    }
    return resolve();
  });

  function QueryHelper(sql,tableName){
    db.query(sql, (err,result) => {
      if (err){ 
        console.log(err) 
        console.log(`Cant create ${tableName} table`)
        return reject();
      }
    });
  }
}

module.exports = CreateTables;