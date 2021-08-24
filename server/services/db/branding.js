const { Branding, Style, User, BrandingStyle } = require('../../models')

// Create Branding Resource [create]
exports.createBranding = async ({
  user_id,
  title,
  shop_name,
  address,
  position,
  description,
  keyword_array,
  main,
}) =>
  await Branding.create({
    raw: true,
    userId: user_id,
    title,
    shop_name,
    address,
    position,
    description,
    keyword_array,
    main,
  })
    .then((results) => {
      console.log('Success Creating Branding')
      return results
    })
    .catch((err) => {
      console.log('Failed Creating Branding')
      return err
    })
exports.createBrandingStyle = async (brandingId, styleId) =>
  await BrandingStyle.create({
    raw: true,
    brandingId,
    styleId,
  })
    .then((results) => {
      console.log('Success Creating BrandingStyle')
      return results
    })
    .catch((err) => {
      console.log('Failed Creating BrandingStyle')
      return err
    })

// Read Branding Resource [findOne, findAll]
exports.findAllBranding = async () => {
  const results = await Branding.findAll({
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
    order: [['created_at', 'DESC']],
  })
  return results
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
    order: [['created_at', 'DESC']],
  })
  return results
}
exports.findOneBranding = async (brandingId) => {
  console.log(brandingId)
  const results = await Branding.findOne({
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
  return results
}
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
