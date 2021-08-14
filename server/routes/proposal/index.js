const router = require('express').Router()
const controller = require('./controller')

router.post('/register', controller.registerProposal)

router.get('/list', controller.getProposals)
router.get('/:id', controller.getProposal)
router.get('/user/:userId', controller.getProposalByUserId)

router.patch('/:id', controller.editProposal)
router.patch('/status/:id', controller.editProposalStatus)

router.delete('/:id', controller.deleteProposal)

module.exports = router
