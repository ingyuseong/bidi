import * as React from 'react';
import { Stack } from '../../../../App';
import HistoryMainScreen from '../../../Screen/04_FourthTab/Designer/historyMainScreen';
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
    </Stack.Navigator>
  );
}

export default HistoryTabScreen;
