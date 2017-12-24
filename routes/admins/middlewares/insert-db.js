'use strict';
/** =================================
                Packages
**==================================*/

const db = require('../../database/mysql-db');

/** =================================
                Body
**==================================*/

function QueryDatabase(data){
  this.team = data.team;
  this.imgLink = data.imgLink;
  this.description = data.description;
}

QueryDatabase.prototype.Insert = () => {
  var imgSql = QueryTemplate(this.imgLink,
                             [img_link,team_id],
                             [db.table.images,db.table.team],
                             this.team
                            );
  
  db.query(imgSql, (err, result) => {
    HandleError().then((imgData) => {
      var descriptSql = QueryTemplate(this.description,
                                      [descriptions,img_id],
                                      [db.table.description,db.table.images],
                                      imgData[0].img_id
                                     );
      db.query(descriptSql,(err,result) => {
        HandleError().then(() => {
          console.log("Sucessully insert image & description");
          return;
        })
      })
    })
  })


  // helper 
  function HandleError(){
    return new Promise(resolve,reject){
      if (this.err) {
        console.log(err);
        console.log("Cant insert image into table");
        return reject();
      }
      if (this.result === undefined) {
        console.log ("Cant insert image into table")
        return reject();
      }
      else {
        return resolve(this.result);
      }
    }
  }
  
  function QueryTemplate(content,columns,tables,match){
    var sql = `INSERT INTO ${table[0]} (${columns[0]}, ${columns[1]})
                 VALUES (
                   ${content},
                   (SELECT ${columns[1]} from ${table[1]}
                      WHERE (${columns[1]} = ${match})
                   )
                 )
              `
    return sql;
  }
}