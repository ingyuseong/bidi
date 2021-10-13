const multer = require('multer')
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')
require('dotenv').config()

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_REGION,
})

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKEY_NAME,
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(
        null,
        'web/input/' +
          req.body.gender +
          '/' +
          req.body.length +
          '/' +
          // req.body.bang +
          // '/' +
          req.body.id +
          '.jpg'
      )
    },
  }),
})

module.exports = upload
