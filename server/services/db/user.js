const { User } = require('../../models')

exports.selectUser = async (userId) => {
  const results = await User.findAll({
    raw: true,
  })

  return results
}
