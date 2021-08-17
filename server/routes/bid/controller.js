const bidServices = require('../../services/bid')
const { STATUS_CODE, ERROR_MESSAGE } = require('../../lib/constants')

/*
    PATCH /api/bid/:id
    * Bid 정보 수정 API
*/
exports.editBid = async (req, res, next) => {
  try {
    const { id } = req.params
    const params = req.body
    const bid = await bidServices.editBid({ ...params, id })
    res.status(STATUS_CODE.SUCCESS).json({
      message: '비드 정보 수정 성공',
      data: { bid },
    })
  } catch (error) {
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}

/*
    DELETE /api/bid/:id
    * Bid 정보 삭제 API
*/
exports.deleteBid = async (req, res, next) => {
  try {
    const { id } = req.params
    const bid = await bidServices.deleteBid(id)

    res.status(STATUS_CODE.SUCCESS).json({
      message: '비드 정보 삭제 성공',
      data: { bid },
    })
  } catch (error) {
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}

/*
    POST /api/bid/register
    * Bid 정보 작성 API
*/
exports.registerBid = async (req, res, next) => {
  try {
    const params = req.body
    const bid = await bidServices.registerBid(params)
    const bidStyle = await bidServices.registerBidStyle({
      bidId: bid.id,
      styles: params.styles,
    })

    res.status(STATUS_CODE.SUCCESS).json({
      message: '비드 작성 성공',
      data: { bid, bidStyle },
    })
  } catch (error) {
    console.log(error)
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}

/*
    PATCH /api/bid/status/:id
    * Bid 상태 정보 수정 API
*/
exports.editBidStatus = async (req, res, next) => {
  try {
    const { id } = req.params
    const params = req.body
    const bid = await bidServices.editBidStatus({ ...params, id })
    res.status(STATUS_CODE.SUCCESS).json({
      message: '비드 상태 정보 수정 성공',
      data: { bid },
    })
  } catch (error) {
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}

exports.editBidStatusWithProposal = async (req, res, next) => {
  try {
    const { proposalId } = req.params
    const params = req.body
    const bid = await bidServices.editBidStatusWithProposal({
      ...params,
      proposalId,
    })
    res.status(STATUS_CODE.SUCCESS).json({
      message: '비드 상태 정보 수정 성공',
      data: { bid },
    })
  } catch (error) {
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}

/*
    GET /api/bid/user/:userId
    * 디자이너 ID 기반 bid 조회
*/
exports.getBidByDesignerId = async (req, res, next) => {
  try {
    const { userId } = req.params
    const bidList = await bidServices.getBidByDesignerId(userId)
    res.status(STATUS_CODE.SUCCESS).json({
      message: '비드 조회 성공',
      data: { bidList },
    })
  } catch (error) {
    console.log(error)
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}

/*
    GET /api/bid/user/:userId
    * 디자이너 ID 기반 bid 조회
*/
exports.getBidByCustomerId = async (req, res, next) => {
  try {
    const { userId } = req.params
    const bidList = await bidServices.getBidByCustomerId(userId)
    res.status(STATUS_CODE.SUCCESS).json({
      message: '비드 조회 성공',
      data: { bidList },
    })
  } catch (error) {
    console.log(error)
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
