const { Style, User } = require('../../models')

// Create Style Resource [create]
exports.createStyle = async (attr) => {
  const style = await Style.create({
    raw: true,
    ...attr,
    ai_enable: false,
  })
  return style
}

// Read Style Resource [findOne, findAll]
exports.findAllStyle = async () => {
  const StyleList = await Style.findAll({
    include: [
      {
        model: User,
        attributes: ['name', 'nick_name', 'gender_type', 'img_src'],
        required: true,
      },
    ],
  })
  return StyleList
}
exports.findAllStyleByDesignerId = async (id) => {
  const styleList = await Style.findAll({
    where: {
      user_id: id,
    },
    include: [
      {
        model: User,
        attributes: ['name', 'nick_name', 'gender_type', 'img_src'],
        required: true,
      },
    ],
  })
  return styleList
}
exports.findOneStyle = async (id) => {
  const style = await Style.findOne({
    where: {
      id,
    },
    include: [
      {
        model: User,
        attributes: ['name', 'nick_name', 'gender_type', 'img_src'],
        required: true,
      },
    ],
  })
  return style
}

// Update Style Resource [update]
exports.updateStyle = async (id, body) => {
  const style = await Style.update(
    {
      raw: true,
      ...body,
    },
    {
      where: {
        id,
      },
    }
  )
  return style[0]
}
exports.updateAiEnable = async (id, enable) => {
  const style = await Style.update(
    {
      enable,
    },
    {
      where: {
        id,
      },
    }
  )
  return style[0]
}

// Delete Style Resource [destroy]
exports.destroyStyle = async (id) => {
  const style = await Style.destroy({
    where: {
      id,
    },
  })
  return style
}
