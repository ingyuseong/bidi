const userServices = require('../../services/user')
const { STATUS_CODE } = require('../../lib/constants')
const axios = require('axios')
const amqp = require('amqplib')
const { publishToChannel } = require('../../lib/publishToChannel')
const { emitter } = require('../../lib/eventEmitter')
require('dotenv').config()

// [ 1. POST Methods ]
exports.registerUser = async (req, res) => {
  const body = req.body
  const img_src = req?.file?.location
  const user = await userServices.createUser({ ...body, img_src })
  if (user) {
    res.status(STATUS_CODE.CREATED).json({
      state: 'success',
      message: '회원가입 성공',
      data: user,
    })
  } else {
    res.status(STATUS_CODE.BAD_REQUEST).json({
      state: 'failed',
      message: '회원가입에 실패했습니다',
      data: {},
    })
  }
}
exports.checkToken = async (req, res) => {
  const body = req.body
  const user = await userServices.findOneUserByToken(body)
  if (user) {
    return res.status(STATUS_CODE.SUCCESS).json({
      state: 'success',
      message: '유저 Token Check 성공',
      data: user,
    })
  } else {
    return res.status(STATUS_CODE.NOT_FOUND).json({
      state: 'failed',
      message: '해당 Token은 아직 등록되지 않았습니다',
      data: {},
    })
  }
}
exports.inferenceAI = async (req, res) => {
  console.log('MQ START')
  console.log(new Date())
  const { id, gender, img_src } = req.body
  let status = 'success'
  let message = 'Successfully publish an inference message'

  // connect to Rabbit MQ and create a channel
  let connection = await amqp.connect(process.env.AMQP_URL)
  let channel = await connection.createConfirmChannel()

  let requestId = id
  console.log(`Start publishing a message # ${requestId}`)
  try {
    // publish the data to Rabbit MQ
    await publishToChannel(channel, {
      routingKey: 'request',
      exchangeName: 'processing',
      data: { requestId, id, gender, img_src },
    })

  } catch (err) {
    status = 'error'
    message = 'Failed to publish an inference message'
    console.log(err)
  } finally {
    // send the request id in the response
    emitter.once(requestId, (requestId, status) => {
      res.send({ requestId, status })
    })

    await channel.close()
    await connection.close()
  }
}

// [ 2. GET Methods ]
exports.getUserList = async (req, res) => {
  const userList = await userServices.findAllUser()
  if (userList) {
    res.status(STATUS_CODE.SUCCESS).json({
      state: 'success',
      message: '전체 사용자 목록 조회 성공',
      data: userList,
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '조회할 사용자 목록이 없습니다',
      data: [],
    })
  }
}
exports.getUser = async (req, res) => {
  const { id } = req.params
  const user = await userServices.findOneUser(id)
  if (user) {
    res.status(STATUS_CODE.SUCCESS).json({
      state: 'success',
      message: '사용자 정보 조회 성공',
      data: user,
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      state: 'empty',
      message: '조회할 사용자 정보가 없습니다',
      data: {},
    })
  }
}

// [ 3. PATCH Methods ]
exports.patchUser = async (req, res) => {
  const { id } = req.params
  const body = req.body
  const img_src = req?.file?.location
  const updatedUserCount = await userServices.updateUser(id, {
    ...body,
    img_src,
  })
  if (updatedUserCount) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '사용자 정보 수정 성공',
      data: updatedUserCount,
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '수정된 사용자 정보가 없습니다',
      data: 1,
    })
  }
}

// [ 4. DELETE Methods]
exports.deleteUser = async (req, res) => {
  const { id } = req.params
  const deletedUserCount = await userServices.destroyUser(id)
  if (deletedUserCount) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '사용자 정보 삭제 성공',
      data: deletedUserCount,
    })
  } else {
    res.status(STATUS_CODE.NOT_FOUND).json({
      status: 'failed',
      message: '삭제할 사용자 정보가 없습니다',
      data: deletedUserCount,
    })
  }
}
