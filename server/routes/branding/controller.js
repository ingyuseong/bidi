const brandingServices = require('../../services/branding')
const { STATUS_CODE, ERROR_MESSAGE } = require('../../lib/constants')
const style = require('../../models/style')

// [ 1. POST Methods ]
exports.registerBranding = async (req, res, next) => {
  try {
    const params = req.body
    const branding = await brandingServices.createBranding(params)
    await brandingServices.createBrandingStyle({
      brandingId: branding.id,
      stylesIdString: params.stylesIdString,
    })

    res.status(STATUS_CODE.SUCCESS).json({
      message: 'Branding 등록 성공',
      data: { branding },
    })
  } catch (error) {
    console.log(error)
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
// [ 2. GET Methods ]
exports.getBrandingList = async (req, res, next) => {
  try {
    let brandingList = await brandingServices.findAllBranding()
    if (brandingList && brandingList.length > 0) {
      brandingList = brandingList.map((branding) => {
        let keyword_array = []
        if (branding.keyword_array) {
          keyword_array = branding.keyword_array.split(',')
        }
        return {
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
      })
      res.status(STATUS_CODE.SUCCESS).json({
        message: '전체 Brainding List 정보 조회 성공',
        data: brandingList,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        message: '전체 Brainding List 정보 조회 실패',
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
exports.getBrandingListByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params
    let brandingList = await brandingServices.findAllBrandingByUserId(userId)
    if (brandingList && brandingList.length > 0) {
      brandingList = brandingList.map((branding) => {
        let keyword_array = []
        if (branding.keyword_array) {
          keyword_array = branding.keyword_array.split(',')
        }
        return {
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
      })
      res.status(STATUS_CODE.SUCCESS).json({
        message: '전체 Brainding List 정보 조회 성공',
        data: brandingList,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        message: '전체 Brainding List 정보 조회 실패',
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
        message: 'Branding 정보 조회 실패',
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
exports.getBrandingByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params
    let branding = await brandingServices.findOneBrandingByUserId(userId)
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
        message: '유저의 Brainding 정보 조회 성공',
        data: branding,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        message: '유저의 Branding 정보 조회 실패',
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
      message: 'Branding 정보 수정 성공',
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
      message: 'main Branding 정보 수정 성공',
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
