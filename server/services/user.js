const db = require('./db/user')

exports.getUsers = async (userId) => {
  const user = await db.selectUser(userId)
  return user
}

exports.registerUser = async (params) => {
  console.log('>>', params)
  const user = await db.insertUser({ ...params })
  return user
}
