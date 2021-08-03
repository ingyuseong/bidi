import React, { useState, useEffect } from 'react';
import { Stack } from '../../../../App';
import { createStackNavigator } from '@react-navigation/stack';

import CheckingScreen from '../../../Screen/ProposalTab/checkingProposal';
import ProposalIntroScreen from '../../../Screen/ProposalTab/introProposal';
import CreateProposalScreen from '../../../Screen/ProposalTab/createProposal';
import ProposalRegisteredScreen from '../../../Screen/ProposalTab/registeredProposal';
import SelectAfterImageScreen from '../../../Screen/ProposalTab/selectAfterImage';

import SelectFromAlbumScreen from '../../../Screen/ProposalTab/selectAfterImage/selectFromAlbum';
import SelectFromScrapScreen from '../../../Screen/ProposalTab/selectAfterImage/selectFromScrap';
import SelectFromBidiScreen from '../../../Screen/ProposalTab/selectAfterImage/selectFromBidi';

const ProposalStack = createStackNavigator();

function ProposalTabScreen({ navigation }) {
  return (
    <Stack.Navigator>
      <ProposalStack.Screen
        name="Loading"
        component={CheckingScreen}
        options={{ headerShown: false, title: '' }}
      />
      <ProposalStack.Screen
        name="Intro"
        component={ProposalIntroScreen}
        options={{ headerShown: false, title: '' }}
      />
      <ProposalStack.Screen
        name="CreateProposal"
        component={CreateProposalScreen}
        options={{ headerShown: false, title: '', afterStyle: '' }}
      />
      <ProposalStack.Screen
        name="ProposalRegistered"
        component={ProposalRegisteredScreen}
        options={{ headerShown: false, title: '' }}
      />
      <ProposalStack.Screen
        name="SelectAfterImage"
        component={SelectAfterImageScreen}
        options={{ headerShown: false, title: '' }}
      />
      <ProposalStack.Screen
        name="SelectFromAlbum"
        component={SelectFromAlbumScreen}
        options={{ headerShown: false, title: '' }}
      />
      <ProposalStack.Screen
        name="SelectFromScrap"
        component={SelectFromScrapScreen}
        options={{ headerShown: false, title: '' }}
      />
      <ProposalStack.Screen
        name="SelectFromBidi"
        component={SelectFromBidiScreen}
        options={{ headerShown: false, title: '' }}
      />
    </Stack.Navigator>
  );
}

export default ProposalTabScreen;
