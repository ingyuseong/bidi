const router = require('express').Router()
const controller = require('./controller')
// const multer = require('multer')
const { routesAsyncWrapper } = require('../../lib/asyncWrapper')
// const upload = multer({
//   dest: 'uploads/',
// })
const upload = require('../../lib/multer')

/*
    [ 1. POST Methods ]
    POST /api/user/inference  : AI inference API
    
*/

router.post(
  '/inference',
  upload.single('file'),
  routesAsyncWrapper(controller.inferenceAI)
)

module.exports = router
