const db = require('./db/style')
const { ERROR_MESSAGE } = require('../lib/constants')

// Create Style Resource [create]
exports.createStyle = async (body) => {
  try {
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
  } catch (err) {
    console.error(ERROR_MESSAGE.SERVICES_ERROR)
    console.error(err)
    return null
  }
}

// Read Style Resource [findOne, findAll]
exports.findAllStyle = async () => {
  try {
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
  } catch (err) {
    console.error(ERROR_MESSAGE.SERVICES_ERROR)
    console.error(err)
    return null
  }
}
exports.findAllStyleByUserId = async (id) => {
  try {
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
  } catch (err) {
    console.error(ERROR_MESSAGE.SERVICES_ERROR)
    console.error(err)
    return null
  }
}
exports.findOneStyle = async (id) => {
  try {
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
  } catch (err) {
    console.error(ERROR_MESSAGE.SERVICES_ERROR)
    console.error(err)
    return null
  }
}

// Update Style Resource [update]
exports.updateStyle = async (id, body) => {
  try {
    const style = await db.updateStyle(id, body)
    return style
  } catch (err) {
    console.error(ERROR_MESSAGE.SERVICES_ERROR)
    console.error(err)
    return null
  }
}
exports.updateAiEnable = async (id, body) => {
  try {
    const { enable } = body
    const style = await db.updateAiEnable(id, enable)
    return style
  } catch (err) {
    console.error(ERROR_MESSAGE.SERVICES_ERROR)
    console.error(err)
    return null
  }
}

// Delete Style Resoure [destroy]
exports.destroyStyle = async (id) => {
  try {
    const style = await db.destroyStyle(id)
    return style
  } catch (err) {
    console.error(ERROR_MESSAGE.SERVICES_ERROR)
    console.error(err)
    return null
  }
}
