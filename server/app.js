require('dotenv').config()
const express = require('express')
const apiRouter = require('./routes/index')
const logger = require('morgan')
const { sequelize } = require('./models')
const app = express()
const PORT = process.env.PORT

// socket.io configuration
const socketPORT = 4000;

// const server = require("http").createServer();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

// Type
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

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
io.on("connection", (socket) => {
  
  // Join a conversation
  const { roomId } = socket.handshake.query;
  socket.join(roomId);
  console.log("socket.io server: Connected: " + roomId);

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    socket.leave(roomId);
  });
});

server.listen(socketPORT, () => {
  console.log(`socket.io server: Listening on port ${socketPORT}`);
});

module.exports = app
