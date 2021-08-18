const router = require('express').Router()
const controller = require('./controller')
const upload = require('../../middleware/uploadAfterImage')

router.post('/register', controller.registerProposal)
router.post(
  '/register/withfile',
  upload.single('afterImage'),
  controller.registerProposalWithFile
)

router.get('/list', controller.getProposals)
router.get('/:id', controller.getProposal)
router.get('/user/:userId', controller.getProposalByUserId)

router.patch('/:id', controller.editProposal)
router.patch('/status/:id', controller.editProposalStatus)

router.delete('/:id', controller.deleteProposal)

module.exports = router
