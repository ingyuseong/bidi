const router = require('express').Router()
const controller = require('./controller')
const { routesAsyncWrapper } = require('../../lib/asyncWrapper')

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

router.post('/register', routesAsyncWrapper(controller.registerBid))

router.get(
  '/designer/:id',
  routesAsyncWrapper(controller.getBidListByDesignerId)
)
router.get(
  '/customer/:id',
  routesAsyncWrapper(controller.getBidListByCustomerId)
)
router.get('/:id', routesAsyncWrapper(controller.getBid))

router.patch('/:id', routesAsyncWrapper(controller.patchBid))
router.patch('/canceled/:id', routesAsyncWrapper(controller.patchBidCanceled))

router.delete('/:id', routesAsyncWrapper(controller.deleteBid))

module.exports = router
