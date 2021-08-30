const styleScrapServices = require('../../services/styleScrap')
const { STATUS_CODE } = require('../../lib/constants')

// [ 1. POST Methods ]
exports.registerStyleScrap = async (req, res) => {
  const body = req.body
  const styleScrap = await styleScrapServices.createStyleScrap(body)
  if (styleScrap) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '스타일 스크랩 생성 성공',
      data: styleScrap,
    })
  } else {
    res.status(STATUS_CODE.BAD_REQUEST).json({
      status: 'failed',
      message: '스타일 스크랩 생성에 실패했습니다',
      data: {},
    })
  }
}

// [ 2. GET Methods ]
exports.getStyleScrapList = async (req, res) => {
  const { id } = req.params
  const styleScrap = await styleScrapServices.findAllStyleScrap(id)
  if (styleScrap) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '유저의 스타일 스크랩 목록 조회 성공',
      data: styleScrap,
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '조회할 유저의 스타일 스크랩 목록이 없습니다',
      data: [],
    })
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
exports.deleteStyleScrap = async (req, res) => {
  const body = req.body
  const deletedStyleScrapCount = await styleScrapServices.destroyStyleScrap(
    body
  )
  if (deletedStyleScrapCount) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '스타일 스크랩 삭제 성공',
      data: deletedStyleScrapCount,
    })
  } else {
    res.status(STATUS_CODE.NOT_FOUND).json({
      status: 'failed',
      message: '삭제할 스타일 스크랩이 없습니다',
      data: deletedStyleScrapCount,
    })
  }
}
