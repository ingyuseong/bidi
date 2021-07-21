const brandingServices = require('../../services/branding')
const { STATUS_CODE, ERROR_MESSAGE } = require('../../lib/constants')

/*
    GET /api/branding/:userId
    * 제안서 정보 조회 API
*/
exports.getBrandingInfo = async (req, res, next) => {
  try {
    const { userId } = req.params
    const brandingInfo = await brandingServices.getBrandingInfo(userId)

    res.status(STATUS_CODE.SUCCESS).json({
      message: '브랜딩 페이지 정보 조회 성공',
      data: brandingInfo,
    })
  } catch (error) {
    console.log(error)
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
