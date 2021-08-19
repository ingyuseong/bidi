import React, { useState, useEffect } from 'react';
import { Stack } from '../../../../App';
import { createStackNavigator } from '@react-navigation/stack';

import CheckingProposalScreen from '../../../Screen/03_ThirdTab/User/checkingProposalScreen';
import IntroProposalScreen from '../../../Screen/03_ThirdTab/User/introProposalScreen';
import CreateProposalScreen from '../../../Screen/03_ThirdTab/User/createProposalScreen';
import RegisteredProposalScreen from '../../../Screen/03_ThirdTab/User/registeredProposalScreen';
import SelectAfterImageScreen from '../../../Screen/03_ThirdTab/User/selectAfterImageScreen';

import SelectFromAlbumScreen from '../../../Screen/03_ThirdTab/User/selectAfterImage/selectFromAlbumScreen';
import SelectFromScrapScreen from '../../../Screen/03_ThirdTab/User/selectAfterImage/selectFromScrapScreen';
import SelectFromBidiScreen from '../../../Screen/03_ThirdTab/User/selectAfterImage/selectFromBidiScreen';

const ProposalStack = createStackNavigator();

function ProposalTabScreen({ navigation }) {
  return (
    <Stack.Navigator>
      <ProposalStack.Screen
        name="Loading"
        component={CheckingProposalScreen}
        options={{ headerShown: false, title: '' }}
      />
      <ProposalStack.Screen
        name="Intro"
        component={IntroProposalScreen}
        options={{ headerShown: false, title: '' }}
      />
      <ProposalStack.Screen
        name="CreateProposal"
        component={CreateProposalScreen}
        options={{ headerShown: false, title: '', afterStyle: '' }}
      />
      <ProposalStack.Screen
        name="ProposalRegistered"
        component={RegisteredProposalScreen}
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
