const router = require('express').Router()

// Router Lists
// root
const user = require('./user')

// Depth 1
const proposal = require('./proposal')
const branding = require('./branding')

// Depth 2
const bid = require('./bid')
const styleScrap = require('./styleScrap')

// Depth 3
const matching = require('./matching')

// Depth 4, 5
const room = require('./room')
const message = require('./message')

router.use('/user', user)
router.use('/proposal', proposal)
router.use('/branding', branding)
router.use('/bid', bid)
router.use('/styleScrap', styleScrap)
router.use('/matching', matching)
router.use('/room', room)
router.use('/message', message)

module.exports = router
