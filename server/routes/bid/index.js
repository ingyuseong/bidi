const router = require('express').Router()
const controller = require('./controller')

router.post('/register', controller.registerBid)

router.get('/user/:userId', controller.getBidByDesignerId)
router.get('/customer/:userId', controller.getBidByCustomerId)

router.patch('/:id', controller.editBid)
router.patch('/status/:id', controller.editBidStatus)
router.patch(
  '/status/withproposal/:proposalId',
  controller.editBidStatusWithProposal
)

router.delete('/:id', controller.deleteBid)

module.exports = router
