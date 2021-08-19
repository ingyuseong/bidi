import * as React from 'react';
import { Stack } from '../../../../App';
import ProposalListScreen from '../../../Screen/01_FirstTab/Designer/proposalListScreen';
import ProposalDetailScreen from '../../../Screen/01_FirstTab/Designer/proposalDetailScreen';
import CreateBidScreen from '../../../Screen/01_FirstTab/Designer/createBidScreen';
import RegisteredBidScreen from '../../../Screen/01_FirstTab/Designer/registeredBidScreen';
import { createStackNavigator } from '@react-navigation/stack';

const SearchStack = createStackNavigator();

function SearchTabScreen() {
  return (
    <Stack.Navigator>
      <SearchStack.Screen
        name="ProposalList"
        component={ProposalListScreen}
        options={{
          headerShown: false,
        }}
      />
      <SearchStack.Screen
        name="ProposalDetail"
        component={ProposalDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <SearchStack.Screen
        name="CreateBid"
        component={CreateBidScreen}
        options={{
          headerShown: false,
        }}
      />
      <SearchStack.Screen
        name="BidRegistered"
        component={RegisteredBidScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default SearchTabScreen;
