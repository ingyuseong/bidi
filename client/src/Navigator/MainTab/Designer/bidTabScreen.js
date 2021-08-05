import * as React from 'react';
import { Stack } from '../../../../App';
import { createStackNavigator } from '@react-navigation/stack';

import UpdateBidScreen from '../../../Screen/02_SecondTab/Designer/updateBidScreen';
import BidMainScreen from '../../../Screen/02_SecondTab/Designer/bidMainScreen';

const bidStack = createStackNavigator();

function BidStackScreen() {
  return (
    <Stack.Navigator>
      <bidStack.Screen
        name="bid"
        component={BidMainScreen}
        options={{
          title: 'bid',
          headerShown: false,
        }}
      />
      <bidStack.Screen
        name="updateBid"
        component={UpdateBidScreen}
        options={{
          title: 'bid',
        }}
      />
    </Stack.Navigator>
  );
}

export default BidStackScreen;
