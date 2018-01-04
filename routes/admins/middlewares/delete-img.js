/** =================================
                Packages
**==================================*/
const AWS = require('aws-sdk');
const db = require('../../database/mysql-db');
const fs = require('fs');

let awsS3Identity;
try{
  awsS3Identity = require('../../../identity/awsS3-identity');
} catch(e) {
  awsS3Identity = require('../../../identity-heroku/awsS3-identity');
}
/** =================================
                Body
**==================================*/

/** Config S3 bucket **/
AWS.config.update(awsS3Identity)

/** create new instance of aws S3 **/
const s3 = new AWS.S3();

async function DeleteImg(imgId){
  // item need to be deleted
  const item = await FindImage(imgId);
  // get image name in S3 bucket using image link
  const itemName = item[0].img_link.split('/').pop();
  const isDelete = await Promise.all([
    DeleteImgInS3(itemName),
    DeleteImgInDb(item[0].id)
  ]);
  if (isDelete[0] === isDelete[1] === true){
    return Promise.resolve();
  }
  return Promise.reject();

}
  function DeleteImgInDb(imgId){
    return new Promise((resolve,reject) => {
      const sql = `delete from images where id = ${imgId}`;
      db.query(sql,(err,result) =>{
        if (err) {
          console.log(err);
          return reject(false);
        }
        return resolve(true);
      })
    })
  }

  function DeleteImgInS3(itemName){
    return new Promise ((resolve,reject) => {
      // delete that image in s3 bucket
      const params = {
        Bucket: 'testimage-uploader',
        Delete: {
          Objects: [{
            Key: itemName
          }]
        },
      };
      s3.deleteObjects(params,(err,data) => {
          if (err){
            console.log(err,err.stack)
            return reject(false)
          } 
          return resolve(true);
      });    
    });    
  }

  function FindImage(imgId){
    return new Promise((resolve,reject) => {
      const sql = `select * from images where id = ${imgId} `
      // find that image in database using its ID
      db.query(sql,(err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(result);
      });
    })
  }


module.exports = DeleteImg;