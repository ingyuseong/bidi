import * as React from 'react';
import { Stack } from '../../../../App';
import { createStackNavigator } from '@react-navigation/stack';

import CommonHeader from '../../../Components/HeaderBar/commonHeader';
import DetailHeader from '../../../Components/HeaderBar/detailHeader';

import HistoryMainScreen from '../../../Screen/04_FourthTab/Designer/historyMainScreen';
import HistoryDetailScreen from '../../../Screen/04_FourthTab/Designer/historyDetailScreen';

const HistoryStack = createStackNavigator();

function HistoryTabScreen() {
  return (
    <Stack.Navigator>
      <HistoryStack.Screen
        name="HistoryMain"
        component={HistoryMainScreen}
        options={CommonHeader}
      />
      <HistoryStack.Screen
        name="HistoryDetail"
        component={HistoryDetailScreen}
        options={{ ...DetailHeader, title: '히스토리 상세 페이지' }}
      />
    </Stack.Navigator>
  );
}

export default HistoryTabScreen;
