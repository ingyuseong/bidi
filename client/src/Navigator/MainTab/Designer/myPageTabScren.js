import * as React from 'react';
import { Stack } from '../../../../App';
import { createStackNavigator } from '@react-navigation/stack';

import CommonHeader from '../../../Components/HeaderBar/commonHeader';
import DetailHeader from '../../../Components/HeaderBar/detailHeader';

import MyPageScreen from '../../../Screen/05_MypageTab/designer/myPageScreen';

const MypageStack = createStackNavigator();

function MyPageStackScreen() {
  return (
    <Stack.Navigator>
      <MypageStack.Screen name="mypage" component={MyPageScreen} options={CommonHeader} />
    </Stack.Navigator>
  );
}

export default MyPageStackScreen;
