
/*
 * Configuration of AWS S3  
 */

var awsS3Identity = {
  secretAccessKey: process.env.SE3_SCRET,
  accessKeyId: process.env.S3_KEY,
  region: 'us-east-1'
}

module.exports = awsS3Identity;