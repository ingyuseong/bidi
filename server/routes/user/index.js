const router = require('express').Router()
const controller = require('./controller')

router.get('/', controller.getUsers)
router.post('/register', controller.registerUser)

module.exports = router
