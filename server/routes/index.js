const router = require('express').Router()
const user = require('./user')
const proposal = require('./proposal')
const branding = require('./branding')
const bid = require('./bid')
const matchingHistory = require('./matchingHistory')
const room = require('./room')

const styleScrap = require('./styleScrap')

router.use('/user', user)
router.use('/proposal', proposal)
router.use('/branding', branding)
router.use('/bid', bid)
router.use('/matchingHistory', matchingHistory)
router.use('/room', room)

router.use('/styleScrap', styleScrap)

module.exports = router
