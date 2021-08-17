const { eventName } = require('../../lib/event-name');

const joinRoom = (io, socket, roomId) => {
    socket.join(String(roomId))
    console.log(`Succesfully join Room #${roomId}!`)
}

const createMessage = (io, socket, message) => {
    io.in(String(message.roomId)).emit(eventName.NEW_CHAT_MESSAGE_EVENT, message);
}

const disconnectRoomId = (io, socket, roomId) => {
    socket.leave(roomId);
    console.log(`socket.io server: ${roomId} disconnected.`);
}

module.exports = { joinRoom, createMessage, disconnectRoomId };