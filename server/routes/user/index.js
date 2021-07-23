const router = require('express').Router()
const controller = require('./controller')

router.get('/list', controller.getUsers)
router.post('/token', controller.checkToken)
router.post('/register', controller.registerUser)

router.get('/:id', controller.getUser)
router.patch('/:id', controller.editUser)
router.delete('/:id', controller.deleteUser)

module.exports = router
