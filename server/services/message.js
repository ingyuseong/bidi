const db = require('./db/message');

exports.getLatestMessage = async (roomId) => {
  const latestMessage =  await db.selectLatestMessageByRoomId(roomId)
    .then((results) => {
        console.log('Message Service Successed')
        return results
    })
    .catch((err) => {
        console.log('Message Service Failed')
        return err
    })
  return latestMessage
}

exports.getAllMessageByRoomId = async (roomId) => {
  const messageList =  await db.selectAllMessageByRoomId(roomId)
    .then((results) => {
        console.log('Get All Message Service Successed')
        return results
    })
    .catch((err) => {
        console.log('Get All Message Service Failed')
        return err
    })
  return messageList
}