const styleScrapServices = require('../../services/styleScrap')
const { STATUS_CODE, ERROR_MESSAGE } = require('../../lib/constants')

// [ 1. POST Methods ]
exports.registerStyleScrap = async (req, res, next) => {
  try {
    const body = req.body
    const styleScrap = await styleScrapServices.createStyleScrap(body)
    if (styleScrap) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '스타일 스크랩 생성 성공',
        data: styleScrap,
      })
    } else {
      res.status(STATUS_CODE.BAD_REQUEST).json({
        message: '스타일 스크랩 생성 실패',
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

// [ 2. GET Methods ]
exports.getStyleScrapList = async (req, res, next) => {
  try {
    const { id } = req.params
    const styleScrap = await styleScrapServices.findAllStyleScrap(id)
    if (styleScrap) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '유저의 스타일 스크랩 목록 조회 성공',
        data: styleScrap,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        message: '유저의 스타일 스크랩 목록 조회 실패',
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
    const body = req.body
    const deletedStyleScrapCount = await styleScrapServices.destroyStyleScrap(
      body
    )
    if (deletedStyleScrapCount) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '스타일 스크랩 삭제 성공',
        data: deletedStyleScrapCount,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        // 에러는 없으나, 수정된 정보가 없습니다!
        message: '스타일 스크랩 삭제 실패(No resources)',
        data: deletedStyleScrapCount,
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
