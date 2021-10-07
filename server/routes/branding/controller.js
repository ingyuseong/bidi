const brandingServices = require('../../services/branding')
const { STATUS_CODE } = require('../../lib/constants')

// [ 1. POST Methods ]
exports.registerBranding = async (req, res) => {
  const body = req.body
  const branding = await brandingServices.createBranding(body)
  const brandingStyle = await brandingServices.createBrandingStyle({
    brandingId: branding.id,
    styleIdList: body.styleIdList,
  })
  if (branding) {
    res.status(STATUS_CODE.CREATED).json({
      status: 'success',
      message: '포트폴리오 등록 성공',
      data: [{ branding, brandingStyle }],
    })
  } else {
    res.status(STATUS_CODE.BAD_REQUEST).json({
      status: 'failed',
      message: '포트폴리오 등록에 실패했습니다',
      data: [],
    })
  }
}

// [ 2. GET Methods ]
exports.getBrandingList = async (req, res) => {
  const brandingList = await brandingServices.findAllBranding()
  if (brandingList && brandingList.length > 0) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '전체 포트폴리오 목록 조회 성공',
      data: brandingList,
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '조회할 전체 포트폴리오 목록이 없습니다',
      data: [],
    })
  }
}
exports.getBranding = async (req, res) => {
  const { id } = req.params
  const branding = await brandingServices.findOneBranding(id)
  if (branding) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '포트폴리오 정보 조회 성공',
      data: [branding],
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '조회할 포트폴리오 정보가 없습니다',
      data: [],
    })
  }
}
exports.getBrandingListByDesignerId = async (req, res) => {
  const { id } = req.params
  const brandingList = await brandingServices.findAllBrandingByDesignerId(id)
  if (brandingList && brandingList.length > 0) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '디자이너의 포트폴리오 목록 조회 성공',
      data: brandingList,
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '조회할 디자이너의 포트폴리오 목록이 없습니다',
      data: [],
    })
  }
}
exports.getMainBrandingByDesignerId = async (req, res) => {
  const { id } = req.params
  const branding = await brandingServices.findOneBrandingByDesignerId(id)
  if (branding) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '디자이너의 Main 포트폴리오 정보 조회 성공',
      data: [branding],
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '조회할 디자이너의 Main 포트폴리오 정보가 없습니다',
      data: [],
    })
  }
}

// [ 3. PATCH Methods ]
exports.patchBranding = async (req, res) => {
  const { id } = req.params
  const body = req.body
  const patchedBrandingCount = await brandingServices.updateBranding(id, body)
  const patchBrandingStyleCount = await brandingServices.updateBrandingStyle({
    brandingId: id,
    styleIdList: body.styleIdList,
  })
  if (patchedBrandingCount || patchBrandingStyleCount) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '포트폴리오 정보 수정 성공',
      data: patchedBrandingCount,
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '수정된 포트폴리오 정보가 없습니다',
      data: patchedBrandingCount,
    })
  }
}
exports.patchMainBranding = async (req, res) => {
  const body = req.body
  const patchedBrandingCount = await brandingServices.updateMainBranding(body)
  if (patchedBrandingCount) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: 'main 포트폴리오 정보 수정 성공',
      data: patchedBrandingCount,
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '수정된 Main 포트폴리오 정보가 없습니다',
      data: patchedBrandingCount,
    })
  }
}

// [ 4. DELETE Methods]
exports.deleteBranding = async (req, res) => {
  const { id } = req.params
  const deletedBrandingCount = await brandingServices.destroyBranding(id)
  if (deletedBrandingCount) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '포트폴리오 삭제 성공',
      data: deletedBrandingCount,
    })
  } else {
    res.status(STATUS_CODE.NOT_FOUND).json({
      status: 'failed',
      message: '삭제할 포트폴리오 정보가 없습니다',
      data: deletedBrandingCount,
    })
  }
}
