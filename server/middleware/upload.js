require('dotenv').config()
const multer = require('multer')
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk')

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_REGION,
})

const uploadImage = multer(
  {
    storage: multerS3({
      s3: s3,
      key: '',
      bucket: process.env.S3_BUCKEY_NAME,
      acl: 'public-read',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: function (req, file, cb) {
        cb(null, `image/user/${file.originalname}/input/${Date.now()}`)
      },
    }),
  },
  'NONE'
)

module.exports = uploadImage
