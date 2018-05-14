const jwt = require('jsonwebtoken');
const db = require('../../database/mysql-db');
const bcrypt = require('bcryptjs');
const key = "2017";

class TokenAuth {
  constructor(authObj) {
    this.username = authObj.username;
    this.password = authObj.password;
    this.token = authObj.token;
  }
  
  validateUSer() {
    return new Promise((resolve,reject) => {
      const sql = `SELECT * FROM admin WHERE user = '${this.username}'`;
      
      db.query(sql,(err,result) => {  
        if (err) {
          return reject(err);
        }
        if (result.length === 0){
          return reject();
        } 
        else {
          // look for password
          bcrypt.compare(this.password,result[0].password,(err,res) => {
            if (err) {
              return reject(err);
            }
            if (res === false){
              return reject();
            } else {
              return resolve();
            }
          });
        }
      });
    });
  }

  generateToken() {
    const accessType = "admin user"
    const token = jwt.sign({username:this.username,accessType},key).toString();
    
    const sql = `INSERT INTO ${db.tables.tokens}
                  (token,logout,accessType)
                  VALUES (
                    '${token}',
                    '${0}',
                    '${accessType}'
                  )`;
    return QueryHelper(sql)
      .then(() => {
        return Promise.resolve(token);
      })
      .catch((err) => {
        return Promise.reject(err);
      })
  }

  findByToken() {
    let decode;

    try {
      decode = jwt.verify(this.token,key);
    } catch (err) {
      return Promise.reject();
    }

    let sql = `select * from ${db.tables.tokens}
                where 
                  (token = '${this.token}')
                and 
                  (accessType= '${decode.accessType}')
              `
    return QueryHelper(sql)
  }
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


module.exports = TokenAuth;