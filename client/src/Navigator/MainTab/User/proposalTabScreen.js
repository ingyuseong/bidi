import React, { useState, useEffect } from 'react';
import { Stack } from '../../../../App';
import { createStackNavigator } from '@react-navigation/stack';
import CommonHeader from '../../../Components/HeaderBar/commonHeader';

import CheckingProposalScreen from '../../../Screen/03_ThirdTab/User/checkingProposalScreen';
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
      <ProposalStack.Screen name="Main" component={CheckingProposalScreen} options={CommonHeader} />
      <ProposalStack.Screen
        name="SelectAfterImage"
        component={SelectAfterImageScreen}
        options={CommonHeader}
      />
      <ProposalStack.Screen
        name="SelectFromAlbum"
        component={SelectFromAlbumScreen}
        options={CommonHeader}
      />
      <ProposalStack.Screen
        name="SelectFromScrap"
        component={SelectFromScrapScreen}
        options={CommonHeader}
      />
      <ProposalStack.Screen
        name="SelectFromBidi"
        component={SelectFromBidiScreen}
        options={CommonHeader}
      />
    </Stack.Navigator>
  );
}

export default ProposalTabScreen;
