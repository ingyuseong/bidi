const router = require('express').Router()
const controller = require('./controller')

router.post('/register', controller.registerMatchingHistory)

router.get('/user/:userId', controller.getMatchingHistoryByDesignerId)
router.get('/customer/:userId', controller.getMatchingHistoryByCustomerId)

router.patch('/review/:id', controller.editReview)
router.patch('/star/:id', controller.editStar)

router.delete('/:id', controller.deleteMatchingHistory)

module.exports = router
