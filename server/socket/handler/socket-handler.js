const { eventName } = require('../../lib/event-name');
const messageServices = require('../../services/message');

const joinRoom = (io, socket, roomId) => {
    socket.join(String(roomId))
    console.log(`Succesfully join Room #${roomId}!`)
}

const createMessage = async (io, socket, message) => {
    const newMessage = await messageServices.registerMessage(message);
    io.in(String(newMessage.room_id)).emit(eventName.NEW_CHAT_MESSAGE_EVENT, newMessage);
}

const disconnectRoomId = (io, socket, roomId) => {
    socket.leave(roomId);
    console.log(`socket.io server: ${roomId} disconnected.`);
}

module.exports = { joinRoom, createMessage, disconnectRoomId };