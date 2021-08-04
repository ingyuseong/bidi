import * as React from 'react';
import { Stack } from '../../../../App';
import bidScreen from '../../../Screen/04_FourthTab/User/bidScreen';
import { createStackNavigator } from '@react-navigation/stack';

const HistoryStack = createStackNavigator();

function HistoryTabScreen() {
  return (
    <Stack.Navigator>
      <HistoryStack.Screen
        name="Profile"
        component={bidScreen}
        options={{
          headerShown: false,
          // headerBackImage: BackBtn,
        }}
      />
    </Stack.Navigator>
  );
}

export default HistoryTabScreen;
