import React, { useState, useEffect } from 'react';
import { Stack } from '../../../../App';
import { createStackNavigator } from '@react-navigation/stack';
import CommonHeader from '../../../Components/HeaderBar/commonHeader';

import Intro from '../../../Screen/03_ThirdTab/Customer/intro';

const ProposalStack = createStackNavigator();

function ProposalTabScreen({ navigation }) {
  return (
    <Stack.Navigator>
      <ProposalStack.Screen
        name="Main"
        component={Intro}
        options={CommonHeader}
        navigation={navigation}
      />
    </Stack.Navigator>
  );
}

export default ProposalTabScreen;
