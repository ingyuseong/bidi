import React, { useState, useEffect, createRef, useLayoutEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import TopLeftBar from '../../Components/Header/topLeftBar';
import TopRightBar from '../../Components/Header/topRightBar';

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
const dummyUsers = [[DaHyeon, '다현'], [Irene, '아이린'], [Nayeon, '나연'], [Sana, '사나'], [SanaKim, '김사나'], [Wendy, '웬디'], [Yeri, '예리']];


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