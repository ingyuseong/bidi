import * as React from 'react';
import { Stack } from '../../../App';
import proposalScreen from '../../Screen/proposalScreen';
import { createStackNavigator } from '@react-navigation/stack';

const ProposalStack = createStackNavigator();

function ProposalTabScreen() {
  return (
    <Stack.Navigator>
      <ProposalStack.Screen
        name="Proposal"
        component={proposalScreen}
        options={{ headerShown: false,}}
      />
    </Stack.Navigator>
  );
}

export default ProposalTabScreen;
