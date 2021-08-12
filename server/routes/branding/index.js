const router = require('express').Router()
const controller = require('./controller')

router.patch('/main', controller.editMainBranding)
router.patch('/:id', controller.editBranding)
router.delete('/:id', controller.deleteBranding)
router.post('/register', controller.registerBranding)

router.get('/list', controller.getBrandingList)
router.get('/:userId', controller.getBrandings)

module.exports = router
