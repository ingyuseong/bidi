import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView } from 'react-native';

import useChat from './useChat';
import ChatBubbleList from '../../Components/DM/chatBubbleList';
import DMHeader from '../../Components/DM/dMHeader';

function DMScreen({ navigation, route }) {
  const {
    params: { user, room },
  } = route;

  const roomId = room.id;
  const [messages, SendMessage] = useChat(roomId, user);

  const [messageText, setMessageText] = useState('');

  const handleSubmit = (event) => {
    SendMessage(messageText);
    setMessageText('');
  };

  // Header style configuration
  useLayoutEffect(() => {
    navigation.setOptions(
      {
        title: room.user.name,
        headerTintColor: 'black',
        headerBackTitle: ' ',
        headerTitle: () => <DMHeader navigation={navigation} user={room.user} />,
      },
      [navigation],
    );
  });

  return (
    <View style={styles.container}>
      <ChatBubbleList messages={messages} currentUser={user} />
      <TextInput
        value={messageText}
        style={styles.messageSender}
        onChangeText={setMessageText}
        onSubmitEditing={handleSubmit}
        autoCorrect={false}
        placeholder="메세지 보내기..."
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
  messageSenderContainer: {},
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
