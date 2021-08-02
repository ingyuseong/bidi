import * as React from 'react';
import { Stack } from '../../../../App';
import ProposalListScreen from '../../../Screen/SearchTab/Designer/proposalListScreen';
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
    </Stack.Navigator>
  );
}

export default SearchTabScreen;
