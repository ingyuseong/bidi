const { BrandingPage, Style, StyleMenu, User } = require('../../models')

exports.updateBranding = async ({
  id,
  description,
  shop_name,
  keywords,
  main,
}) =>
  await BrandingPage.update(
    {
      raw: true,
      description,
      shop_name,
      keywords,
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

exports.destroyBranding = async (brandingId) =>
  await BrandingPage.destroy({
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

exports.selectAllBranding = async () => {
  const results = await BrandingPage.findAll({
    raw: true,
  })

  return results
}

exports.selectAllBrandingByUserId = async (userId) => {
  const results = await BrandingPage.findAll({
    raw: true,
    where: {
      user_id: userId,
    },
  })

  return results
}

exports.selectBrandingInfo = async (userId) => {
  const results = await BrandingPage.findOne({
    raw: true,
    where: {
      user_id: userId,
    },
    include: [
      {
        model: User,
        attributes: ['name', 'img_src'],
      },
    ],
  })

  return results
}

exports.selectBrandingWithStyle = async (userId) => {
  const results = await BrandingPage.findAll({
    where: {
      user_id: userId,
    },
    include: [
      {
        model: Style,
        as: 'styleMenus',
        through: {
          model: StyleMenu,
        },
      },
    ],
  })
  return results
}

exports.insertBranding = async ({
  user_id,
  description,
  shop_name,
  keywords,
  main,
}) =>
  await BrandingPage.create({
    raw: true,
    userId: user_id,
    description,
    shop_name,
    keywords,
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

exports.insertBrandingStyle = async (brandingId, styleId) =>
  await StyleMenu.create({
    raw: true,
    brandingPageId: brandingId,
    styleId,
  })
    .then((results) => {
      console.log('Success Creating StyleMenu')
      return results
    })
    .catch((err) => {
      console.log('Failed Creating StyleMenu')
      return err
    })
