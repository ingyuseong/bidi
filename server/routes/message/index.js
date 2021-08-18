const router = require('express').Router()
const controller = require('./controller')

router.get('/latest/:roomId', controller.getLatestMessageByRoomId);
router.get('/:roomId', controller.getAllMessageByRoomId);

module.exports = router