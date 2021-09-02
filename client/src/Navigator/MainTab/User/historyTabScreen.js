import * as React from 'react';
import { Stack } from '../../../../App';
import HistoryMainScreen from '../../../Screen/04_FourthTab/User/historyMainScreen';
import { createStackNavigator } from '@react-navigation/stack';
import CommonHeader from '../../../Components/HeaderBar/commonHeader';

const HistoryStack = createStackNavigator();

function HistoryTabScreen() {
  return (
    <Stack.Navigator>
      <HistoryStack.Screen name="Profile" component={HistoryMainScreen} options={CommonHeader} />
    </Stack.Navigator>
  );
}

export default HistoryTabScreen;
