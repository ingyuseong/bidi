const router = require('express').Router()
const controller = require('./controller')
const upload = require('../../middleware/uploadAfterImage')
const { routesAsyncWrapper } = require('../../lib/asyncWrapper')

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

router.post('/register', routesAsyncWrapper(controller.registerProposal))
router.post(
  '/registerWithFile',
  upload.single('afterImage'),
  routesAsyncWrapper(controller.registerWithFile)
)

router.get('/list', routesAsyncWrapper(controller.getProposalList))
router.get('/:id', routesAsyncWrapper(controller.getProposal))
router.get('/user/:id', routesAsyncWrapper(controller.getProposalByUserId))

router.patch('/:id', routesAsyncWrapper(controller.patchProposal))

router.delete('/:id', routesAsyncWrapper(controller.deleteProposal))

module.exports = router
