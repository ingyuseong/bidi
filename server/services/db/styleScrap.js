const { Style, StyleScrap, User } = require('../../models')

// create
exports.insertStyleScrap = async ({ userId, styleId }) => {
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

// delete
exports.destroyStyleScrap = async ({ userId, styleId }) => {
  const results = await StyleScrap.destroy({
    where: {
      user_id: userId,
      style_id: styleId,
    },
  })
  return results
}

exports.selectStyleScrapByUser = async (userId) => {
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
