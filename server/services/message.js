const db = require('./db/message');

exports.getLatestMessage = async (roomId) => {
  return await db.selectLatestMessageByRoomId(roomId)
    .then((results) => {
        console.log('Message Service Successed')
        return results
    })
    .catch((err) => {
        console.log('Message Service Failed')
        return err
    })
}