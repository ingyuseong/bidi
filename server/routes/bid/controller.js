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
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}

// [ 2. GET Methods ]
exports.getBid = async (req, res, next) => {
  try {
    const { id } = req.params
    let bid = await bidServices.findOneBid(id)
    if (bid) {
      let keyword_array = []
      if (bid.proposal.keyword_array) {
        keyword_array = bid.proposal.keyword_array.split(',')
      }
      bid = {
        ...bid.dataValues,
        proposal: {
          ...bid.proposal.dataValues,
          keyword_array,
        },
        bidStyles: bid.bidStyles.map((style) => {
          let style_keyword_array = []
          if (style.keyword_array) {
            style_keyword_array = style.keyword_array.split(',')
          }
          return {
            ...style.dataValues,
            keyword_array: style_keyword_array,
            img_src_array: style.img_src_array.split(','),
          }
        }),
      }
      res.status(STATUS_CODE.SUCCESS).json({
        message: '비드 정보 조회 성공',
        data: { bid },
      })
    } else {
      res.status(STATUS_CODE.SUCCESS).json({
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
exports.getBidListByDesignerId = async (req, res, next) => {
  try {
    const { userId } = req.params
    let bidList = await bidServices.findAllBidByDesignerId(userId)
    if (bidList && bidList.length > 0) {
      bidList = bidList.map((bid) => {
        let keyword_array = []
        if (bid.proposal.keyword_array) {
          keyword_array = bid.proposal.keyword_array.split(',')
        }
        return {
          ...bid.dataValues,
          proposal: {
            ...bid.proposal.dataValues,
            keyword_array,
          },
          bidStyles: bid.bidStyles.map((style) => {
            let style_keyword_array = []
            if (style.keyword_array) {
              style_keyword_array = style.keyword_array.split(',')
            }
            return {
              ...style.dataValues,
              keyword_array: style_keyword_array,
              img_src_array: style.img_src_array.split(','),
            }
          }),
        }
      })
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
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
exports.getBidListByCustomerId = async (req, res, next) => {
  try {
    const { userId } = req.params
    let bidList = await bidServices.findAllBidByCustomerId(userId)
    if (bidList && bidList.length > 0) {
      bidList = bidList.map((bid) => {
        let keyword_array = []
        if (bid.proposal.keyword_array) {
          keyword_array = bid.proposal.keyword_array.split(',')
        }
        return {
          ...bid.dataValues,
          proposal: {
            ...bid.proposal.dataValues,
            keyword_array,
          },
          bidStyles: bid.bidStyles.map((style) => {
            let style_keyword_array = []
            if (style.keyword_array) {
              style_keyword_array = style.keyword_array.split(',')
            }
            return {
              ...style.dataValues,
              keyword_array: style_keyword_array,
              img_src_array: style.img_src_array.split(','),
            }
          }),
        }
      })
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
