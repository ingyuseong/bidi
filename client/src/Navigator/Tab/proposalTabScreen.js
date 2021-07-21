import React, { useState, useEffect } from 'react';
import { Stack } from '../../../App';
import { createStackNavigator } from '@react-navigation/stack';

import LoadingScreen from '../../Screen/ProposalTab/loading'
import ProposalIntroScreen from '../../Screen/ProposalTab/introProposal';
import CreateProposalScreen from '../../Screen/ProposalTab/createProposal';
import ProposalRegisteredScreen from '../../Screen/ProposalTab/proposalRegistered';

const ProposalStack = createStackNavigator();

function ProposalTabScreen() {
  return (
    <Stack.Navigator>
      <ProposalStack.Screen
        name="Loading"
        component={LoadingScreen}
        options={{ headerShown: false, title: '', }}
      />
      <ProposalStack.Screen
        name="Intro"
        component={ProposalIntroScreen}
        options={{ headerShown: false, title: '', }}
      />
      <ProposalStack.Screen
        name="CreateProposal"
        component={CreateProposalScreen}
        options={{ headerShown: false, title: ''}}
      />
      <ProposalStack.Screen
        name="ProposalRegistered"
        component={ProposalRegisteredScreen}
        options={{ headerShown: false, title: ''}}
      />
    </Stack.Navigator>
  );
}

export default ProposalTabScreen;
