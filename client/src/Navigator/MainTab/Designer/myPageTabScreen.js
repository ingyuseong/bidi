import * as React from 'react';
import { Stack } from '../../../../App';
import { createStackNavigator } from '@react-navigation/stack';

import CommonHeader from '../../../Components/HeaderBar/commonHeader';
import DetailHeader from '../../../Components/HeaderBar/detailHeader';

import MyPageScreen from '../../../Screen/05_MypageTab/designer/myPageScreen';
import DetailMypageScreen from '../../../Screen/05_MypageTab/designer/detailMypageScreen';

const MypageStack = createStackNavigator();

function MyPageStackScreen() {
  return (
    <Stack.Navigator>
      <MypageStack.Screen name="MyPage" component={MyPageScreen} options={CommonHeader} />
      <MypageStack.Screen
        name="EditMypage"
        component={DetailMypageScreen}
        options={{ ...DetailHeader, title: '프로필 수정' }}
      />
    </Stack.Navigator>
  );
}

export default MyPageStackScreen;
