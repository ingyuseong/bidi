import { io } from 'socket.io-client';

// const socketURL = process.env.API_URL;
const socketURL = 'http://localhost:3001';

export const socket = io(socketURL, {
  transports: ['websocket']
});

// export default socket;