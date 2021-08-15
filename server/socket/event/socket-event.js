const { eventName } = require('../../lib/event-name');
const socketHandler =  require('../handler/socket-handler');

const socketEvent = (io, socket, roomId) => {
    socket.on(eventName.NEW_CHAT_MESSAGE_EVENT, (message) => socketHandler.createMessage(io, socket, roomId, message));
    socket.on(eventName.DISCONNECT, () => socketHandler.disconnectRoomId(io, socket, roomId))
};

module.exports = { socketEvent };