const router = require('express').Router()
const controller = require('./controller')

router.get('/list', controller.getBrandingList)
router.get('/:userId', controller.getBrandings)

module.exports = router
