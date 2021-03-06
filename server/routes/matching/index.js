const router = require('express').Router()
const controller = require('./controller')
const upload = require('../../middleware/uploadAfterImage')
const { routesAsyncWrapper } = require('../../lib/asyncWrapper')

/*
    [ 1. POST Methods ]
    POST /api/matching/register         : 매칭 등록 API
    
    [ 2. GET Methods ]
    GET /api/matching/list                  : 전체 매칭 목록 조회 API
    GET /api/matching/:id                   : 매칭 정보 조회 API
    GET /api/matching/customer/:id          : 유저의 매칭 목록 조회 API
    GET /api/matching/designer/:id          : 디자이너의 매칭 목록 조회 API
    GET /api/matching/history/customer/:id  : 유저의 완료된 매칭 목록 조회 API
    GET /api/matching/history/designer/:id  : 디자이너의 완료된 매칭 목록 조회 API
    
    [ 3. PATCH Methods ]
    PATCH /api/matching/style/:id       : 매칭 스타일 정보 수정 API
    PATCH /api/matching/reserved/:id    : 매칭 승인 정보 수정 API
    PATCH /api/matching/review/:id      : 매칭 리뷰 정보 수정 API
    PATCH /api/matching/star/:id        : 매칭 별점 정보 수정 API
    PATCH /api/matching/done/:id        : 매칭 종료 상태 수정 API
    PATCH /api/matching/cancel/:id      : 매칭 취소 상태 수정 API

    [ 4. DELETE Methods]
    DELETE /api/matching/:id : 매칭 정보 삭제 API
*/

router.post('/register', routesAsyncWrapper(controller.registerMatching))

// GET Methods
router.get('/list', routesAsyncWrapper(controller.getMatchingList))
router.get('/:id', routesAsyncWrapper(controller.getMatching))
router.get(
  '/customer/:id',
  routesAsyncWrapper(controller.getMatchingByCustomerId)
)
router.get(
  '/designer/:id',
  routesAsyncWrapper(controller.getMatchingListByDesignerId)
)
router.get(
  '/history/customer/:id',
  routesAsyncWrapper(controller.getMatchingHistoryListByCustomerId)
)
router.get(
  '/history/designer/:id',
  routesAsyncWrapper(controller.getMatchingHistoryListByDesignerId)
)

// PATCH Methods
// 1. 매칭 중일 때 -> 예약 관련 처리
router.patch(
  '/reservation/:id',
  routesAsyncWrapper(controller.patchMatchingReservation)
)

// 2. 시술 종료 시
router.patch('/done/:id', routesAsyncWrapper(controller.patchMatchingDone))
router.patch(
  '/cancel/:id',
  routesAsyncWrapper(controller.patchMatchingCanceled)
)

// 3. 매칭 히스토리 관련
router.patch('/review/:id', routesAsyncWrapper(controller.patchMatchingReview))
router.patch('/star/:id', routesAsyncWrapper(controller.patchMatchingStar))

router.delete('/:id', routesAsyncWrapper(controller.deleteMatching))

module.exports = router
