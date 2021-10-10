const amqp = require('amqplib')
const { emitter } = require('./eventEmitter')

exports.listenForResults = async () => {
  // connect to Rabbit MQ
  let connection = await amqp.connect(process.env.AMQP_URL)

  // create a channel and prefetch 1 message at a time
  let channel = await connection.createChannel()
  await channel.prefetch(1)

  // start consuming messages
  console.log('Start listening for results queue of RabbitMQ')
  await consume({ connection, channel })
}

function consume({ connection, channel, resultsChannel }) {
  return new Promise((resolve, reject) => {
    channel.consume('processing.results', async function (msg) {
      // parse message
      let msgBody = msg.content.toString()
      let data = JSON.parse(msgBody)
      let requestId = data.id
      let processingResults = data.status
      console.log(
        'Received a result message, requestId:',
        requestId,
        'processingResults:',
        processingResults
      )

      // acknowledge message as received
      await channel.ack(msg)
      emitter.emit(requestId, requestId, processingResults)
      console.log(new Date())
      console.log('MQ END')
    })

    // handle connection closed
    connection.on('close', (err) => {
      return reject(err)
    })

    // handle errors
    connection.on('error', (err) => {
      return reject(err)
    })
  })
}
