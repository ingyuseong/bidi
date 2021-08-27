const { Style, StyleScrap, User } = require('../../models')
const { ERROR_MESSAGE } = require('../../lib/constants')
const style = require('../../models/style')

// Create StyleScrap Resource [create]
exports.createStyleScrap = async (attr) => {
  try {
    const styleScrap = await StyleScrap.create({
      raw: true,
      ...attr,
    })
    return styleScrap
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_CREATE_ERROR)
    console.error(err)
    return null
  }
}

// Read StyleScrap Resource [findOne, findAll]
exports.findAllStyleScrapByUser = async (id) => {
  try {
    const styleScrapList = await User.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Style,
          as: 'styleScraps',
          through: {
            model: StyleScrap,
          },
        },
      ],
    })
    return styleScrapList
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_READ_ERROR)
    console.error(err)
    return null
  }
}

// Delete StyleScrap Resource [destroy]
exports.destroyStyleScrap = async (attr) => {
  try {
    const styleScrap = await StyleScrap.destroy({
      where: {
        ...attr,
      },
    })
    return styleScrap
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_DELETE_ERROR)
    console.error(err)
    return null
  }
}
