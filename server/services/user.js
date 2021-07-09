const db = require('./db/user')

/*
 * 해당 아이디가 디비에 존재하는지 조회
 */
exports.getUsers = async (userId) => {
  const user = await db.selectUser(userId)
  return user
}
