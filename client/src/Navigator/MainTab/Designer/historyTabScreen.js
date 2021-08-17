import * as React from 'react';
import { Stack } from '../../../../App';
import HistoryMainScreen from '../../../Screen/04_FourthTab/Designer/historyMainScreen';
import HistoryDetailScreen from '../../../Screen/04_FourthTab/Designer/historyDetailScreen';
import { createStackNavigator } from '@react-navigation/stack';

const HistoryStack = createStackNavigator();

function HistoryTabScreen() {
  return (
    <Stack.Navigator>
      <HistoryStack.Screen
        name="HistoryMain"
        component={HistoryMainScreen}
        options={{
          headerShown: false,
        }}
      />
      <HistoryStack.Screen
        name="HistoryDetail"
        component={HistoryDetailScreen}
        options={{ headerShown: false, title: '' }}
      />
    </Stack.Navigator>
  );
}

export default HistoryTabScreen;
