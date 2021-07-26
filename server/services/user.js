const db = require('./db/user')

exports.getUser = async (userId) => {
  const user = await db.selectUser(userId)
  return user
}

exports.getUserByToken = async (token) => {
  const user = await db.selectUserByToken(token)
  return user
}

exports.editUser = async (params) => {
  const user = await db.updateUser({ ...params })
  return user
}

exports.deleteUser = async (userId) => {
  const user = await db.destroyUser(userId)
  return user
}

exports.getUsers = async () => {
  const user = await db.selectAllUser()
  return user
}

exports.registerUser = async (params) => {
  const user = await db.insertUser({ ...params })
  console.log(params)
  return user
}
