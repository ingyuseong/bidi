const router = require('express').Router()
const controller = require('./controller')
const upload = require('../../middleware/upload')

router.get('/list', controller.getUsers)
router.post('/token', controller.checkToken)
router.post('/register', upload.single('userImage'), controller.registerUser)

router.get('/:id', controller.getUser)
router.patch('/:id', controller.editUser)
router.delete('/:id', controller.deleteUser)

router.post('/inference', controller.inferenceAI)

module.exports = router
