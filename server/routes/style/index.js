const router = require('express').Router()
const controller = require('./controller')
const uploadImage = require('../../middleware/uploadStyle')
const { routesAsyncWrapper } = require('../../lib/asyncWrapper')

/*
    [ 1. POST Methods ]
    POST /api/style/register : 스타일 등록 API
    
    [ 2. GET Methods ]
    GET /api/style/list          : 전체 스타일 목록 조회 API
    GET /api/style/designer/:id      : 디자이너 ID로 스타일 목록 조회 API
    GET /api/style/:id           : 스타일 정보 조회 API

    [ 3. PATCH Methods ]
    PATCH /api/style/:id           : 스타일 정보 수정 API
    PATCH /api/style/enable/:id    : 스타일 Ai 가능여부 수정 API

    [ 4. DELETE Methods]
    DELETE /api/style/:id : 스타일 정보 삭제 API
*/

router.post(
  '/register',
  uploadImage.array('images', 10),
  routesAsyncWrapper(controller.registerStyle)
)

router.get('/list', routesAsyncWrapper(controller.getStyleList))
router.get(
  '/designer/:id',
  routesAsyncWrapper(controller.getStyleListByDesignerId)
)
router.get('/:id', routesAsyncWrapper(controller.getStyle))

router.patch('/:id', routesAsyncWrapper(controller.patchStyle))
router.patch('/enable/:id', routesAsyncWrapper(controller.patchAiEnable))

router.delete('/:id', routesAsyncWrapper(controller.deleteStyle))

module.exports = router
