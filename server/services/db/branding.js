const { Branding, Style, User, BrandingStyle } = require('../../models')
const { ERROR_MESSAGE } = require('../../lib/constants')

// Create Branding Resource [create]
exports.createBranding = async (attr) => {
  try {
    const branding = await Branding.create({
      raw: true,
      ...attr,
      main: false,
    })
    return branding
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_CREATE_ERROR)
    console.error(err)
    return null
  }
}
exports.createBrandingStyle = async (attr) => {
  try {
    const brandingStyle = await BrandingStyle.create({
      raw: true,
      ...attr,
    })
    return brandingStyle
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_UPDATE_ERROR)
    console.error(err)
    return null
  }
}

// Read Branding Resource [findOne, findAll]
exports.findAllBranding = async () => {
  try {
    const brandingList = await Branding.findAll({
      where: {
        main: true,
      },
      include: [
        {
          model: User,
          attributes: ['name', 'nick_name', 'img_src'],
        },
        {
          model: Style,
          as: 'brandingStyles',
          through: {
            model: BrandingStyle,
          },
          required: false,
        },
      ],
      order: [['updated_at', 'DESC']],
    })
    return brandingList
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_READ_ERROR)
    console.error(err)
    return null
  }
}
exports.findAllBrandingByDesignerId = async (id) => {
  try {
    const brandingList = await Branding.findAll({
      where: {
        user_id: id,
      },
      include: [
        {
          model: Style,
          as: 'brandingStyles',
          through: {
            model: BrandingStyle,
          },
          required: false,
        },
      ],
      order: [['updated_at', 'DESC']],
    })
    return brandingList
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_READ_ERROR)
    console.error(err)
    return null
  }
}
exports.findOneBrandingByUserId = async (id) => {
  try {
    const branding = await Branding.findOne({
      where: {
        user_id: id,
        main: true,
      },
      include: [
        {
          model: Style,
          as: 'brandingStyles',
          through: {
            model: BrandingStyle,
          },
          required: false,
        },
      ],
    })
    return branding
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_READ_ERROR)
    console.error(err)
    return null
  }
}
exports.findOneBranding = async (id) => {
  try {
    const branding = await Branding.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Style,
          as: 'brandingStyles',
          through: {
            model: BrandingStyle,
          },
          required: false,
        },
      ],
    })
    return branding
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_READ_ERROR)
    console.error(err)
    return null
  }
}

// Update Branding Resource [update]
exports.updateBranding = async (id, attr) => {
  try {
    const branding = await Branding.update(
      {
        raw: true,
        ...attr,
      },
      {
        where: {
          id,
        },
      }
    )
    return branding[0]
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_UPDATE_ERROR)
    console.error(err)
    return null
  }
}
exports.updateAllOtherBranding = async (user_id) => {
  try {
    const brandingList = await Branding.update(
      {
        main: false,
      },
      {
        where: {
          user_id,
        },
      }
    )
    return brandingList[0]
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_UPDATE_ERROR)
    console.error(err)
    return null
  }
}
exports.updateMainBranding = async (branding_id) => {
  try {
    const branding = await Branding.update(
      {
        main: true,
      },
      {
        where: {
          id: branding_id,
        },
      }
    )
    return branding[0]
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_UPDATE_ERROR)
    console.error(err)
    return null
  }
}

// Delete Branding Resource [destroy]
exports.destroyBranding = async (brandingId) =>
  await Branding.destroy({
    where: {
      id: brandingId,
    },
  })
    .then((results) => {
      console.log('Success Destroying Branding')
      return results
    })
    .catch((err) => {
      console.log('Failed Destroying Branding')
      return err
    })
