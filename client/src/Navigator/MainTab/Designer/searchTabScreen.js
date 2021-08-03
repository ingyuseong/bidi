import * as React from 'react';
import { Stack } from '../../../../App';
import ProposalListScreen from '../../../Screen/SearchTab/Designer/proposalListScreen';
import ProposalDetailScreen from '../../../Screen/SearchTab/Designer/proposalDetailScreen';
import CreateBiidScreen from '../../../Screen/SearchTab/Designer/createBiidScreen';
import RegisteredBiidScreen from '../../../Screen/SearchTab/Designer/registeredBiidScreen';
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
        name="CreateBiid"
        component={CreateBiidScreen}
        options={{
          headerShown: false,
        }}
      />
      <SearchStack.Screen
        name="BiidRegistered"
        component={RegisteredBiidScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default SearchTabScreen;
