const styleScrapServices = require('../../services/styleScrap')
const { STATUS_CODE, ERROR_MESSAGE } = require('../../lib/constants')

// [ 1. POST Methods ]
exports.registerStyleScrap = async (req, res, next) => {
  try {
    const { user_id, style_id } = req.body
    const styleScrap = await styleScrapServices.createStyleScrap({
      userId: user_id,
      styleId: style_id,
    })

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

// [ 2. GET Methods ]
exports.getStyleScrapList = async (req, res, next) => {
  try {
    const { userId } = req.params
    const styleScrap = await styleScrapServices.findAllStyleScrap(userId)
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

// [ 3. PATCH Methods ]
/*
//
//
//
//
*/

// [ 4. DELETE Methods]
exports.deleteStyleScrap = async (req, res, next) => {
  try {
    const styleScrap = await styleScrapServices.destroyStyleScrap(req.params)

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
