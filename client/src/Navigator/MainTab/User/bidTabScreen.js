import * as React from 'react';
import { Stack } from '../../../../App';
import { createStackNavigator } from '@react-navigation/stack';
import CommonHeader from '../../../Components/HeaderBar/commonHeader';

import BidMainScreen from '../../../Screen/02_SecondTab/User/bidMainScreen';
import UpdateProposalScreen from '../../../Screen/02_SecondTab/User/updateProposalScreen';
import MatchingMainScreen from '../../../Screen/02_SecondTab/User/matchingMainScreen';

const bidStack = createStackNavigator();

function BidStackScreen() {
  return (
    <Stack.Navigator>
      <bidStack.Screen name="bid" component={BidMainScreen} options={CommonHeader} />
      <bidStack.Screen
        name="updateProposal"
        component={UpdateProposalScreen}
        options={CommonHeader}
      />
      <bidStack.Screen name="matching" component={MatchingMainScreen} options={CommonHeader} />
    </Stack.Navigator>
  );
}

export default BidStackScreen;
