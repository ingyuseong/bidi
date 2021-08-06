const router = require('express').Router()
const user = require('./user')
const proposal = require('./proposal')
const branding = require('./branding')
const styleScrap = require('./styleScrap')
const bid = require('./bid')

router.use('/user', user)
router.use('/proposal', proposal)
router.use('/branding', branding)
router.use('/styleScrap', styleScrap)
router.use('/bid', bid)

module.exports = router
