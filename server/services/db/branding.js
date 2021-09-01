const { Branding, Style, User, BrandingStyle } = require('../../models')

// Create Branding Resource [create]
exports.createBranding = async (attr) => {
  const branding = await Branding.create({
    raw: true,
    ...attr,
    main: false,
  })
  return branding
}
exports.createBrandingStyle = async (attr) => {
  const brandingStyle = await BrandingStyle.create({
    raw: true,
    ...attr,
  })
  return brandingStyle
}

// Read Branding Resource [findOne, findAll]
exports.findAllBranding = async () => {
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
}
exports.findAllBrandingByDesignerId = async (id) => {
  const brandingList = await Branding.findAll({
    where: {
      user_id: id,
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
}
exports.findOneBrandingByUserId = async (id) => {
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
}
exports.findOneBranding = async (id) => {
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
}

// Update Branding Resource [update]
exports.updateBranding = async (id, attr) => {
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
}
exports.updateAllOtherBranding = async (user_id) => {
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
}
exports.updateMainBranding = async (branding_id) => {
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
}

// Delete Branding Resource [destroy]
exports.destroyBranding = async (id) => {
  const branding = await Branding.destroy({
    where: {
      id,
    },
  })
  return branding
}
