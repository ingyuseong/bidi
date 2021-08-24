const bidServices = require('../../services/bid')
const { STATUS_CODE, ERROR_MESSAGE } = require('../../lib/constants')

// [ 1. POST Methods ]
exports.registerBid = async (req, res, next) => {
  try {
    const params = req.body
    const bid = await bidServices.createBid(params)
    const bidStyle = await bidServices.createBidStyle({
      bidId: bid.id,
      stylesIdString: params.stylesIdString,
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

// [ 2. GET Methods ]
exports.getBid = async (req, res, next) => {
  try {
    const { id } = req.params
    const bid = await bidServices.findOneBid(id)
    if (bid) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '비드 정보 조회 성공',
        data: { bid },
      })
    } else {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '비드 정보 조회 실패',
        data: { bid },
      })
    }
  } catch (error) {
    console.log(error)
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
exports.getBidListByDesignerId = async (req, res, next) => {
  try {
    const { userId } = req.params
    const bidList = await bidServices.findAllBidByDesignerId(userId)
    if (bidList && bidList.length > 0) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '디자이너 비드 목록 조회 성공',
        data: { bidList },
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        message: '디자이너 비드 목록 조회 실패',
        data: null,
      })
    }
  } catch (error) {
    console.log(error)
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
exports.getBidListByCustomerId = async (req, res, next) => {
  try {
    const { userId } = req.params
    const bidList = await bidServices.findAllBidByCustomerId(userId)
    if (bidList && bidList.length > 0) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '유저 비드 목록 조회 성공',
        data: { bidList },
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        message: '유저 비드 목록 조회 실패',
        data: null,
      })
    }
  } catch (error) {
    console.log(error)
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}

// [ 3. PATCH Methods ]
exports.patchBid = async (req, res, next) => {
  try {
    const { bidId } = req.params
    const params = req.body
    const bid = await bidServices.updateBid({ id: bidId, ...params })
    res.status(STATUS_CODE.SUCCESS).json({
      message: '비드 수정 성공',
      data: { bid },
    })
  } catch (error) {
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
exports.patchBidMatching = async (req, res, next) => {
  try {
    const { bid_id, customer_id } = req.body
    await bidServices.updateBidCancelElse({
      customerId: customer_id,
    })
    const bid = await bidServices.updateBidMatching({ bidId: bid_id })
    res.status(STATUS_CODE.SUCCESS).json({
      message: '비드 매칭 상태 수정 성공',
      data: { bid },
    })
  } catch (error) {
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
exports.patchBidCanceled = async (req, res, next) => {
  try {
    const { bid_id } = req.body
    const bid = await bidServices.updateBidCanceled({ bidId: bid_id })
    res.status(STATUS_CODE.SUCCESS).json({
      message: '비드 취소 상태 수정 성공',
      data: { bid },
    })
  } catch (error) {
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}

// [ 4. DELETE Methods]
exports.deleteBid = async (req, res, next) => {
  try {
    const { id } = req.params
    const bid = await bidServices.destroyBid(id)

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
