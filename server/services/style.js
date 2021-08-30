const db = require('./db/style')

// Create Style Resource [create]
exports.createStyle = async (body) => {
  const attr = {
    userId: body.user_id,
    title: body.title,
    description: body.description,
    price: Number(body.price),
    gender_type: body.gender_type,
    style_type: body.style_type,
    length_type: body.length_type,
    keyword_array: body.keyword_array,
    img_src_array: body.img_src_array,
  }
  const style = await db.createStyle(attr)
  if (style) {
    return style.dataValues
  } else {
    return null
  }
}

// Read Style Resource [findOne, findAll]
exports.findAllStyle = async () => {
  let styleList = await db.findAllStyle()
  if (styleList && styleList.length > 0) {
    styleList = styleList.map((style) => {
      let keyword_array = []
      if (style.dataValues.keyword_array) {
        keyword_array = style.dataValues.keyword_array.split(',')
      }
      return {
        ...style.dataValues,
        keyword_array,
        img_src_array: style.img_src_array.split(','),
      }
    })
    return styleList
  } else {
    return null
  }
}
exports.findAllStyleByUserId = async (id) => {
  let styleList = await db.findAllStyleByUserId(id)
  if (styleList && styleList.length > 0) {
    styleList = styleList.map((style) => {
      let keyword_array = []
      if (style.dataValues.keyword_array) {
        keyword_array = style.dataValues.keyword_array.split(',')
      }
      return {
        ...style.dataValues,
        keyword_array,
        img_src_array: style.img_src_array.split(','),
      }
    })
    return styleList
  } else {
    return null
  }
}
exports.findOneStyle = async (id) => {
  let style = await db.findOneStyle(id)
  if (style) {
    let keyword_array = []
    if (keyword_array) {
      keyword_array = style.keyword_array.split(',')
    }
    style = {
      ...style.dataValues,
      keyword_array,
      img_src_array: style.img_src_array.split(','),
    }
    return style
  } else {
    return null
  }
}

// Update Style Resource [update]
exports.updateStyle = async (id, body) => {
  const style = await db.updateStyle(id, body)
  if (style) {
    return style
  } else {
    return null
  }
}
exports.updateAiEnable = async (id, body) => {
  const { enable } = body
  const style = await db.updateAiEnable(id, enable)
  if (style) {
    return style
  } else {
    return null
  }
}

// Delete Style Resoure [destroy]
exports.destroyStyle = async (id) => {
  const style = await db.destroyStyle(id)
  if (style) {
    return style
  } else {
    return null
  }
}
