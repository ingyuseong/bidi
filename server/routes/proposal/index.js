const router = require('express').Router()
const controller = require('./controller')

router.get('/list', controller.getProposals)
router.post('/register', controller.registerProposal)
router.get('/:id', controller.getProposal)
router.patch('/:id', controller.editProposal)
router.delete('/:id', controller.deleteProposal)

router.get('/user/:userId', controller.getProposalByUserId)

module.exports = router
