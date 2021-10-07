const http = require('http');
const socket = require('socket.io');

const Socket = (app) => {
    // const server = require("http").createServer();
    const server = http.Server(app);
    const io = socket(server, {
      cors: {
        origin: "*",
      },
    });

    return { io, server };
}

module.exports =  { Socket };