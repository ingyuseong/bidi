import * as React from 'react';
import { Stack } from '../../../../App';
import BidListScreen from '../../../Screen/BidTab/user/bidMainScreen';
import { createStackNavigator } from '@react-navigation/stack';

const bidStack = createStackNavigator();

function BidStackScreen() {
  return (
    <Stack.Navigator>
      <bidStack.Screen
        name="Profile22"
        component={BidListScreen}
        options={{
          title: 'bid',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default BidStackScreen;
