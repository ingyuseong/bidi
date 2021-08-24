const brandingServices = require('../../services/branding')
const { STATUS_CODE, ERROR_MESSAGE } = require('../../lib/constants')

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
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
// [ 2. GET Methods ]
exports.getBrandingList = async (req, res, next) => {
  try {
    const brandingList = await brandingServices.findAllBranding()
    res.status(STATUS_CODE.SUCCESS).json({
      message: '전체 Brainding 리스트 정보 조회 성공',
      data: brandingList,
    })
  } catch (error) {
    console.log(error)
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
exports.getBrandingListByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params
    const brandingList = await brandingServices.findAllBrandingByUserId(userId)
    res.status(STATUS_CODE.SUCCESS).json({
      message: '유저의 전체 브랜딩 페이지 정보 조회 성공',
      data: brandingList,
    })
  } catch (error) {
    console.log(error)
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
exports.getBranding = async (req, res, next) => {
  try {
    const { brandingId } = req.params
    const branding = await brandingServices.findOneBranding(brandingId)
    res.status(STATUS_CODE.SUCCESS).json({
      message: 'Brainding 정보 조회 성공',
      data: branding,
    })
  } catch (error) {
    console.log(error)
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
exports.getBrandingByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params
    const branding = await brandingServices.findOneBrandingByUserId(userId)
    res.status(STATUS_CODE.SUCCESS).json({
      message: '유저의 main Brainding 조회 성공',
      data: branding,
    })
  } catch (error) {
    console.log(error)
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}

// [ 3. PATCH Methods ]
exports.patchBranding = async (req, res, next) => {
  try {
    const { id } = req.params
    const params = req.body
    const branding = await brandingServices.updateBranding({ ...params, id })
    res.status(STATUS_CODE.SUCCESS).json({
      message: 'Branding 정보 수정 성공',
      data: { branding },
    })
  } catch (error) {
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
exports.patchMainBranding = async (req, res, next) => {
  try {
    const { branding_id, user_id } = req.body
    const branding = await brandingServices.updateMainBranding({
      brandingId: branding_id,
      userId: user_id,
    })
    res.status(STATUS_CODE.SUCCESS).json({
      message: 'main Branding 정보 수정 성공',
      data: { branding },
    })
  } catch (error) {
    res
      .status(STATUS_CODE.SERVER_ERROR)
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
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
