/** =================================
                Packages
**==================================*/
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3  = require('multer-s3');
const awsS3Identity = require('../../../identity/awsS3-identity');
/** =================================
                Body
**==================================*/

/** Config S3 bucket **/
AWS.config.update(awsS3Identity)

/** create new instance of aws S3 **/
var s3 = new AWS.S3();

/** handle upload images and return files location **/
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'testimage-uploader',
    contentType: multerS3.AUTO_CONTENT_TYPE ,
    key: function (req, file, cb) {
      var name = Date.now().toString() + file.originalname;
      cb(null, name );
    }
  })
});

module.exports = upload;