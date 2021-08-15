import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';

// import { socket } from '../../Common/socket';
// import { io } from 'socket.io-client';

import useChat from './useChat';

import ChatBubbleList from '../../Components/DM/chatBubbleList';
import DMHeader from '../../Components/DM/dMHeader';

function DMScreen({ navigation, route }) {
  
  const { params: { user } } = route;

  const roomId = user['id'];
  const [ messages, SendMessage ] = useChat(roomId);
  console.log(SendMessage);
  
  const [messageText, setMessageText] = useState('');
  // const [messages, setMessages] = useState(dummyMessages);
  
  // const socketURL = 'http://localhost:3001';

  // const socket = io.connect(socketURL, {
  //   transports: ['websocket']
  // });

  // const newUserConnected = (userName) => {
  //   socket.emit("new user", userName);
  // };

  const handleSubmit = (event) => {
    // event.preventDefault();
    // let newMessages = [...messages, {
    //   userId: 1,
    //   customerSent: true,
    //   content: messageText,
    //   createdAt: '2021-07-15 08:44:45',
    // }]
    // setMessages(newMessages);
    // socket.emit('message text', messageText);
    // setMessageText('');
    
    SendMessage(messageText);
    setMessageText('');
  }

  // useEffect(() => {
  //   newUserConnected();

  //   socket.on("new user", function (data) {
  //     data.map((user) => {console.log(`New user Connected: ${user}`)});
  //   });

  //   socket.on("user disconnected", function (userName) {
  //     console.log(`New user Connected: ${userName}`)
  //   });

  //   socket.on("message text", msg => {
  //     setMessages([...messages, {
  //       userId: 1,
  //       customerSent: true,
  //       content: msg,
  //       createdAt: '2021-07-15 08:44:45',
  //     }]);
  //   });
  // }, []);

  // Header style configuration
  useLayoutEffect(() => {
    navigation.setOptions({
      title: user['name'],
      headerTintColor: 'black',
      headerBackTitle: ' ',
      headerTitle: () => <DMHeader navigation={navigation} user={user} />
    }, [navigation]);
  });

  return (
    <View style={styles.container}>
      <ChatBubbleList messages={messages} />
      <TextInput
        value={messageText}
        style={styles.messageSender}
        onChangeText={setMessageText}
        onSubmitEditing={handleSubmit}
        autoCorrect={false}
        placeholder='메세지 보내기...'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  messageSenderContainer: {
  },
  messageSender: {
    width: '90%',
    height: 44,
    borderWidth: 1.5,
    borderStyle: 'solid',
    borderColor: '#dfdfdf',
    borderRadius: 22,
    marginBottom: 30,
    paddingLeft: 20,
  },
});
export default DMScreen;