import * as React from 'react';
import { Stack } from '../../../../App';
import biidScreen from '../../../Screen/BidTab/bidScreen';
import detailsScreen from '../../../Screen/detailScreen';
import { createStackNavigator } from '@react-navigation/stack';

const HistoryStack = createStackNavigator();

function HistoryTabScreen() {
  return (
    <Stack.Navigator>
      <HistoryStack.Screen
        name="Profile"
        component={biidScreen}
        options={{
          headerShown: false,
          // headerBackImage: BackBtn,
        }}
      />
      <HistoryStack.Screen
        name="ProfileEdit"
        component={detailsScreen}
        options={{
          headerShown: false,
          // headerBackImage: BackBtn,
        }}
      />
    </Stack.Navigator>
  );
}

export default HistoryTabScreen;
