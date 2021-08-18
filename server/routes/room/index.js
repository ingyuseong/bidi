const router = require('express').Router()
const controller = require('./controller')

router.get('/customer/:userId', controller.getAllRoomByCustomerId);

module.exports = router