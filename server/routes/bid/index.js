const router = require('express').Router()
const controller = require('./controller')

router.patch('/:id', controller.editBid)
router.delete('/:id', controller.deleteBid)
router.post('/register', controller.registerBid)
router.patch('/status/:id', controller.editBidStatus)
router.get('/user/:userId', controller.getBidByDesignerId)

module.exports = router
