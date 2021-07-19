const router = require('express').Router()
const controller = require('./controller')

router.get('/:id', controller.getProposal)
router.patch('/:id', controller.editProposal)
router.delete('/:id', controller.deleteProposal)

router.get('/list', controller.getProposals)
router.post('/register', controller.registerProposal)

router.get('/register/keyword', controller.registerKeyword)

module.exports = router
