const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, path.resolve(__dirname, '..', '..', 'temp', 'uploads'));
    },
    filename: (req, file, callback) => {
      crypto.randomBytes(16, (error, hash) => {
        if(error) callback(error);

        file.key = `${hash.toString('hex')}-${file.originalname}`;

        callback(null, file.key)
      });
    },
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: process.env.AWS_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, callback) => {
      crypto.randomBytes(16, (error, hash) => {
        if(error) callback(error);

        const fileName = `${hash.toString('hex')}-${file.originalname}`;

        callback(null, fileName)
      });
    }, 
  })
}

module.exports = {
  dest: path.resolve(__dirname, '..', '..', 'temp', 'uploads'),
  storage: storageTypes[process.env.STORAGE_TYPE], 
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilters: (req, file, callback) => {
    const allowedMimes = [
      'images/jpeg',
      'images/pjpeg',
      'images/png',
      'images/gif',
    ];

    if(allowedMimes.includes(file.mimetypes)) {
      callback(null, true);
    } else {
      callback(new Error('Invalid file type.'));
    }
  }
}