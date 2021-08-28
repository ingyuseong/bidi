const router = require('express').Router()
const controller = require('./controller')
const upload = require('../../middleware/uploadAfterImage')

/*
    [ 1. POST Methods ]
    POST /api/proposal/register         : 제안서 등록 API
    POST /api/proposal/registerWithFile : 제안서 등록 API with Image File
    
    [ 2. GET Methods ]
    GET /api/proposal/list          : 전체 제안서 목록 조회 API
    GET /api/proposal/:id           : 제안서 정보 조회 API
    GET /api/proposal/user/:userId  : 유저 ID로 제안서 정보 조회 API

    [ 3. PATCH Methods ]
    PATCH /api/proposal/:id           : 제안서 정보 수정 API

    [ 4. DELETE Methods]
    DELETE /api/proposal/:id : 제안서 정보 삭제 API
*/

router.post('/register', controller.registerProposal)
router.post(
  '/registerWithFile',
  upload.single('afterImage'),
  controller.registerWithFile
)

router.get('/list', controller.getProposalList)
router.get('/:id', controller.getProposal)
router.get('/user/:id', controller.getProposalByUserId)

router.patch('/:id', controller.patchProposal)

router.delete('/:id', controller.deleteProposal)

module.exports = router
