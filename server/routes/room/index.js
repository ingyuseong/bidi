const router = require('express').Router()
const controller = require('./controller')

router.get('/customer/:userId', controller.getAllRoomByCustomerId);
router.get('/designer/:userId', controller.getAllRoomByDesignerId);

module.exports = router