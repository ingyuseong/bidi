import * as React from 'react';
import { Stack } from '../../../../App';
import { createStackNavigator } from '@react-navigation/stack';

import BidMainScreen from '../../../Screen/BidTab/user/bidMainScreen';
import UpdateProposalScreen from '../../../Screen/BidTab/user/updateProposalScreen';

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
        name="updateProposal"
        component={UpdateProposalScreen}
        options={{
          title: 'bid',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default BidStackScreen;
