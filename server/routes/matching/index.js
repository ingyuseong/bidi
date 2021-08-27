const router = require('express').Router()
const controller = require('./controller')
const upload = require('../../middleware/uploadAfterImage')

/*
    [ 1. POST Methods ]
    POST /api/proposal/register         : 제안서 등록 API
    
    [ 2. GET Methods ]
    GET /api/proposal/list          : 전체 제안서 목록 조회 API
    GET /api/proposal/:id           : 제안서 정보 조회 API
    GET /api/proposal/user/:userId  : 유저 ID로 제안서 정보 조회 API

    [ 3. PATCH Methods ]
    PATCH /api/proposal/:id           : 제안서 정보 수정 API
    PATCH /api/proposal/matching/:id  : 제안서 매칭여부 수정 API

    [ 4. DELETE Methods]
    DELETE /api/proposal/:id : 제안서 정보 삭제 API
*/

router.post('/register', controller.registerMatching)

router.get('/list', controller.getMatchingList)
router.get('/designer/:id', controller.getMatchingListByDesignerId)
router.get('/customer/:id', controller.getMatchingListByCustomerId)
router.get('/:id', controller.getMatching)

router.patch('/time/:id', controller.patchMatchingTime)
router.patch('/review/:id', controller.patchMatchingReview)
router.patch('/star/:id', controller.patchMatchingStar)
router.patch('/done/:id', controller.patchMatchingDone)
router.patch('/cancel/:id', controller.patchMatchingCanceled)

router.delete('/:id', controller.deleteMatching)

module.exports = router
