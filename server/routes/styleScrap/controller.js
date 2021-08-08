const styleScrapServices = require('../../services/styleScrap')
const { STATUS_CODE, ERROR_MESSAGE } = require('../../lib/constants')

/*
    GET /api/styleScarp/:id
    * 스타일 스크랩 조회 API
*/
exports.getStyleScrapList = async (req, res, next) => {
  try {
    const { userId } = req.params
    const styleScrap = await styleScrapServices.getStyleScrapList(userId)
    res.status(STATUS_CODE.SUCCESS).json({
      message: '스타일 스크랩 조회 성공',
      data: styleScrap,
    })
  } catch (error) {
    console.log(error)
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}

/*
    DELETE /api/user/:id
    * 사용자 정보 삭제 API
*/
exports.deleteStyleScrap = async (req, res, next) => {
  try {
    const styleScrap = await styleScrapServices.deleteStyleScrap(req.params)

    res.status(STATUS_CODE.SUCCESS).json({
      message: '스타일 스크랩 삭제 성공',
      data: styleScrap,
    })
  } catch (error) {
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}

/*
    POST /api/user/register
    * 회원가입 API
*/
exports.registerStyleScrap = async (req, res, next) => {
  try {
    const styleScrap = await styleScrapServices.registerStyleScrap(req.params)

    res.status(STATUS_CODE.SUCCESS).json({
      message: '스타일 스크랩 생성 성공',
      data: styleScrap,
    })
  } catch (error) {
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
