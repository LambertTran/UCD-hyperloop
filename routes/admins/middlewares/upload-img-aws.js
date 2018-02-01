/** =================================
                Packages
**==================================*/
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3  = require('multer-s3');
const fs = require('fs');

let awsS3Identity;
// try{
  // production keys
  awsS3Identity = require('../../../identity/prod-awsS3');
  // development keys
  // awsS3Identity = require('../../../identity/awsS3-identity');
// } catch(e) {
  // awsS3Identity = require('../../../identity-heroku/awsS3-identity');
// }


/** =================================
                Body
**==================================*/

/** Config S3 bucket **/
AWS.config.update(awsS3Identity.keys)

/** create new instance of aws S3 **/
var s3 = new AWS.S3();

/** handle upload images and return files location **/
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: awsS3Identity.bucket,
    contentType: multerS3.AUTO_CONTENT_TYPE ,
    key: function (req, file, cb) {
      var name = Date.now().toString() + file.originalname;
      cb(null, name );
    }
  })
});

module.exports = upload;