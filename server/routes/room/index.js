const router = require('express').Router()
const controller = require('./controller')
const { routesAsyncWrapper } = require('../../lib/asyncWrapper')

router.get(
  '/customer/:userId',
  routesAsyncWrapper(controller.getAllRoomByCustomerId)
)
router.get(
  '/designer/:userId',
  routesAsyncWrapper(controller.getAllRoomByDesignerId)
)

module.exports = router
