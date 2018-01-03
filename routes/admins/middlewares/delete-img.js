/** =================================
                Packages
**==================================*/
const AWS = require('aws-sdk');
const awsS3Identity = require('../../../identity/awsS3-identity');
const db = require('../../database/mysql-db');

/** =================================
                Body
**==================================*/

/** Config S3 bucket **/
AWS.config.update(awsS3Identity)

/** create new instance of aws S3 **/
const s3 = new AWS.S3();

function DeleteImg(imgId){
  const sql = `select * from images where id = ${imgId} `

  db.query(sql,(err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result)
    const item = result[0].img_link.split('/').pop();
    const params = {
      Bucket: 'testimage-uploader',
      Delete: {
        Objects: [{
          Key: item
        }]
      },
    };
    s3.deleteObjects(params,(err,data) => {
        if (err) console.log(err,err.stack)
        else console.log(data);
      });
    

    
  })
  


}

module.exports = DeleteImg;