const { Message } = require('../../models')
const { Sequelize } = require('sequelize')
const { and, or, like, not } = Sequelize.Op

exports.selectLatestMessageByRoomId = async (roomId) => 
    await Message.findAll({
        limit: 1,
        where: {
            room_id: roomId
        },
        order: [['created_at', 'DESC']],
    })
    
exports.selectAllMessageByRoomId = async (roomId) => 
    await Message.findAll({
        where: {
            room_id: roomId
        },
    })