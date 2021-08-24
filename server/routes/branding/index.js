const router = require('express').Router()
const controller = require('./controller')

/*
    [ 1. POST Methods ]
    POST /api/branding/register : Branding 등록 API
    
    [ 2. GET Methods ]
    GET /api/branding/list         : 전체 Branding 조회 API (main branding only)
    GET /api/branding/list/:userId : 유저의 전체 Branding 조회 API (every braning of user)
    GET /api/branding/:brandingId  : 특정 Branding 조회 API (one branding)
    GET /api/branding/main/:userId : 유저의 메인 Branding 조회 API (main branding of user)

    [ 3. PATCH Methods ]
    PATCH /api/branding/patchMain  : Branding Main 설정 API
    PATCH /api/branding/:id   : Branding 정보 수정 API

    [ 4. DELETE Methods]
    DELETE /api/branding/:id : Branding 정보 삭제 API
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
