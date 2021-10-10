const { STATUS_CODE } = require('../../lib/constants')
const amqp = require('amqplib')
const { publishToChannel } = require('../../lib/publishToChannel')
const { emitter } = require('../../lib/eventEmitter')
require('dotenv').config()

exports.inferenceAI = async (req, res) => {
  console.log('MQ START')
  console.log(new Date())
  const img_src = req.file.location
  const { id, length, gender } = req.body
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
      data: { id, gender, length, img_src },
    })
  } catch (err) {
    status = 'error'
    message = 'Failed to publish an inference message'
    console.log(err)
  } finally {
    // send the request id in the response
    emitter.on(requestId, (requestId, status, data) => {
      res.send({ requestId, status, data })
    })

    await channel.close()
    await connection.close()
  }
}
