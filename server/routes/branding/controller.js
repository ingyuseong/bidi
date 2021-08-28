const brandingServices = require('../../services/branding')
const { STATUS_CODE, ERROR_MESSAGE } = require('../../lib/constants')

// [ 1. POST Methods ]
exports.registerBranding = async (req, res, next) => {
  try {
    const body = req.body
    const branding = await brandingServices.createBranding(body)
    const brandingStyle = await brandingServices.createBrandingStyle({
      brandingId: branding.id,
      styleIdList: body.styleIdList,
    })
    if (branding) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '포트폴리오 등록 성공',
        data: { branding, brandingStyle },
      })
    } else {
      res.status(STATUS_CODE.BAD_REQUEST).json({
        message: '포트폴리오 등록 실패',
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
exports.getBrandingList = async (req, res, next) => {
  try {
    const brandingList = await brandingServices.findAllBranding()
    if (brandingList && brandingList.length > 0) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '전체 포트폴리오 목록 조회 성공',
        data: brandingList,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        message: '전체 포트폴리오 목록 조회 실패(No resource)',
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
exports.getBranding = async (req, res, next) => {
  try {
    const { id } = req.params
    const branding = await brandingServices.findOneBranding(id)
    if (branding) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '포트폴리오 정보 조회 성공',
        data: branding,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        message: '포트폴리오 정보 조회 실패',
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
exports.getBrandingListByDesignerId = async (req, res, next) => {
  try {
    const { id } = req.params
    const brandingList = await brandingServices.findAllBrandingByDesignerId(id)
    if (brandingList && brandingList.length > 0) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '디자이너의 포트폴리오 목록 조회 성공',
        data: brandingList,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        message: '디자이너의 포트폴리오 목록 조회 실패(No resource)',
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
exports.getMainBrandingByDesignerId = async (req, res, next) => {
  try {
    const { id } = req.params
    const branding = await brandingServices.findOneBrandingByDesignerId(id)
    if (branding) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '디자이너의 Main 포트폴리오 정보 조회 성공',
        data: branding,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        message: '디자이너의 Main 포트폴리오 정보 조회 실패(No resource)',
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
exports.patchBranding = async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body
    const patchedBrandingCount = await brandingServices.updateBranding(id, body)
    if (patchedBrandingCount) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '포트폴리오 정보 수정 성공',
        data: patchedBrandingCount,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        // 에러는 없으나, 수정된 정보가 없습니다!
        message: '포트폴리오 정보 수정 실패(No resources or No change)',
        data: patchedBrandingCount,
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
exports.patchMainBranding = async (req, res, next) => {
  try {
    const body = req.body
    const patchedBrandingCount = await brandingServices.updateMainBranding(body)
    if (patchedBrandingCount) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: 'main 포트폴리오 정보 수정 성공',
        data: patchedBrandingCount,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        // 에러는 없으나, 수정된 정보가 없습니다!
        message: 'main 포트폴리오 정보 수정 실패(No resources or No change)',
        data: patchedBrandingCount,
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
exports.deleteBranding = async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedBrandingCount = await brandingServices.destroyBranding(id)
    if (deletedBrandingCount) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '포트폴리오 삭제 성공',
        data: deletedBrandingCount,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        // 에러는 없으나, 수정된 정보가 없습니다!
        message: '포트폴리오 정보 삭제 실패(No resources)',
        data: deletedBrandingCount,
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
