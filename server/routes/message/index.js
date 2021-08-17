const router = require('express').Router()
const controller = require('./controller')

router.get('/latest/:roomId', controller.getLatestMessageByRoomId);

module.exports = router