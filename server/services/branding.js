const db = require('./db/branding')

exports.getBrandingInfo = async (userId) => {
  const brandingInfo = await db.selectBrandingInfo(userId)
  return brandingInfo
}
