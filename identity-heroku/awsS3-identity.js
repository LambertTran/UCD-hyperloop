
/*
 * Configuration of AWS S3  
 */

var awsS3Identity = {
  key : {
    secretAccessKey: process.env.S3_SECRET,
    accessKeyId: process.env.S3_KEY,
    region: 'us-east-1'
  },
  bucket: 'testimage-uploader',
}

module.exports = awsS3Identity;