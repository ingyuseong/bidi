const roomServices = require('../../services/room')
const { STATUS_CODE } = require('../../lib/constants')

/*
    GET /api/room/customer/:userId
    * 고객 ID 기반 room 조회
*/
exports.getAllRoomByCustomerId = async (req, res) => {
  const { userId } = req.params
  const roomList = await roomServices.getAllRoomByCustomerId(userId)
  res.status(STATUS_CODE.SUCCESS).json({
    message: '채팅방 조회 성공',
    data: { roomList },
  })
}

/*
    GET /api/room/designer/:userId
    * 디자이너 ID 기반 room 조회
*/
exports.getAllRoomByDesignerId = async (req, res) => {
  const { userId } = req.params
  const roomList = await roomServices.getAllRoomByDesignerId(userId)
  res.status(STATUS_CODE.SUCCESS).json({
    message: '채팅방 조회 성공',
    data: { roomList },
  })
}
