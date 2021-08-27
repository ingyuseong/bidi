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
exports.getBrandingListByDesignerId = async (req, res, next) => {
  try {
    const { id } = req.params
    console.log(id)
    let brandingList = await brandingServices.findAllBrandingByDesignerId(id)
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
    let branding = await brandingServices.findOneBrandingByDesignerId(id)
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
exports.getBranding = async (req, res, next) => {
  try {
    const { brandingId } = req.params
    let branding = await brandingServices.findOneBranding(brandingId)
    if (branding) {
      let keyword_array = []
      if (branding.keyword_array) {
        keyword_array = branding.keyword_array.split(',')
      }
      branding = {
        ...branding.dataValues,
        keyword_array,
        brandingStyles: branding.brandingStyles.map((style) => {
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
        message: 'Brainding 정보 조회 성공',
        data: branding,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        message: '포트폴리오 정보 조회 실패',
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
exports.patchBranding = async (req, res, next) => {
  try {
    const { brandingId } = req.params
    const params = req.body
    const branding = await brandingServices.updateBranding({
      id: brandingId,
      ...params,
    })
    res.status(STATUS_CODE.SUCCESS).json({
      message: '포트폴리오 정보 수정 성공',
      data: { branding },
    })
  } catch (error) {
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
exports.patchMainBranding = async (req, res, next) => {
  try {
    const { id, user_id } = req.body
    const branding = await brandingServices.updateMainBranding({
      brandingId: id,
      userId: user_id,
    })
    res.status(STATUS_CODE.SUCCESS).json({
      message: 'main 포트폴리오 정보 수정 성공',
      data: { branding },
    })
  } catch (error) {
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}

// [ 4. DELETE Methods]
exports.deleteBranding = async (req, res, next) => {
  try {
    const { brandingId } = req.params
    const branding = await brandingServices.destroyBranding(brandingId)

    res.status(STATUS_CODE.SUCCESS).json({
      message: 'branding 삭제 성공',
      data: { branding },
    })
  } catch (error) {
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
