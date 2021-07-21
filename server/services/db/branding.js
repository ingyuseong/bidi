const {
  BrandingPage,
  BrandingPageKeyword,
  Keyword,
  Style,
  StyleMenu,
} = require('../../models')

exports.selectBrandingInfo = async (userId) => {
  const results = await BrandingPage.findOne({
    raw: true,
    where: {
      user_id: userId,
    },
    include: [
      {
        model: Keyword,
        as: 'brandingPageKeywords',
        through: {
          model: BrandingPageKeyword,
        },
      },
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
