const { eventName } = require('../../lib/event-name');

const createMessage = (io, socket, roomId, message) => {
    io.in(roomId).emit(eventName.NEW_CHAT_MESSAGE_EVENT, message);
}

const disconnectRoomId = (io, socket, roomId) => {
    socket.leave(roomId);
    console.log(`socket.io server: ${roomId} disconnected.`);
}

module.exports = { createMessage, disconnectRoomId };