const router = require('express').Router()
const { STATUS_CODE, ERROR_MESSAGE } = require('../lib/constants')

// Router Lists
// root
const user = require('./user')
const ai = require('./ai')
const trial = require('./trial')
const rank = require('./rank')

// Depth 1
const proposal = require('./proposal')
const style = require('./style')
const branding = require('./branding')
const scheduleInfo = require('./scheduleInfo')

// Depth 2
const bid = require('./bid')
const styleScrap = require('./styleScrap')

// Depth 3
const matching = require('./matching')

// Depth 4, 5
const room = require('./room')
const message = require('./message')
const schedule = require('./schedule')

router.use('/user', user)
router.use('/ai', ai)
router.use('/trial', trial)
router.use('/rank', rank)
router.use('/proposal', proposal)
router.use('/style', style)
router.use('/branding', branding)
router.use('/scheduleInfo', scheduleInfo)
router.use('/bid', bid)
router.use('/styleScrap', styleScrap)
router.use('/matching', matching)
router.use('/schedule', schedule)
router.use('/room', room)
router.use('/message', message)

module.exports = router
