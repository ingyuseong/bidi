const router = require('express').Router()
const controller = require('./controller')

router.get('/:userId', controller.getStyleScrapList)
router.post('/:userId/:styleId', controller.registerStyleScrap)
router.delete('/:userId/:styleId', controller.deleteStyleScrap)

module.exports = router
