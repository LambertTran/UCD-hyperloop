'use strict';
/** =================================
                Helper
**==================================*/

var QueryHelper = require('./query-helper');

/** =================================
                Body
**==================================*/

function InsertTeam(){
  var teams = [
    'Eddy-Current-Bakes',
    'Wheels',
    'Propulsion',
    'Business',
    'Controls',
    'Friction-Brakes',
    'Air-Bearings'
  ];

  return new Promise ((resolve,reject) => {
    for (let i =0; i < teams.length; ++i){
      let sql = sqlTemplate(teams[i]);
      QueryHelper(sql,'teams')
    }
    return resolve();
  })

  function sqlTemplate(team){
    return `INSERT INTO teams (teams,display) Values ('${team}','${team}')`
  }

}

module.exports = InsertTeam;

