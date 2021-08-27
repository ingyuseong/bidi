const bidServices = require('../../services/bid')
const { STATUS_CODE, ERROR_MESSAGE } = require('../../lib/constants')

// [ 1. POST Methods ]
exports.registerBid = async (req, res, next) => {
  try {
    const body = req.body
    const bid = await bidServices.createBid(body)
    const bidStyle = await bidServices.createBidStyle({
      bidId: bid.id,
      stylesIdString: body.stylesIdString,
    })
    if (bid) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '비드 등록 성공',
        data: { bid, bidStyle },
      })
    } else {
      res.status(STATUS_CODE.BAD_REQUEST).json({
        message: '비드 등록 실패',
        data: null,
      })
    }
  } catch (error) {
    console.error(ERROR_MESSAGE.ROUTES_ERROR)
    console.error(err)
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}

// [ 2. GET Methods ]
exports.getBidListByDesignerId = async (req, res, next) => {
  try {
    const { id } = req.params
    const bidList = await bidServices.findAllBidByDesignerId(id)
    if (bidList && bidList.length > 0) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '디자이너 비드 목록 조회 성공',
        data: bidList,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        message: '디자이너 비드 목록 조회 실패',
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
exports.getBidListByCustomerId = async (req, res, next) => {
  try {
    const { id } = req.params
    const bidList = await bidServices.findAllBidByCustomerId(id)
    if (bidList && bidList.length > 0) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '유저 비드 목록 조회 성공',
        data: bidList,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        message: '유저 비드 목록 조회 실패',
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
exports.getBid = async (req, res, next) => {
  try {
    const { id } = req.params
    const bid = await bidServices.findOneBid(id)
    if (bid) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '비드 정보 조회 성공',
        data: bid,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        message: '비드 정보 조회 실패',
        data: null,
      })
    }
  } catch (error) {
    console.log(error)
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
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
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
exports.patchBidCanceled = async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body
    const bid = await bidServices.updateBidCanceled(id, body)
    res.status(STATUS_CODE.SUCCESS).json({
      message: '비드 취소 상태 수정 성공',
      data: { bid },
    })
  } catch (error) {
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
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
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
