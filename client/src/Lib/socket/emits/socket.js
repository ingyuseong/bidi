import { JOIN_ROOM, NEW_CHAT_MESSAGE_EVENT, LEAVE_ROOM} from "../types/socket-types";
import socket from '../socketIO';

export const joinRoom = (roomId) => {
    socket.emit(JOIN_ROOM, roomId);
};

export const createMessage = (message) => {
    socket.emit(NEW_CHAT_MESSAGE_EVENT, message);
};

export const leaveRoom = (roomId) => {
    socket.emit(LEAVE_ROOM, roomId);
};