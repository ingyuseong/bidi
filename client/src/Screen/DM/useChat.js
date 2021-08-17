import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { JOIN_ROOM, NEW_CHAT_MESSAGE_EVENT, LEAVE_ROOM } from "../../Lib/socket/types/socket-types";

// import socket from "../../Lib/socket/socketIO";

// import { createMessage } from "../../../../server/socket/handler/socket-handler";

// const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; // Name of the event
const SOCKET_SERVER_URL = "http://localhost:4000";

const dummyMessages = [
    {
      userId: 1,
      custormerSent: false,
      content: '네, 안녕하세요~! 다현입니다😘',
      createdAt: '2021-07-15 08:44:12',
    },
    {
      userId: 1,
      customerSent: false,
      content: '그럼요! 손상케어는 제가 전문가 과정도 수료했습니다!',
      createdAt: '2021-07-15 08:44:15',
    },
    {
      userId: 1,
      customerSent: false,
      content: '고객님. 지금 당장 예약은 조금 어려우시고요ㅠㅠ 괜찮으시면 다음주 수요일은 어떠세요?',
      createdAt: '2021-07-15 08:44:20',
    },
    {
      userId: 1,
      customerSent: true,
      content: '앗..',
      createdAt: '2021-07-15 08:44:30',
    },
    {
      userId: 1,
      customerSent: true,
      content: '그럼 수요일 몇시에 가능하신가요?',
      createdAt: '2021-07-15 08:44:45',
    },
  ];

const useChat = (roomId) => {
  const [messages, setMessages] = useState(dummyMessages); // Sent and received messages
  const socketRef = useRef();

  useEffect(() => {
    
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });
    // socketRef.current = socket
    
    // Listens for incoming messages
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        // ownedByCurrentUser: message.senderId === socketRef.current.id,
        customerSent: true,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });
    
    // Destroys the socket reference
    // when the connection is closed
    return () => {
      // socketRef.current.disconnect();
      socketRef.current.emit(LEAVE_ROOM);
    };
  }, [roomId]);

  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendMessage = (messageBody) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      userId: socketRef.current.id,
      customerSent: true,
      content: messageBody,
      createdAt: '2021-07-15 08:44:45',
    });
  };

  return [ messages, sendMessage ];
};

export default useChat;