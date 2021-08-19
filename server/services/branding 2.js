const db = require('./db/branding')

const editMainBranding = async (id, user_id) => {
  await db.updateAllBrandingMainStatus(user_id)
  const branding = db.updateBrandingMainStatus(id, user_id)
  return branding
}

const editBranding = async (params) => {
  const branding = await db.updateBranding({ ...params })
  return branding
}

const deleteBranding = async (id) => {
  const branding = await db.destroyBranding(id)
  return branding
}

const getBrandingList = async () => {
  let results = []
  const brandingList = await db.selectAllBranding()
  for await (const item of brandingList) {
    results.push(await getBrandingInfo(item.userId))
  }

  return results
}

const getBrandingListByUserId = async (userId) => {
  const results = []
  const brandingList = await db.selectBrandingWithStyle(userId)
  for await (const branding of brandingList) {
    const {
      id,
      user_id,
      title,
      address,
      authentication,
      description,
      shop_name,
      position,
      keywords,
      main,
      created_at,
    } = branding
    const result = {
      id,
      user_id,
      description,
      shop_name,
      position,
      title,
      address,
      authentication,
      keywords: keywords == '' ? [] : keywords.replace(' ', '').split(','),
      main,
      created_at,
      styles: branding.styleMenus.map((style) => style.dataValues),
      user: branding.user.dataValues,
    }
    results.push(result)
  }
  return results
}

const registerBranding = async (params) => {
  const branding = await db.insertBranding({ ...params })
  return branding
}

const registerBrandingStyle = async ({ brandingId, styles }) => {
  const results = await Promise.all(
    styles.map((style) => {
      return db.insertBrandingStyle(brandingId, style)
    })
  )
  return results
}

const getBrandingInfo = async (userId) => {
  let result = {}
  let styles = []

  const brandingInfo = await db.selectBrandingInfo(userId)
  const brandingStyles = await db.selectBrandingWithStyle(userId)

  for (const brandingStyle of brandingStyles) {
    styles = makeStyleData(brandingStyle.dataValues.styleMenus)
  }

  result.id = brandingInfo.id
  result.userId = brandingInfo.user_id
  result.name = brandingInfo['user.name']
  result.img_src = brandingInfo['user.img_src']
  result.distance = 1
  result.description = brandingInfo.description
  result.shopName = brandingInfo.shop_name
  result.keywords =
    brandingInfo.keywords == '' ? [] : brandingInfo.keywords.split(',')
  result.styles = styles

  return result
}

const makeStyleData = (styles) => {
  let results = []
  for (const item of styles) {
    const {
      id,
      title,
      subtitle,
      price,
      gender,
      img_src,
      created_at,
      updated_at,
    } = item.dataValues
    results.push({
      id,
      title,
      subtitle,
      price,
      gender,
      img_src,
      created_at,
      updated_at,
    })
  }
  return results
}

module.exports = {
  getBrandingListByUserId,
  getBrandingInfo,
  getBrandingList,
  registerBranding,
  registerBrandingStyle,
  editBranding,
  editMainBranding,
  deleteBranding,
}
