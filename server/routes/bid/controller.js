const bidServices = require('../../services/bid')
const { STATUS_CODE } = require('../../lib/constants')

// [ 1. POST Methods ]
exports.registerBid = async (req, res) => {
  const body = req.body
  const bid = await bidServices.createBid(body)
  const bidStyle = await bidServices.createBidStyle({
    bidId: bid.id,
    styleIdList: body.styleIdList,
  })
  if (bid) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '비드 등록 성공',
      data: [{ bid, bidStyle }],
    })
  } else {
    res.status(STATUS_CODE.BAD_REQUEST).json({
      status: 'failed',
      message: '비드 등록 실패',
      data: [],
    })
  }
}

// [ 2. GET Methods ]
exports.getBidListByDesignerId = async (req, res) => {
  const { id } = req.params
  const bidList = await bidServices.findAllBidByDesignerId(id)
  if (bidList && bidList.length > 0) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '디자이너 비드 목록 조회 성공',
      data: bidList,
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '조회할 디자이너의 비드 목록이 없습니다',
      data: [],
    })
  }
}
exports.getBidListByCustomerId = async (req, res) => {
  const { id } = req.params
  const bidList = await bidServices.findAllBidByCustomerId(id)
  if (bidList && bidList.length > 0) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '유저 비드 목록 조회 성공',
      data: bidList,
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '조회할 유저의 비드 목록이 없습니다',
      data: [],
    })
  }
}
exports.getBid = async (req, res) => {
  const { id } = req.params
  const bid = await bidServices.findOneBid(id)
  if (bid) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '비드 정보 조회 성공',
      data: [bid],
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '조회할 비드 정보가 없습니다',
      data: [],
    })
  }
}

// [ 3. PATCH Methods ]
exports.patchBid = async (req, res) => {
  const { id } = req.params
  const body = req.body
  const patchedBidCount = await bidServices.updateBid(id, body)
  const patchBidStyleCount = await bidServices.updateBidStyle({
    bidId: id,
    styleIdList: body.styleIdList,
  })
  if (patchedBidCount || patchBidStyleCount) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '비드 정보 수정 성공',
      data: patchedBidCount,
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '수정된 비드 정보가 없습니다',
      data: patchedBidCount,
    })
  }
}
exports.patchBidCanceled = async (req, res) => {
  const { id } = req.params
  const patchedBidCount = await bidServices.updateBidCanceled(id)
  if (patchedBidCount) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '비드 취소 상태 수정 성공',
      data: patchedBidCount,
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '수정된 비드 취소 상태가 없습니다',
      data: patchedBidCount,
    })
  }
}

// [ 4. DELETE Methods]
exports.deleteBid = async (req, res) => {
  const { id } = req.params
  const deletedBidCount = await bidServices.destroyBid(id)
  if (deletedBidCount) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '비드 정보 삭제 성공',
      data: deletedBidCount,
    })
  } else {
    res.status(STATUS_CODE.NOT_FOUND).json({
      status: 'failed',
      message: '삭제할 비드 정보가 없습니다',
      data: deletedBidCount,
    })
  }
}
