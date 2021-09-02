const { Style, StyleScrap, User } = require('../../models')

// Create StyleScrap Resource [create]
exports.createStyleScrap = async (attr) => {
  const styleScrap = await StyleScrap.create({
    raw: true,
    ...attr,
  })
  return styleScrap
}

// Read StyleScrap Resource [findOne, findAll]
exports.findAllStyleScrapByUser = async (id) => {
  const styleScrapList = await User.findOne({
    where: {
      id,
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
  return styleScrapList
}

// Delete StyleScrap Resource [destroy]
exports.destroyStyleScrap = async (attr) => {
  const styleScrap = await StyleScrap.destroy({
    where: {
      ...attr,
    },
  })
  return styleScrap
}
