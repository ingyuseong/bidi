import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';

import ChatBubbleList from '../../Components/DM/chatBubbleList';
import DMHeader from '../../Components/DM/dMHeader';

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

function DMScreen({ navigation, route }) {

  const { params: { user } } = route;

  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState(dummyMessages);

  const handleSubmit = (event) => {
    event.preventDefault();
    let newMessages = [...messages, {
      userId: 1,
      customerSent: true,
      content: messageText,
      createdAt: '2021-07-15 08:44:45',
    }]
    setMessages(newMessages);
    setMessageText('');
  }

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