const { Style, StyleScrap, User } = require('../../models')

// Create StyleScrap Resource [create]
exports.createStyleScrap = async ({ userId, styleId }) => {
  const results = await StyleScrap.create({
    raw: true,
    userId: userId,
    styleId: styleId,
    include: [
      {
        model: Style,
        as: 'styleScraps',
        through: {
          model: StyleScrap,
        },
      },
    ],
  }).catch((err) => console.error(err))
  return results
}
// Read StyleScrap Resource [findOne, findAll]
exports.findAllStyleScrapByUser = async (userId) => {
  const results = await User.findOne({
    where: {
      id: userId,
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
  return results
}

// Delete StyleScrap Resource [destroy]
exports.destroyStyleScrap = async ({ userId, styleId }) => {
  const results = await StyleScrap.destroy({
    where: {
      user_id: userId,
      style_id: styleId,
    },
  })
  return results
}
