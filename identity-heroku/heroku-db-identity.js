
/*
 * Configuration of mysql database in AWS RDB 
 */

var dbIdentity = {
  host:process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: 'test'
}

module.exports = dbIdentity;