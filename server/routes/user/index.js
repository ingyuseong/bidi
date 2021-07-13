const router = require('express').Router()
const controller = require('./controller')

router.get('/:id', controller.getUser)
router.patch('/:id', controller.editUser)
router.delete('/:id', controller.deleteUser)
router.get('/list', controller.getUsers)
router.post('/register', controller.registerUser)

module.exports = router
