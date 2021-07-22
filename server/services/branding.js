const db = require('./db/branding')

const getBrandingList = async () => {
  let results = []
  const brandingLists = await db.selectAllBranding()
  for await (const item of brandingLists) {
    results.push(await getBrandingInfo(item.userId))
  }
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
    const { id, title, subtitle, price, gender, img_src } = item.dataValues
    results.push({ id, title, subtitle, price, gender, img_src })
  }
  return results
}

module.exports = { getBrandingInfo, getBrandingList }
