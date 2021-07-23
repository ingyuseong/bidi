const { BrandingPage, Style, StyleMenu, User } = require('../../models')

exports.selectAllBranding = async (userId) => {
  const results = await BrandingPage.findAll({
    raw: true,
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
        attributes: ['name'],
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
