const { Message } = require('../../models')
const { Sequelize } = require('sequelize')
const { and, or, like, not } = Sequelize.Op

exports.selectLatestMessageByRoomId = async (roomId) => {
    return await Message.selectLatestMessageByRoomId(roomId)
}