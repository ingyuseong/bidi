const router = require('express').Router()
const user = require('./user')
const proposal = require('./proposal')
const branding = require('./branding')

router.use('/user', user)
router.use('/proposal', proposal)
router.use('/branding', branding)

module.exports = router
