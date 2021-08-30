const db = require('./db/styleScrap')

// Create StyleScrap Resource [create]
exports.createStyleScrap = async (body) => {
  const attr = {
    userId: body.user_id,
    styleId: body.style_id,
  }
  const styleScrap = await db.createStyleScrap(attr)
  if (styleScrap) {
    return styleScrap
  } else {
    return null
  }
}

// Read StyleScrap Resource [findOne, findAll]
exports.findAllStyleScrap = async (id) => {
  const userStyleScrap = await db.findAllStyleScrapByUser(id)
  if (
    userStyleScrap &&
    userStyleScrap.styleScraps &&
    userStyleScrap.styleScraps.length > 0
  ) {
    const styleScrapList = userStyleScrap.styleScraps.map((style) => {
      let style_keyword_array = []
      if (style.keyword_array) {
        style_keyword_array = style.keyword_array.split(',')
      }
      return {
        ...style.dataValues,
        keyword_array: style_keyword_array,
        img_src_array: style.img_src_array.split(','),
      }
    })
    return styleScrapList
  } else {
    return null
  }
}

// Delete StyleScrap Resoure [destroy]
exports.destroyStyleScrap = async (body) => {
  const attr = {
    userId: body.user_id,
    styleId: body.style_id,
  }
  const styleScrap = await db.destroyStyleScrap(attr)
  if (styleScrap) {
    return styleScrap
  } else {
    return null
  }
}
