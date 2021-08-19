import socketIOClient from "socket.io-client";
// import BidiStorage from '../storage';
// import STORAGE_KEY from '../constant';

const SOCKET_SERVER_URL = "http://localhost:4000";

// const Socket = async () => {
//     const user = await BidiStorage.getData(STORAGE_KEY)
//     return await socketIOClient(SOCKET_SERVER_URL, {
//         query: { userId: user.id, userToken: user.token },
//     })
//       .then((result) => {
//           console.log('Socket handshake successed')
//           return result
//       })
//       .catch((err) => {
//           console.log('Socket handshake failed')
//       })
// }

// const socket = Socket()

const socket = socketIOClient(SOCKET_SERVER_URL, {
    // query: { userId: '5', userToken: '1806772812' },
    query: { roomId: '5' },
})

export default socket;