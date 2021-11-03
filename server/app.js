require('dotenv').config()
const express = require('express')
const apiRouter = require('./routes/index')
const logger = require('morgan')
const { sequelize } = require('./models')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT

// RabbitMQ Consumer
const { listenForResults } = require('./lib/listenForResults')

// socket.io configuration
const { Socket } = require('./socket/socket')
const { initSocketIo } = require('./socket/init-socket')
// const { Client } = require('@elastic/elasticsearch')
// const client = new Client({
//   node: process.env.Bidi_ES_URL,
// })

sequelize
  .sync({ alter: false })
  .then(() => console.log('DB 연결 성공!'))
  .catch((err) => {
    console.error(err)
  })

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

app.use('/api', apiRouter)
// Not Found Handling
app.use(function (req, res, next) {
  res.status(404).json({
    state: 'failed',
    message: '404 Not Found',
    data: null,
  })
})
// Error Handling
app.use(function (err, req, res, next) {
  res.status(500).json({
    state: 'error',
    message: '500 Internal Server Error',
    data: null,
  })
})

// start express server on port 3000
app.listen(PORT, async () => {
  console.log(`server started on port ${PORT}`)
})

// require('elastic-apm-node').start({
//   appName: 'bidi-es',
//   secretToken: '',
//   serverUrl: '',
// })

// Listen for results queue of RabbitMQ
// listenForResults()

// // Start socket.io server on port 4000
// const { io, server } = Socket(app)
// initSocketIo(io, server)

module.exports = app
