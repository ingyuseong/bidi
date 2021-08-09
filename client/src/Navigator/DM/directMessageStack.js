import React, { useState, useEffect, createRef, useLayoutEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import DMListScreen from '../../Screen/DM/messageListScreen';
import DMScreen from '../../Screen/DM/directMessageScreen';

// Temporary dummy data
import DaHyeon from '../../../public/img/DM/dahyeon.jpeg'
import Irene from '../../../public/img/DM/irene.jpeg'
import Nayeon from '../../../public/img/DM/nayeon.jpeg'
import Sana from '../../../public/img/DM/sana1.jpeg'
import SanaKim from '../../../public/img/DM/sana2.jpeg'
import Wendy from '../../../public/img/DM/wendy.jpeg'
import Yeri from '../../../public/img/DM/yeri.jpeg'
// const dummyUsers = ['다현', '아이린', '나연', '사나', '김사나', '웬디', '예리'];
// const dummyUsers = [DaHyeon, Irene, Nayeon, Sana, SanaKim, Wendy, Yeri];
// const dummyUsers = [[DaHyeon, '다현'], [Irene, '아이린'], [Nayeon, '나연'], [Sana, '사나'], [SanaKim, '김사나'], [Wendy, '웬디'], [Yeri, '예리']];
const dummyUsers = [
  {
    id: 0,
    profile: DaHyeon,
    name: '다현',
    authenticated: true,
    belong: '트와이스헤어',
    new: true,
  },
  {
    id: 1,
    profile: Irene,
    name: '아이린',
    authenticated: false,
    belong: '레벨헤어',
    new: false,
  },
  {
    id: 2,
    profile: Nayeon,
    name: '나연',
    authenticated: true,
    belong: '트와이스헤어',
    new: false,
  },
  {
    id: 3,
    profile: Sana,
    name: '사나',
    authenticated: false,
    belong: '트와이스헤어',
    new: false,
  },
  {
    id: 4,
    profile: SanaKim,
    name: '김사나',
    authenticated: false,
    belong: '트와이스헤어',
    new: true,
  },
  {
    id: 5,
    profile: Wendy,
    name: '웬디',
    authenticated: false,
    belong: '레벨헤어',
    new: false,
  },
  {
    id: 6,
    profile: Yeri,
    name: '예리',
    authenticated: false,
    belong: '레벨헤어',
    new: false,
  },
];

const dummyMessages = [
  {
    designerId: 0,
    profile: DaHyeon,
    authenticated: true,
    name: '다현',
    userSent: false,
    content: '네, 안녕하세요~! 다현이에요.',
    createdAt: '2021-07-15 08:44:12',
    unread: true,
  },
  {
    designerId: 1,
    profile: Irene,
    name: '아이린',
    authenticated: false,
    userSent: false,
    content: '연락주셔서 감사합니다. 벨벳헤어 실장 아이린입니다!',
    createdAt: '2021-07-08 18:20:37',
    unread: false,
  },
  {
    designerId: 4,
    profile: SanaKim,
    name: '김사나',
    authenticated: true,
    userSent: true,
    content: '"쥐-드래곤 머리"해주세요.',
    createdAt: '2021-06-30 21:20:37',
    unread: true,
  },
];

// const dummyMessages = [
//   {
//     userId: 1,
//     userSent: false,
//     content: '네, 안녕하세요~! 다현입니다.',
//     createdAt: '2021-07-15 08:44:12',
//   },
//   {
//     userId: 1,
//     userSent: false,
//     content: '그럼요! 손상케어는 제가 전문가 과정도 수료했습니다!',
//     createdAt: '2021-07-15 08:44:15',
//   },
//   {
//     userId: 1,
//     userSent: false,
//     content: '고객님. 지금 당장 예약은 조금 어려울시고요ㅠㅠ 괜찮으시면 다음주 수요일은 어떠세요?',
//     createdAt: '2021-07-15 08:44:20',
//   },
//   {
//     userId: 1,
//     userSent: true,
//     content: '앗..',
//     createdAt: '2021-07-15 08:44:30',
//   },
//   {
//     userId: 1,
//     userSent: true,
//     content: '그럼 수요일 몇시에 가능하신가요?',
//     createdAt: '2021-07-15 08:44:45',
//   },
//   {
//     userId: 2,
//     userSent: true,
//     content: '연락주셔서 감사합니다. 벨벳헤어 실장 아이린입니다!',
//     createdAt: '2021-07-08 18:20:37',
//   },
// ];


const Stack = createStackNavigator();

function DMStack({ navigation, route }) {

  return (
    <Stack.Navigator
      initialRouteName='MessageList'
    >
      <Stack.Screen
        name='MessageList'
        component={DMListScreen}
        initialParams={{
          users: dummyUsers,
          messages: dummyMessages,
        }}
        />
      <Stack.Screen
        name='DirectMessage'
        component={DMScreen}
      />
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
},
defaultText: {
    textAlign: 'center',
    padding: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
});
export default DMStack;