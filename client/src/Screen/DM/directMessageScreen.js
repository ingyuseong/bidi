import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';

const dummyMessages = [
  {
    userId: 1,
    custormerSent: false,
    content: '네, 안녕하세요~! 다현입니다.',
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

  const { params: { userName } } = route;

  const [message, setMessage] = useState('');

  // Header style configuration
  useLayoutEffect(() => {
    navigation.setOptions({
      title: userName,
      headerTintColor: 'black',
      headerBackTitle: ' ',
    }, [navigation]);
  });

  return (
    <View style={styles.container}>
      <ScrollView style={styles.messageContainer}>
        {
          dummyMessages.map((message, idx) => (
            <View style={message.customerSent ? {width: '100%', alignItems: 'flex-end'} : {width: '100%', alignItems: 'flex-start'}} key={idx}>
              <Text style={message.customerSent ? styles.customerText : styles.designerText}>{message.content}</Text>
            </View>
          ))
        }
      </ScrollView>
      <TextInput
        value={message}
        style={styles.messageSender}
        onChangeText={setMessage}
        placeholder='      메세지 보내기...'
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
  messageContainer: {
    width: '100%',
  },
  designerText: {
    textAlign: 'left',
    padding: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
  customerText: {
    textAlign: 'right',
    padding: 20,
    fontWeight: 'bold',
    fontSize: 20,
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
  },
});
export default DMScreen;