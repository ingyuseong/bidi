const router = require('express').Router()
const controller = require('./controller')

router.post('/register', controller.registerBid)

module.exports = router
