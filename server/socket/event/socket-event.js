const { eventName } = require('../../lib/event-name');
const socketHandler =  require('../handler/socket-handler');

const socketEvent = (io, socket) => {
    socket.on(eventName.JOIN_ROOM, (roomId) => socketHandler.joinRoom(io, socket, roomId))
    socket.on(eventName.NEW_CHAT_MESSAGE_EVENT, (message) => socketHandler.createMessage(io, socket, message));
    socket.on(eventName.LEAVE_ROOM, (roomId) => socketHandler.disconnectRoomId(io, socket, roomId))
};

module.exports = { socketEvent };