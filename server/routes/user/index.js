const router = require('express').Router()
const controller = require('./controller')

router.get('/list', controller.getUsers)
router.post('/register', controller.registerUser)

module.exports = router
