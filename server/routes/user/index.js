const router = require('express').Router()
const controller = require('./controller')

router.get('/:id', controller.getUser)
router.get('/list', controller.getUsers)
router.post('/register', controller.registerUser)

module.exports = router
