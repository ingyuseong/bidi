const brandingServices = require('../../services/branding')
const { STATUS_CODE, ERROR_MESSAGE } = require('../../lib/constants')

/*
    PATCH /api/branding/:id
    * Branding 정보 수정 API
*/
exports.editBranding = async (req, res, next) => {
  try {
    const { id } = req.params
    const params = req.body
    const branding = await brandingServices.editBranding({ ...params, id })
    res.status(STATUS_CODE.SUCCESS).json({
      message: '브랜딩 정보 수정 성공',
      data: { branding },
    })
  } catch (error) {
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}

/*
    DELETE /api/branding/:id
    * Branding 정보 삭제 API
*/
exports.deleteBranding = async (req, res, next) => {
  try {
    const { id } = req.params
    const branding = await brandingServices.deleteBranding(id)

    res.status(STATUS_CODE.SUCCESS).json({
      message: '브랜딩 정보 삭제 성공',
      data: { branding },
    })
  } catch (error) {
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}

/*
    GET /api/branding/list
    * 전체 브랜딩 리스트 정보 조회 API
*/
exports.getBrandingList = async (req, res, next) => {
  try {
    const brandingList = await brandingServices.getBrandingList()

    res.status(STATUS_CODE.SUCCESS).json({
      message: '전체 브랜딩 리스트 정보 조회 성공',
      data: brandingList,
    })
  } catch (error) {
    console.log(error)
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}

/*
    GET /api/branding/:userId
    * 브랜딩 페이지 상세 정보 조회 API
*/
exports.getBrandings = async (req, res, next) => {
  try {
    const { userId } = req.params
    const brandingInfo = await brandingServices.getBrandingListByUserId(userId)

    res.status(STATUS_CODE.SUCCESS).json({
      message: '브랜딩 페이지 정보 조회 성공',
      data: brandingInfo,
    })
  } catch (error) {
    console.log(error)
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}

/*
    POST /api/branding/register
    * 브랜딩 페이지 등록 API
*/
exports.registerBranding = async (req, res, next) => {
  try {
    const params = req.body
    const brandingInfo = await brandingServices.registerBranding(params)
    const brandingStyle = await brandingServices.registerBrandingStyle({
      brandingId: brandingInfo.id,
      styles: params.styles,
    })

    res.status(STATUS_CODE.SUCCESS).json({
      message: '브랜딩 페이지 작성 성공',
      data: { brandingInfo, brandingStyle },
    })
  } catch (error) {
    console.log(error)
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
