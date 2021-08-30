const matchingServices = require('../../services/matching')
const { STATUS_CODE, ERROR_MESSAGE } = require('../../lib/constants')

// [ 1. POST Methods ]
exports.registerMatching = async (req, res, next) => {
  try {
    const body = req.body
    const matching = await matchingServices.createMatching(body)
    if (matching) {
      res.status(STATUS_CODE.CREATED).json({
        message: '매칭 생성 성공',
        data: matching,
      })
    } else {
      res.status(STATUS_CODE.BAD_REQUEST).json({
        message: '매칭 등록 실패',
        data: matching,
      })
    }
  } catch (err) {
    console.error(ERROR_MESSAGE.ROUTES_ERROR)
    console.error(err)
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}

// [ 2. GET Methods ]
exports.getMatchingList = async (req, res, next) => {
  try {
    const matchingList = await matchingServices.findAllMatching()
    if (matchingList && matchingList.length > 0) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '전체 매칭 목록 조회 성공',
        data: matchingList,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        message: '전체 매칭 목록 조회 실패(No resource)',
        data: null,
      })
    }
  } catch (err) {
    console.error(ERROR_MESSAGE.ROUTES_ERROR)
    console.error(err)
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
exports.getMatchingListByDesignerId = async (req, res, next) => {
  try {
    const { id } = req.params
    const matchingList = await matchingServices.findAllMatchingByDesignerId(id)
    if (matchingList && matchingList.length > 0) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '디자이너의 매칭 목록 조회 성공',
        data: matchingList,
      })
    } else {
      /* 임시 주석 - 수정 필요 */
      res.status(STATUS_CODE.SUCCESS).json({
        message: '디자이너의 매칭 목록 조회 실패(No resource)',
        data: [],
      })
    }
  } catch (err) {
    console.error(ERROR_MESSAGE.ROUTES_ERROR)
    console.error(err)
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
exports.getMatchingListByCustomerId = async (req, res, next) => {
  try {
    const { id } = req.params
    const matchingList = await matchingServices.findAllMatchingByCustomerId(id)
    if (matchingList && matchingList.length > 0) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '유저의 매칭 목록 조회 성공',
        data: matchingList,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        message: '유저의 매칭 목록 조회 실패(No resource)',
        data: null,
      })
    }
  } catch (err) {
    console.error(ERROR_MESSAGE.ROUTES_ERROR)
    console.error(err)
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
exports.getMatching = async (req, res, next) => {
  try {
    const { id } = req.params
    const matching = await matchingServices.findOneMatching(id)
    if (matching) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '매칭 정보 조회 성공',
        data: matching,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        message: '매칭 정보 조회 실패',
        data: null,
      })
    }
  } catch (err) {
    console.error(ERROR_MESSAGE.ROUTES_ERROR)
    console.error(err)
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}

// [ 3. PATCH Methods ]
exports.patchMatchingTime = async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body
    const patchedMatchingTimeCount = await matchingServices.updateMatchingTime(
      id,
      body
    )
    if (patchedMatchingTimeCount) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '매칭 시간 정보 수정 성공',
        data: patchedMatchingTimeCount,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        // 에러는 없으나, 수정된 정보가 없습니다!
        message: '매칭 시간 정보 수정 실패(No resources or No change)',
        data: patchedMatchingTimeCount,
      })
    }
  } catch (err) {
    console.error(ERROR_MESSAGE.ROUTES_ERROR)
    console.error(err)
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
exports.patchMatchingReview = async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body
    const patchedMatchingReviewCount =
      await matchingServices.updateMatchingReview(id, body)
    if (patchedMatchingReviewCount) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '매칭 리뷰 정보 수정 성공',
        data: patchedMatchingReviewCount,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        // 에러는 없으나, 수정된 정보가 없습니다!
        message: '매칭 리뷰 정보 수정 실패(No resources or No change)',
        data: patchedMatchingReviewCount,
      })
    }
  } catch (err) {
    console.error(ERROR_MESSAGE.ROUTES_ERROR)
    console.error(err)
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
exports.patchMatchingStar = async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body
    const patchedMatchingStarCount = await matchingServices.updateMatchingStar(
      id,
      body
    )
    if (patchedMatchingStarCount) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '매칭 별점 상태 정보 수정 성공',
        data: patchedMatchingStarCount,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        // 에러는 없으나, 수정된 정보가 없습니다!
        message: '매칭 별점 상태 정보 수정 실패(No resources or No change)',
        data: patchedMatchingStarCount,
      })
    }
  } catch (err) {
    console.error(ERROR_MESSAGE.ROUTES_ERROR)
    console.error(err)
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
exports.patchMatchingDone = async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body
    const patchedMatchingDoneCount = await matchingServices.updateMatchingDone(
      id,
      body
    )
    if (patchedMatchingDoneCount) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '매칭 종료 상태 정보 수정 성공',
        data: patchedMatchingDoneCount,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        // 에러는 없으나, 수정된 정보가 없습니다!
        message: '매칭 종료 상태 정보 수정 실패(No resources or No change)',
        data: patchedMatchingDoneCount,
      })
    }
  } catch (err) {
    console.error(ERROR_MESSAGE.ROUTES_ERROR)
    console.error(err)
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
exports.patchMatchingCanceled = async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body
    const patchedMatchingCancelCount =
      await matchingServices.updateMatchingCanceled(id, body)
    if (patchedMatchingCancelCount) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '매칭 취소 상태 정보 수정 성공',
        data: patchedMatchingCancelCount,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        // 에러는 없으나, 수정된 정보가 없습니다!
        message: '매칭 취소 상태 정보 수정 실패(No resources or No change)',
        data: patchedMatchingCancelCount,
      })
    }
  } catch (err) {
    console.error(ERROR_MESSAGE.ROUTES_ERROR)
    console.error(err)
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}

// [ 4. DELETE Methods]
exports.deleteMatching = async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedMatchingCount = await matchingServices.destroyMatching(id)
    if (deletedMatchingCount) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '매칭 정보 삭제 성공',
        data: deletedMatchingCount,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        // 에러는 없으나, 수정된 정보가 없습니다!
        message: '매칭 정보 삭제 실패(No resources)',
        data: deletedMatchingCount,
      })
    }
  } catch (err) {
    console.error(ERROR_MESSAGE.ROUTES_ERROR)
    console.error(err)
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
