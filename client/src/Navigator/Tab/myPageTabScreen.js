import * as React from 'react';
import { Stack } from '../../../App';
import MypageScreen from '../../Screen/mypageScreen';
import { createStackNavigator } from '@react-navigation/stack';

const MypageStack = createStackNavigator();

function MyPageStackScreen() {
  return (
    <Stack.Navigator>
      <MypageStack.Screen name="mypage" component={MypageScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default MyPageStackScreen;
