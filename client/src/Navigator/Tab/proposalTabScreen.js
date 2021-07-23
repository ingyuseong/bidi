import React, { useState, useEffect } from 'react';
import { Stack } from '../../../App';
import { createStackNavigator } from '@react-navigation/stack';

import CheckingScreen from '../../Screen/ProposalTab/checkingProposal'
import ProposalIntroScreen from '../../Screen/ProposalTab/introProposal';
import CreateProposalScreen from '../../Screen/ProposalTab/createProposal';
import ProposalRegisteredScreen from '../../Screen/ProposalTab/registeredProposal';
import SelectAfterImageScreen from '../../Screen/ProposalTab/selectAfterImage';

const ProposalStack = createStackNavigator();

function ProposalTabScreen({ navigation }) {
  return (
    <Stack.Navigator>
      <ProposalStack.Screen
        name="Loading"
        component={CheckingScreen}
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
        options={{ headerShown: false, title: '', afterStyle: ''}}
      />
      <ProposalStack.Screen
        name="ProposalRegistered"
        component={ProposalRegisteredScreen}
        options={{ headerShown: false, title: ''}}
      />
      <ProposalStack.Screen
        name="SelectAfterImage"
        component={SelectAfterImageScreen}
        options={{ headerShown: false, title: ''}}
      />
    </Stack.Navigator>
  );
}

export default ProposalTabScreen;
