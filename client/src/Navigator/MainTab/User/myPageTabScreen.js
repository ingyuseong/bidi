import * as React from 'react';
import { Stack } from '../../../../App';
import MypageScreen from '../../../Screen/05_MypageTab/mypageScreen';
import { createStackNavigator } from '@react-navigation/stack';
import CommonHeader from '../../../Components/HeaderBar/commonHeader';

const MypageStack = createStackNavigator();

function MyPageStackScreen() {
  return (
    <Stack.Navigator>
      <MypageStack.Screen name="mypage" component={MypageScreen} options={CommonHeader} />
    </Stack.Navigator>
  );
}

export default MyPageStackScreen;
