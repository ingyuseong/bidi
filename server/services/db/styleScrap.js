const { Style, StyleScrap, User } = require('../../models')

// create
exports.insertStyleScrap = async ({ userId, styleId }) => {
  console.log(userId, styleId)
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
