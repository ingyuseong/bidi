const router = require('express').Router()
const controller = require('./controller')
const { routesAsyncWrapper } = require('../../lib/asyncWrapper')

router.get(
  '/latest/:roomId',
  routesAsyncWrapper(controller.getLatestMessageByRoomId)
)
router.get('/:roomId', routesAsyncWrapper(controller.getAllMessageByRoomId))

module.exports = router
