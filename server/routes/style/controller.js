const styleServices = require('../../services/style')
const { STATUS_CODE } = require('../../lib/constants')

// [ 1. POST Methods ]
exports.registerStyle = async (req, res) => {
  const body = req.body
  const style = await styleServices.createStyle(body)
  if (style) {
    res.status(STATUS_CODE.CREATED).json({
      status: 'success',
      message: '스타일 등록 성공',
      data: [style],
    })
  } else {
    res.status(STATUS_CODE.BAD_REQUEST).json({
      status: 'failed',
      message: '스타일 등록에 실패했습니다',
      data: [],
    })
  }
}

// [ 2. GET Methods ]
exports.getStyleList = async (req, res) => {
  const styleList = await styleServices.findAllStyle()
  if (styleList) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '전체 스타일 목록 조회 성공',
      data: styleList,
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '조회할 전체 스타일 목록이 없습니다',
      data: [],
    })
  }
}
exports.getStyleListByUserId = async (req, res) => {
  const { id } = req.params
  const styleList = await styleServices.findAllStyleByUserId(id)
  if (styleList) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '유저의 전체 스타일 정보 조회 성공',
      data: styleList,
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '조회할 유저의 전체 스타일 목록이 없습니다',
      data: [],
    })
  }
}
exports.getStyle = async (req, res) => {
  const { id } = req.params
  const style = await styleServices.findOneStyle(id)
  if (style) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '스타일 정보 조회 성공',
      data: [style],
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '조회할 스타일 정보가 없습니다',
      data: [],
    })
  }
}

// [ 3. PATCH Methods ]
exports.patchStyle = async (req, res) => {
  const { id } = req.params
  const body = req.body
  const patchedStyleCount = await styleServices.updateStyle(id, body)
  if (patchedStyleCount) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '스타일 정보 수정 성공',
      data: patchedStyleCount,
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '수정된 스타일 정보가 없습니다',
      data: patchedStyleCount,
    })
  }
}
exports.patchAiEnable = async (req, res) => {
  const { id } = req.params
  const body = req.body
  const patchedStyleCount = await styleServices.updateAiEnable(id, body)
  if (patchedStyleCount) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '스타일 Ai 가능여부 수정 성공',
      data: patchedStyleCount,
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '수정된 스타일 Ai 가능여부 가 없습니다',
      data: patchedStyleCount,
    })
  }
}

// [ 4. DELETE Methods]
exports.deleteStyle = async (req, res) => {
  const { id } = req.params
  const deletedStyleCount = await styleServices.destroyStyle(id)
  if (deletedStyleCount) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '스타일 정보 삭제 성공',
      data: deletedStyleCount,
    })
  } else {
    res.status(STATUS_CODE.NOT_FOUND).json({
      status: 'failed',
      message: '삭제할 스타일 정보가 없습니다',
      data: deletedStyleCount,
    })
  }
}
