// import GCP storage Object
const GcpStorageObject = require('../../database/middlewares/GcpStorageObject');

// instanitate new object
const path2Key = './identity/GCP-key.json';
const bucketName = 'photo-tester';
const newObject = new GcpStorageObject(path2Key,bucketName);

const imgHandler = {
  upload : async function(file) {
    return await newObject.uploadFile(file);
  },
  delete: async function(file){
    return await newObject.deleteFile(file);
  }
}



module.exports = imgHandler;
