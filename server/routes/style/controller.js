const styleServices = require('../../services/style')
const { STATUS_CODE, ERROR_MESSAGE } = require('../../lib/constants')

// [ 1. POST Methods ]
exports.registerStyle = async (req, res, next) => {
  try {
    const body = req.body
    const style = await styleServices.createStyle(body)
    if (style) {
      res.status(STATUS_CODE.CREATED).json({
        message: '스타일 등록 성공',
        data: style,
      })
    } else {
      res.status(STATUS_CODE.BAD_REQUEST).json({
        message: '스타일 등록 실패 (parameter가 잘못되었습니다.)',
        data: style,
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
exports.getStyleList = async (req, res, next) => {
  try {
    const styleList = await styleServices.findAllStyle()
    if (styleList) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '유저의 전체 스타일 정보 조회 성공',
        data: styleList,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        message: '유저의 전체 스타일 정보 조회 실패',
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
exports.getStyleListByUserId = async (req, res, next) => {
  try {
    const { id } = req.params
    const styleList = await styleServices.findAllStyleByUserId(id)
    if (styleList) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '유저의 전체 스타일 정보 조회 성공',
        data: styleList,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        message: '유저의 전체 스타일 정보 조회 실패',
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
exports.getStyle = async (req, res, next) => {
  try {
    const { id } = req.params
    const style = await styleServices.findOneStyle(id)
    if (style) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '스타일 정보 조회 성공',
        data: style,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        message: '스타일 정보 조회 실패',
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
exports.patchStyle = async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body
    const patchedStyleCount = await styleServices.updateStyle(id, body)
    if (patchedStyleCount) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '스타일 정보 수정 성공',
        data: patchedStyleCount,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        // 에러는 없으나, 수정된 정보가 없습니다!
        message: '스타일 정보 수정 실패(No resources or No change)',
        data: patchedStyleCount,
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
exports.patchAiEnable = async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body
    const patchedStyleCount = await styleServices.updateAiEnable(id, body)
    if (patchedStyleCount) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '스타일 Ai 가능여부 수정 성공',
        data: patchedStyleCount,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        // 에러는 없으나, 수정된 정보가 없습니다!
        message: '스타일 Ai 가능여부 수정 실패(No resources or No change)',
        data: patchedStyleCount,
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

// [ 4. DELETE Methods]
exports.deleteStyle = async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedStyleCount = await styleServices.destroyStyle(id)
    if (deletedStyleCount) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '스타일 정보 삭제 성공',
        data: deletedStyleCount,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        // 에러는 없으나, 수정된 정보가 없습니다!
        message: '스타일 정보 삭제 실패(No resources)',
        data: deletedStyleCount,
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
