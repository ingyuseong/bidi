const { Branding, Style, User, BrandingStyle } = require('../../models')

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
exports.findAllBrandingByUserId = async (userId) => {
  const results = await Branding.findAll({
    where: {
      user_id: userId,
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
  return results
}
exports.findOneBranding = async (brandingId) =>
  await Branding.findOne({
    where: {
      id: brandingId,
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
    .then((results) => {
      console.log('Success Selecting branding')
      return results
    })
    .catch((err) => {
      console.log('Failed Selecting branding')
      return err
    })
exports.findOneBrandingByUserId = async (userId) => {
  const results = await Branding.findOne({
    where: {
      user_id: userId,
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
  return results
}

// Update Branding Resource [update]
exports.updateBranding = async ({
  id,
  title,
  shop_name,
  address,
  position,
  description,
  keyword_array,
  main,
}) => {
  return await Branding.update(
    {
      raw: true,
      title,
      shop_name,
      address,
      position,
      description,
      keyword_array,
      main,
    },
    {
      where: {
        id,
      },
    }
  )
    .then((results) => {
      console.log('Success Updating Branding')
      return results
    })
    .catch((err) => {
      console.log(err)
      console.log('Failed Updating Branding')
      return err
    })
}
exports.updateAllBrandingMainStatus = async (userId) => {
  const result = await Branding.update(
    {
      main: false,
    },
    {
      where: {
        user_id: userId,
      },
    }
  )
    .then((results) => {
      console.log('Success Updating All Branding Status')
      return results
    })
    .catch((err) => {
      console.log('Failed Updating All Branding Status')
      return err
    })
}
exports.updateBrandingMainStatus = async (brandingId) => {
  const branding = await Branding.update(
    {
      main: true,
    },
    {
      where: {
        id: brandingId,
      },
    }
  )
  return branding
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
