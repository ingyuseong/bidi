const router = require('express').Router()
const controller = require('./controller')

/*
    [ 1. POST Methods ]
    POST /api/branding/register : 포트폴리오 등록 API
    
    [ 2. GET Methods ]
    GET /api/branding/list         : 전체 포트폴리오 목록 조회 (메인으로 설정된 포트폴리오 only)
    GET /api/branding/list/:userId : 유저의 전체 포트폴리오 목록 조회
    GET /api/branding/:brandingId  : 특정 포트폴리오 정보 조회
    GET /api/branding/main/:userId : 유저의 메인 포트폴리오 정보 조회

    [ 3. PATCH Methods ]
    PATCH /api/branding/main         : 메인 포트폴리오 수정
    PATCH /api/branding/:brandingId  : 포트폴리오 정보 수정 API

    [ 4. DELETE Methods]
    DELETE /api/branding/:brandingId : 포트폴리오 삭제 API
*/

router.post('/register', controller.registerBranding)

router.get('/list', controller.getBrandingList)
router.get('/list/:userId', controller.getBrandingListByUserId)
router.get('/:brandingId', controller.getBranding)
router.get('/main/:userId', controller.getBrandingByUserId)

router.patch('/main', controller.patchMainBranding)
router.patch('/:brandingId', controller.patchBranding)

router.delete('/:brandingId', controller.deleteBranding)

module.exports = router
