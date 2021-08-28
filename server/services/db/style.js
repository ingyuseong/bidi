const { Style, User } = require('../../models')
const { ERROR_MESSAGE } = require('../../lib/constants')

// Create Style Resource [create]
exports.createStyle = async (attr) => {
  try {
    const style = await Style.create({
      raw: true,
      ...attr,
      ai_enable: false,
    })
    return style
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_CREATE_ERROR)
    console.error(err)
    return null
  }
}

// Read Style Resource [findOne, findAll]
exports.findAllStyle = async () => {
  try {
    const StyleList = await Style.findAll({
      include: [
        {
          model: User,
          attributes: ['name', 'nick_name', 'gender_type', 'img_src'],
          required: true,
        },
      ],
    })
    return StyleList
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_READ_ERROR)
    console.error(err)
    return null
  }
}
exports.findAllStyleByUserId = async (id) => {
  try {
    const styleList = await Style.findAll({
      where: {
        user_id: id,
      },
      include: [
        {
          model: User,
          attributes: ['name', 'nick_name', 'gender_type', 'img_src'],
          required: true,
        },
      ],
    })
    return styleList
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_READ_ERROR)
    console.error(err)
    return null
  }
}
exports.findOneStyle = async (id) => {
  try {
    const style = await Style.findOne({
      where: {
        id,
      },
      include: [
        {
          model: User,
          attributes: ['name', 'nick_name', 'gender_type', 'img_src'],
          required: true,
        },
      ],
    })
    return style
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_READ_ERROR)
    console.error(err)
    return null
  }
}

// Update Style Resource [update]
exports.updateStyle = async (id, body) => {
  try {
    const style = await Style.update(
      {
        raw: true,
        ...body,
      },
      {
        where: {
          id,
        },
      }
    )
    return style[0]
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_UPDATE_ERROR)
    console.error(err)
    return null
  }
}
exports.updateAiEnable = async (id, enable) => {
  try {
    const style = await Style.update(
      {
        enable,
      },
      {
        where: {
          id,
        },
      }
    )
    return style[0]
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_UPDATE_ERROR)
    console.error(err)
    return null
  }
}

// Delete Style Resource [destroy]
exports.destroyStyle = async (id) => {
  try {
    const style = await Style.destroy({
      where: {
        id,
      },
    })
    return style
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_DELETE_ERROR)
    console.error(err)
    return null
  }
}
