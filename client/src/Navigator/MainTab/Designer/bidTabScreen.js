import * as React from 'react';
import { Stack } from '../../../../App';
import { createStackNavigator } from '@react-navigation/stack';

import DetailBidScreen from '../../../Screen/02_SecondTab/Designer/detailBidScreen';
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
        name="detailBid"
        component={DetailBidScreen}
        options={{
          title: 'bidㅋㅋ',
        }}
      />
    </Stack.Navigator>
  );
}

export default BidStackScreen;
