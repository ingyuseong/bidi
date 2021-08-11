const db = require('./db/branding')
const userDb = require('./db/user')

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
  const brandingList = await db.selectAllBrandingByUserId(userId)
  for await (const branding of brandingList) {
    let result = JSON.stringify(branding)
    const { name, img_src, address } = await userDb.selectUser(branding.user_id)
    result = { ...JSON.parse(result), user: { name, img_src, address } }
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
  result.distance = '1km'
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
    const { id, title, subtitle, price, gender, img_src_one } = item.dataValues
    results.push({ id, title, subtitle, price, gender, img_src_one })
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
  deleteBranding,
}
