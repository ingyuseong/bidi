const { socketEvent } = require('./event/socket-event');

const socketIndex = (io, socket, roomId) => {
    socketEvent(io, socket, roomId);
}

module.exports = { socketIndex };