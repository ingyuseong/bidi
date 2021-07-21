const router = require('express').Router()
const controller = require('./controller')

router.get('/:userId', controller.getBrandingInfo)

module.exports = router
