const db = require('./db/branding')

// Create Branding Resource [create]
exports.createBranding = async (params) => {
  const branding = await db.createBranding({ ...params })
  return branding
}
exports.createBrandingStyle = async ({ brandingId, stylesIdString }) => {
  if (stylesIdString) {
    const results = await Promise.all(
      stylesIdString.split(',').map((styleId) => {
        return db.createBrandingStyle(brandingId, styleId)
      })
    )
    return results
  } else return null
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
