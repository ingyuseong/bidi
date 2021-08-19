const { socketEvent } = require('./event/socket-event');

const socketIndex = (io, socket) => {
    socketEvent(io, socket);
}

module.exports = { socketIndex };