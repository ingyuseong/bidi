import * as React from 'react';
import { Stack } from '../../../../App';
import { createStackNavigator } from '@react-navigation/stack';
import CommonHeader from '../../../Components/HeaderBar/commonHeader';

import CheckingMatchingScreen from '../../../Screen/02_SecondTab/Customer/checkingMatchingScreen';

import WaitMainScreen from '../../../Screen/02_SecondTab/Customer/waitMatching/waitMainScreen';
import MyProposalScreen from '../../../Screen/02_SecondTab/Customer/waitMatching/TabScreen/myProposalScreen';
import BidListScreen from '../../../Screen/02_SecondTab/Customer/waitMatching/TabScreen/bidListScreen';

import CreateProposalScreen from '../../../Screen/02_SecondTab/Customer/waitMatching/createProposalScreen';
import UpdateProposalScreen from '../../../Screen/02_SecondTab/Customer/waitMatching/updateProposalScreen';

import SelectAfterImageScreen from '../../../Screen/02_SecondTab/Customer/waitMatching/selectAfterImage/selectAfterImageScreen';
import SelectFromAlbumScreen from '../../../Screen/02_SecondTab/Customer/waitMatching/selectAfterImage/selectFromAlbumScreen';
import SelectFromBidiScreen from '../../../Screen/02_SecondTab/Customer/waitMatching/selectAfterImage/selectFromBidiScreen';
import SelectFromScrapScreen from '../../../Screen/02_SecondTab/Customer/waitMatching/selectAfterImage/selectFromScrapScreen';

const bidStack = createStackNavigator();

function BidStackScreen() {
  return (
    <Stack.Navigator>
      <bidStack.Screen name="Check" component={CheckingMatchingScreen} options={CommonHeader} />

      {/* Wait Screen */}

      <bidStack.Screen name="Wait" component={WaitMainScreen} options={CommonHeader} />
      <bidStack.Screen name="MyProposal" component={MyProposalScreen} options={CommonHeader} />
      <bidStack.Screen name="BidList" component={BidListScreen} options={CommonHeader} />
      <bidStack.Screen
        name="CreateProposal"
        component={CreateProposalScreen}
        options={CommonHeader}
      />
      <bidStack.Screen
        name="UpdateProposal"
        component={UpdateProposalScreen}
        options={CommonHeader}
      />
      <bidStack.Screen
        name="SelectAfterImage"
        component={SelectAfterImageScreen}
        options={CommonHeader}
      />
      <bidStack.Screen
        name="SelectFromAlbum"
        component={SelectFromAlbumScreen}
        options={CommonHeader}
      />
      <bidStack.Screen
        name="SelectFromScrap"
        component={SelectFromScrapScreen}
        options={CommonHeader}
      />
      <bidStack.Screen
        name="SelectFromBidi"
        component={SelectFromBidiScreen}
        options={CommonHeader}
      />

      {/* Process Screen */}
    </Stack.Navigator>
  );
}

export default BidStackScreen;
