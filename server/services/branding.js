const db = require('./db/branding')

// Create Branding Resource [create]
exports.createBranding = async (body) => {
  try {
    const attr = {
      userId: body.user_id,
      title: body.title,
      shop_name: body.shop_name,
      address: body.address,
      position: body.position,
      description: body.description,
      keyword_array: body.keyword_array,
    }
    const branding = await db.createBranding(attr)
    if (branding) {
      return branding.dataValues
    } else {
      return null
    }
  } catch (err) {
    console.error(ERROR_MESSAGE.SERVICES_ERROR)
    console.error(err)
    return null
  }
}
exports.createBrandingStyle = async ({ brandingId, styleIdList }) => {
  try {
    if (styleIdList) {
      const brandingStyleList = await Promise.all(
        styleIdList.split(',').map((styleId) => {
          const attr = {
            brandingId,
            styleId,
          }
          return db.createBrandingStyle(attr)
        })
      )
      if (brandingStyleList) {
        return brandingStyleList
      } else {
        return null
      }
    } else {
      return null
    }
  } catch (err) {
    console.error(ERROR_MESSAGE.SERVICES_ERROR)
    console.error(err)
    return null
  }
}

// Read Branding Resource [findOne, findAll]
exports.findAllBranding = async () => {
  const brandingList = await db.findAllBranding()
  return brandingList
}
exports.findAllBrandingByUserId = async (userId) => {
  const brandingList = await db.findAllBrandingByUserId(userId)
  return brandingList
}
exports.findOneBranding = async (brandingId) => {
  const branding = await db.findOneBranding(brandingId)
  return branding
}
exports.findOneBrandingByUserId = async (userId) => {
  const branding = await db.findOneBrandingByUserId(userId)
  return branding
}

// Update Branding Resource [update]
exports.updateBranding = async (params) => {
  const branding = await db.updateBranding({ ...params })
  return branding
}
exports.updateMainBranding = async ({ userId, brandingId }) => {
  await db.updateAllBrandingMainStatus(userId)
  const branding = db.updateBrandingMainStatus(brandingId)
  return branding
}

// Delete Branding Resoure [destroy]
exports.destroyBranding = async (brandingId) => {
  const branding = await db.destroyBranding(brandingId)
  return branding
}
