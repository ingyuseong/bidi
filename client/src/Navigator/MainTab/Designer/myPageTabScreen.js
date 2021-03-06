import * as React from 'react';
import { Stack } from '../../../../App';
import { createStackNavigator } from '@react-navigation/stack';

import CommonHeader from '../../../Components/HeaderBar/commonHeader';
import DetailHeader from '../../../Components/HeaderBar/detailHeader';

import MyPageScreen from '../../../Screen/05_MypageTab/designer/myPageScreen';
import DetailMypageScreen from '../../../Screen/05_MypageTab/designer/detailMypageScreen';
import ScheduleInfoScreen from '../../../Screen/05_MypageTab/designer/scheduleInfoScreen';
import RegisterScheduleInfoScreen from '../../../Screen/05_MypageTab/designer/scheduleInfoScreen/registerScheduleInfoScreen';
import UpdateScheduleInfoScreen from '../../../Screen/05_MypageTab/designer/scheduleInfoScreen/updateScheduleInfoScreen';

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
      <MypageStack.Screen
        name="ScheduleInfo"
        component={ScheduleInfoScreen}
        options={{ ...DetailHeader, title: '시술 스케줄 관리' }}
      />
      <MypageStack.Screen
        name="RegisterScheduleInfo"
        component={RegisterScheduleInfoScreen}
        options={{ ...DetailHeader, title: '주간 시술 스케줄 등록' }}
      />
      <MypageStack.Screen
        name="UpdateScheduleInfo"
        component={UpdateScheduleInfoScreen}
        options={{ ...DetailHeader, title: '주간 시술 스케줄 업데이트' }}
      />
    </Stack.Navigator>
  );
}

export default MyPageStackScreen;
