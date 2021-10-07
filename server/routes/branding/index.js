const router = require('express').Router()
const controller = require('./controller')
const { routesAsyncWrapper } = require('../../lib/asyncWrapper')

/*
    [ 1. POST Methods ]
    POST /api/branding/register : 포트폴리오 등록 API
    
    [ 2. GET Methods ]
    GET /api/branding/list               : 전체 포트폴리오 목록 조회 (메인으로 설정된 포트폴리오 only)
    GET /api/branding/:id                : 특정 포트폴리오 정보 조회
    GET /api/branding/designer/:id       : 유저의 전체 포트폴리오 목록 조회
    GET /api/branding/main/designer/:id  : 유저의 메인 포트폴리오 정보 조회

    [ 3. PATCH Methods ]
    PATCH /api/branding/main         : 메인 포트폴리오 수정(user_id, branding_id)
    PATCH /api/branding/:brandingId  : 포트폴리오 정보 수정 API

    [ 4. DELETE Methods]
    DELETE /api/branding/:brandingId : 포트폴리오 삭제 API
*/

router.post('/register', routesAsyncWrapper(controller.registerBranding))

router.get('/list', routesAsyncWrapper(controller.getBrandingList))
router.get('/:id', routesAsyncWrapper(controller.getBranding))
router.get(
  '/designer/:id',
  routesAsyncWrapper(controller.getBrandingListByDesignerId)
)
router.get(
  '/main/designer/:id',
  routesAsyncWrapper(controller.getMainBrandingByDesignerId)
)

router.patch('/main', routesAsyncWrapper(controller.patchMainBranding))
router.patch('/:id', routesAsyncWrapper(controller.patchBranding))

router.delete('/:id', routesAsyncWrapper(controller.deleteBranding))

module.exports = router
