'use strict';
/** =================================
                Packages
**==================================*/
const db   = require("../mysql-db.js");

/** =================================
                Body
**==================================*/

var QueryHelper= (sql,tableName)=>{
  db.query(sql, (err,result) => {
    if (err){ 
      console.log(err) 
      console.log(`Cant create ${tableName} table`)
      return reject();
    }
  });
}

module.exports = QueryHelper;