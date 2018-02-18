// Imports the Google Cloud client library
const Storage = require('@google-cloud/storage');

class GcpStorageObject {
  constructor(path2key,bucketName){
    this.path2key = path2key;
    this.bucketName = bucketName;
  }
  uploadFile(file) {
    return uploadFile2Bucket.call(this,file);
  }
  deleteFile(file)  {
    return deleteFileInBucket.call(this,file);
  }
}

function deleteFileInBucket(file2delete) {
  const bucket = initiateStorage.apply(this);
  return new Promise((resolve,reject) => {
    bucket
      .file(file2delete)
      .delete()
      .then(() => {
        console.log(`Deleted ${file2delete} file in ${this.bucketName}.`);
        resolve(true);
      })
      .catch(err => {
        console.error('ERROR:', err);
        reject(err);
      });
  })
} 

// inititate new storage
function initiateStorage() {
  // check for err
  if (!this.bucketName){
    return console.error('ERROR: Inititate Storage - There is no bucket name')
  }

  // create new instance of GCP storage withaaaaaaa
  const storage = new Storage({
    keyFilename: this.path2key,
  });

  return storage.bucket(this.bucketName);
}

// upload file to bucket and return promise
function uploadFile2Bucket(file2upload) {
  const bucket = initiateStorage.apply(this);
  if (!bucket) {
    return;
  }

  return new Promise((resolve,reject) => {
    if (!file2upload) {
      console.error('ERROR: UploadFile2Bucket - There is no file to upload');
      return reject(undefined);
    }
  
    // create new name for file
    const gcsname = Date.now() + file2upload.originalname;
    
    // create a file for that name on the bucket
    const file = bucket.file(gcsname);

    // create a stream to write file
    const stream = file.createWriteStream({
      metadata: {
        contentType: file2upload.mimetype
      }
    });
  
    // check for err
    stream.on('error', (err) => {
      console.error('ERROR: ', err)
      return reject(err);
    });
  
    // after write file to bucket, return an object with Url
    stream.on('finish', () => {
      file.makePublic().then(() => {
        let url = getPublicUrl(this.bucketName,gcsname); // get url from file name
        return resolve(url);
      });
    });

    stream.end(file2upload.buffer);

    // handle get public URL with given bucketname and filename
    function getPublicUrl (bucketName,filename) {
      return `https://storage.googleapis.com/${bucketName}/${filename}`;
    }
  })
}






module.exports = GcpStorageObject;