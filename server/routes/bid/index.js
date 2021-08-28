const router = require('express').Router()
const controller = require('./controller')

/*
    [ 1. POST Methods ]
    POST /api/bid/register : 비드 등록 API
    
    [ 2. GET Methods ]
    GET /api/bid/designer/:id  : 디자이너 비드 목록 조회 API
    GET /api/bid/customer/:id  : 유저 비드 목록 조회 API
    GET /api/bid/:id           : 비드 정보 조회 API

    [ 3. PATCH Methods ]
    PATCH /api/bid/:id          : 비드 수정 API
    PATCH /api/bid/canceled/:id : 비드 취소 API

    [ 4. DELETE Methods]
    DELETE /api/bid/:id : 비드 삭제 API
*/

router.post('/register', controller.registerBid)

router.get('/designer/:id', controller.getBidListByDesignerId)
router.get('/customer/:id', controller.getBidListByCustomerId)
router.get('/:id', controller.getBid)

router.patch('/:id', controller.patchBid)
router.patch('/canceled/:id', controller.patchBidCanceled)

router.delete('/:id', controller.deleteBid)

module.exports = router
