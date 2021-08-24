const db = require('./db/styleScrap')

// Create StyleScrap Resource [create]
exports.createStyleScrap = async (params) => {
  const styleScrap = await db.createStyleScrap({ ...params })
  return styleScrap
}

// Read StyleScrap Resource [findOne, findAll]
exports.findAllStyleScrap = async (userId) => {
  const userStyleScrapList = await db.findAllStyleScrapByUser(userId)
  const styleScrapList = userStyleScrapList.styleScraps.map(
    (styleScrap) => styleScrap.dataValues
  )
  return styleScrapList
}

// Delete StyleScrap Resoure [destroy]
exports.destroyStyleScrap = async (params) => {
  const styleScrap = await db.destroyStyleScrap({ ...params })
  return styleScrap
}
