const router = require('express').Router()
const controller = require('./controller')

router.get('/list', controller.getBrandingList)
router.get('/:userId', controller.getBranding)

module.exports = router
