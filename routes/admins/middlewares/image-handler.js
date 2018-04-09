/**
 * This middleware will handle upload and delete image
 * in Google cloud platform (GCP). You needs
 *    + key file to GCP
 *    + bucket name in GCP storage
 */

// Mysql database 
const db = require('../../database/mysql-db');

// Import GCP storage Object
// This object will handle upload and delete new object
const GcpStorageObject = require('../../database/middlewares/GcpStorageObject');

// Instanitate new object
const path2Key = './identity/GCP-key.json';
const bucketName = 'photo-tester';
const newObject = new GcpStorageObject(path2Key,bucketName);

const imgHandler = {
  upload : async function(file) {
    return await newObject.uploadFile(file);
  },
  deleteUpdate: async function(imgId){
    let findImg = `select * from updates where id = ${imgId} `
    let deleteImgInDB = `delete from updates where id = ${imgId}`;
    let img2Delete = await QueryHelper(findImg);
    let imgName = img2Delete[0].img_link.split('/').pop();
    return Promise.all([newObject.deleteFile(imgName),QueryHelper(deleteImgInDB)]).then((result) => {
      return result[0];
    })
  },
  deleteMember: async function(imgId){
    let findImg = `select * from members where id = ${imgId} `;
    let deleteImgInDB = `delete from members where id = ${imgId}`;
    let img2Delete = await QueryHelper(findImg);
    let imgName = img2Delete[0].member_img_link.split('/').pop();
    return Promise.all([newObject.deleteFile(imgName),QueryHelper(deleteImgInDB)]).then((result) => {
      return result[0];
    })
  }
}

/** Helpers */
function QueryHelper(sql){
  return new Promise((resolve,reject) => {
    db.query(sql,(err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(result);
    });
  })
}


module.exports = imgHandler;
