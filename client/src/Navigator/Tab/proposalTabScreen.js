import * as React from 'react';
import { Stack } from '../../../App';
import biidScreen from '../../Screen/BiidTab/biidScreen';
import detailsScreen from '../../Screen/detailScreen';
import { createStackNavigator } from '@react-navigation/stack';

const ProposalStack = createStackNavigator();

function ProposalStackScreen() {
  return (
    <Stack.Navigator>
      <ProposalStack.Screen name="admin1" component={biidScreen} options={{ headerShown: false }} />
      <ProposalStack.Screen
        name="admin2"
        component={detailsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default ProposalStackScreen;
