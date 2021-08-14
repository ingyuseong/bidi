const bidServices = require('../../services/bid')
const proposalServices = require('../../services/proposal')
const matchingHistoryServices = require('../../services/matchingHistory')
const { STATUS_CODE, ERROR_MESSAGE } = require('../../lib/constants')

/*
    DELETE /api/matchingHistory/:id
    * Bid 정보 삭제 API
*/
exports.deleteMatchingHistory = async (req, res, next) => {
  try {
    const { id } = req.params
    const matchingHistory = await matchingHistoryServices.deleteMatchingHistory(
      id
    )

    res.status(STATUS_CODE.SUCCESS).json({
      message: '매칭 히스토리 정보 삭제 성공',
      data: { matchingHistory },
    })
  } catch (error) {
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}

/*
    POST /api/matchingHistory/register
    * Bid 정보 작성 API
*/
exports.registerMatchingHistory = async (req, res, next) => {
  console.log(req.body)
  try {
    const params = req.body
    const bid = await bidServices.editBidStatus({
      id: params.bid_id,
      status: 'done',
    })
    const proposal = await proposalServices.editProposalStatus({
      id: params.proposal_id,
      status: 'done',
    })
    const matchingHistory =
      await matchingHistoryServices.registerMatchingHistory(params)

    res.status(STATUS_CODE.SUCCESS).json({
      message: '매칭 히스토리 생성 성공',
      data: { matchingHistory },
    })
  } catch (error) {
    console.log(error)
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}

/*
    PATCH /api/matchingHistory/review/:id
    * Bid 상태 정보 수정 API
*/
exports.editReview = async (req, res, next) => {
  try {
    const { id } = req.params
    const params = req.body
    const matchingHistory = await matchingHistoryServices.editReview({
      ...params,
      id,
    })
    res.status(STATUS_CODE.SUCCESS).json({
      message: '리뷰 수정 성공',
      data: { matchingHistory },
    })
  } catch (error) {
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
exports.editStar = async (req, res, next) => {
  try {
    const { id } = req.params
    const params = req.body
    const matchingHistory = await matchingHistoryServices.editStar({
      ...params,
      id,
    })
    res.status(STATUS_CODE.SUCCESS).json({
      message: '별점 수정 성공',
      data: { matchingHistory },
    })
  } catch (error) {
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}

/*
    GET /api/matchingHistory/user/:userId
    * 디자이너 ID 기반 matchingHistory 조회
*/
exports.getMatchingHistoryByDesignerId = async (req, res, next) => {
  try {
    const { userId } = req.params
    const matchingHistoryList =
      await matchingHistoryServices.getMatchingHistoryByDesignerId(userId)
    res.status(STATUS_CODE.SUCCESS).json({
      message: '매칭 히스토리 조회 성공',
      data: { matchingHistoryList },
    })
  } catch (error) {
    console.log(error)
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}

/*
    GET /api/matchingHistory/user/:userId
    * 디자이너 ID 기반 matchingHistory 조회
*/
exports.getMatchingHistoryByCustomerId = async (req, res, next) => {
  try {
    const { userId } = req.params
    const matchingHistoryList =
      await matchingHistoryServices.getMatchingHistoryByCustomerId(userId)
    res.status(STATUS_CODE.SUCCESS).json({
      message: '매칭 히스토리 조회 성공',
      data: { matchingHistoryList },
    })
  } catch (error) {
    console.log(error)
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
