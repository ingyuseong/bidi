require('dotenv').config()
const express = require('express')
const apiRouter = require('./routes/index')
const logger = require('morgan')
const { sequelize } = require('./models')
const app = express()
const PORT = process.env.PORT

// socket.io configuration
const { Socket } = require('./socket/socket')
const { initSocketIo } = require('./socket/init-socket')

sequelize
  .sync({ alter: false })
  .then(() => console.log('DB 연결 성공!'))
  .catch((err) => {
    console.error(err)
  })

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

app.use('/api', apiRouter)

// start express server on port 3000
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})

// Start socket.io server on port 4000
const { io, server } = Socket(app)
initSocketIo(io, server)

module.exports = app
