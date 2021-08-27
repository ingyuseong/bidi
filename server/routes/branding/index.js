const router = require('express').Router()
const controller = require('./controller')

/*
    [ 1. POST Methods ]
    POST /api/branding/register : 포트폴리오 등록 API
    
    [ 2. GET Methods ]
    GET /api/branding/list              : 전체 포트폴리오 목록 조회 (메인으로 설정된 포트폴리오 only)
    GET /api/branding/designer/:id      : 유저의 전체 포트폴리오 목록 조회
    GET /api/branding/:id               : 특정 포트폴리오 정보 조회
    GET /api/branding/main/:id          : 유저의 메인 포트폴리오 정보 조회

    [ 3. PATCH Methods ]
    PATCH /api/branding/main         : 메인 포트폴리오 수정(user_id, branding_id)
    PATCH /api/branding/:brandingId  : 포트폴리오 정보 수정 API

    [ 4. DELETE Methods]
    DELETE /api/branding/:brandingId : 포트폴리오 삭제 API
*/

router.post('/register', controller.registerBranding)

router.get('/list', controller.getBrandingList)
router.get('/:id', controller.getBranding)
router.get('/designer/:id', controller.getBrandingListByDesignerId)
router.get('/main/:id', controller.getMainBrandingByDesignerId)

router.patch('/main', controller.patchMainBranding)
router.patch('/:id', controller.patchBranding)

router.delete('/:id', controller.deleteBranding)

module.exports = router
