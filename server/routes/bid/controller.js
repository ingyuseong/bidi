const bidServices = require('../../services/bid')
const { STATUS_CODE, ERROR_MESSAGE } = require('../../lib/constants')

/*
    GET /api/bid/register
    * 제안서 정보 조회 API
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
