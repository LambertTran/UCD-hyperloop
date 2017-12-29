'use strict';
/** =================================
                Packages
**==================================*/

const db = require('../../database/mysql-db');

/** =================================
                Body
**==================================*/

/*
 *  Insert data into database 
 *  params: team, image link, and description  
 */

function QueryDatabase(data){
  this.team = data.team;
  this.imgLink = data.imgLink;
  this.description = data.description;
}

QueryDatabase.prototype.Insert = function() {
  // insert image into database 
  var imgSql = QueryTemplate(this.imgLink,
                             ['img_link','team_id'],
                             [db.table.images,'teams'],
                             ['teams',this.team]
                            );
  db.query(imgSql, (err, result) => {
    HandleError(err,result)
      .then((imageData) => {
        let imgID = imageData.insertId;
        // insert description into database after image inserted
        var descriptSql = QueryTemplate(this.description,
                                        ['descriptions','img_id'],
                                        [db.table.descriptions,db.table.images.toString()],
                                        ['img_id',imgID]
                                      );
        db.query(descriptSql,function(err,result){
          HandleError(err,result)
            .then(function(){
              console.log("Sucessully insert image & description");
              return;
            })
            .catch ((err) => {
              console.log(err);
            })
        })
      })
      .catch((err) => {
        console.log("There is errr" + err)
      })
  })


  // helper 
  function HandleError(err,result){
    return new Promise((resolve,reject) => {
      if (err) {
        console.log(err)
        return reject(err);
      }
      return resolve(result);
    })
  }
  
  function QueryTemplate(content,columns,tables,match){
    var sql = `INSERT INTO ${tables[0]} (${columns[0]}, ${columns[1]})
                 VALUES (
                   '${content}',
                   (SELECT ${columns[1]} from ${tables[1]}
                      WHERE (${match[0]} = '${match[1]}')
                   )
                 )
              `
    return sql;
  }
}

module.exports = QueryDatabase;