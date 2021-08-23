const { findLastUser } = require('../services/user')

const getLastUserId = async (req, res, next) => {
  const user = await findLastUser()
  req.lastUserId = user.id
  next()
}
module.exports = getLastUserId
