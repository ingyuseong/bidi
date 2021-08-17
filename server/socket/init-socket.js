const { socketIndex } = require('./index');

const initSocketIo = (io, server) => {
    const socketPORT = 4000;

    io.on("connection", (socket) => {
        
        // Join a conversation
        const { roomId } = socket.handshake.query;
        // socket.join(roomId);
        // console.log("socket.io server: Connected: " + roomId);
        
        socketIndex(io, socket, roomId);
    });
    
    server.listen(socketPORT, () => {
        console.log(`socket.io server: Listening on port ${socketPORT}`);
    });
};

module.exports =  { initSocketIo };