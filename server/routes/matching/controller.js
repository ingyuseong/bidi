const matchingServices = require('../../services/matching')
const { STATUS_CODE } = require('../../lib/constants')

// [ 1. POST Methods ]
exports.registerMatching = async (req, res) => {
  const body = req.body
  const matching = await matchingServices.createMatching(body)
  if (matching) {
    res.status(STATUS_CODE.CREATED).json({
      status: 'success',
      message: '매칭 생성 성공',
      data: [matching],
    })
  } else {
    res.status(STATUS_CODE.BAD_REQUEST).json({
      status: 'failed',
      message: '매칭 등록에 실패했습니다',
      data: [],
    })
  }
}

// [ 2. GET Methods ]
exports.getMatchingList = async (req, res) => {
  const matchingList = await matchingServices.findAllMatching()
  if (matchingList && matchingList.length > 0) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '전체 매칭 목록 조회 성공',
      data: matchingList,
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '조회할 전체 매칭 목록이 없습니다',
      data: [],
    })
  }
}
exports.getMatching = async (req, res) => {
  const { id } = req.params
  const matching = await matchingServices.findOneMatching(id)
  if (matching) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '매칭 정보 조회 성공',
      data: [matching],
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '조회할 매칭 정보가 없습니다',
      data: [],
    })
  }
}
exports.getMatchingByCustomerId = async (req, res) => {
  // 유저는 한개의 매칭만 가질 수 있음!
  const { id } = req.params
  const matching = await matchingServices.findOneMatchingByCustomerId(id)
  if (matching) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '유저의 매칭 조회 성공',
      data: [matching],
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '조회할 유저의 매칭이 없습니다',
      data: [],
    })
  }
}
exports.getMatchingListByDesignerId = async (req, res) => {
  // 디자이너는 여러 개의 매칭 가능!
  const { id } = req.params
  const matchingList = await matchingServices.findAllMatchingByDesignerId(id)
  if (matchingList && matchingList.length > 0) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '디자이너의 매칭 목록 조회 성공',
      data: matchingList,
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '조회할 디자이너의 매칭 목록이 없습니다',
      data: [],
    })
  }
}
exports.getMatchingHistoryListByCustomerId = async (req, res) => {
  const { id } = req.params
  const matchingList =
    await matchingServices.findAllMatchingHistoryByCustomerId(id)
  if (matchingList && matchingList.length > 0) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '유저의 매칭히스토리 목록 조회 성공',
      data: matchingList,
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '조회할 유저의 매칭히스토리 목록이 없습니다',
      data: [],
    })
  }
}
exports.getMatchingHistoryListByDesignerId = async (req, res) => {
  const { id } = req.params
  const matchingList =
    await matchingServices.findAllMatchingHistoryByDesignerId(id)
  if (matchingList && matchingList.length > 0) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '디자이너의 매칭히스토리 목록 조회 성공',
      data: matchingList,
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '조회할 디자이너의 매칭히스토리 목록이 없습니다',
      data: [],
    })
  }
}

// [ 3. PATCH Methods ]
exports.patchMatchingTime = async (req, res) => {
  const { id } = req.params
  const body = req.body
  const patchedMatchingTimeCount = await matchingServices.updateMatchingTime(
    id,
    body
  )
  if (patchedMatchingTimeCount) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '매칭 시간 정보 수정 성공',
      data: patchedMatchingTimeCount,
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '수정된 매칭 시간 정보가 없습니다',
      data: patchedMatchingTimeCount,
    })
  }
}
exports.patchMatchingReview = async (req, res) => {
  const { id } = req.params
  const body = req.body
  const patchedMatchingReviewCount =
    await matchingServices.updateMatchingReview(id, body)
  if (patchedMatchingReviewCount) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '매칭 리뷰 정보 수정 성공',
      data: patchedMatchingReviewCount,
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '수정된 매칭 리뷰 정보가 없습니다',
      data: patchedMatchingReviewCount,
    })
  }
}
exports.patchMatchingStar = async (req, res) => {
  const { id } = req.params
  const body = req.body
  const patchedMatchingStarCount = await matchingServices.updateMatchingStar(
    id,
    body
  )
  if (patchedMatchingStarCount) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '매칭 별점 상태 정보 수정 성공',
      data: patchedMatchingStarCount,
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '수정된 매칭 별점 정보가 없습니다',
      data: patchedMatchingStarCount,
    })
  }
}
exports.patchMatchingDone = async (req, res) => {
  const { id } = req.params
  const body = req.body
  const patchedMatchingDoneCount = await matchingServices.updateMatchingDone(
    id,
    body
  )
  if (patchedMatchingDoneCount) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '매칭 종료 상태 정보 수정 성공',
      data: patchedMatchingDoneCount,
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '수정된 매칭 종료 정보가 없습니다',
      data: patchedMatchingDoneCount,
    })
  }
}
exports.patchMatchingCanceled = async (req, res) => {
  const { id } = req.params
  const body = req.body
  const patchedMatchingCancelCount =
    await matchingServices.updateMatchingCanceled(id, body)
  if (patchedMatchingCancelCount) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '매칭 취소 상태 정보 수정 성공',
      data: patchedMatchingCancelCount,
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '수정된 매칭 취소 정보가 없습니다',
      data: patchedMatchingCancelCount,
    })
  }
}

// [ 4. DELETE Methods]
exports.deleteMatching = async (req, res) => {
  const { id } = req.params
  const deletedMatchingCount = await matchingServices.destroyMatching(id)
  if (deletedMatchingCount) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '매칭 정보 삭제 성공',
      data: deletedMatchingCount,
    })
  } else {
    res.status(STATUS_CODE.NOT_FOUND).json({
      status: 'failed',
      message: '삭제할 매칭 정보가 없습니다',
      data: deletedMatchingCount,
    })
  }
}
