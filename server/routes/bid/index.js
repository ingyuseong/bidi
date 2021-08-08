const router = require('express').Router()
const controller = require('./controller')

router.patch('/:id', controller.editBid)
router.delete('/:id', controller.deleteBid)
router.post('/register', controller.registerBid)
router.get('/user/:userId', controller.getBidByDesignerId)
router.get('/customer/:userId', controller.getBidByCustomerId)

module.exports = router
