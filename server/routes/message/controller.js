const messageServices = require('../../services/message')
const { STATUS_CODE } = require('../../lib/constants')

/*
    GET /api/message/latest/:roomId
    * room ID 기반 가장 최근 message 조회
*/
exports.getLatestMessageByRoomId = async (req, res) => {
  const { roomId } = req.params
  const latestMessage = await messageServices.getLatestMessage(roomId)
  res.status(STATUS_CODE.SUCCESS).json({
    message: '가장 최근 메세지 조회 성공',
    data: { latestMessage },
  })
}

/*
    GET /api/message/:roomId
    * room ID 기반 해당 채팅방의 모든 message 조회
*/
exports.getAllMessageByRoomId = async (req, res) => {
  const { roomId } = req.params
  const messageList = await messageServices.getAllMessageByRoomId(roomId)
  res.status(STATUS_CODE.SUCCESS).json({
    message: '해당 채팅방의 모든 메세지 조회 성공',
    data: { messageList },
  })
}
