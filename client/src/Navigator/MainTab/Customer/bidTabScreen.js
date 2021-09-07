import * as React from 'react';
import { Stack } from '../../../../App';
import { createStackNavigator } from '@react-navigation/stack';
import CommonHeader from '../../../Components/HeaderBar/commonHeader';

import CheckingMatchingScreen from '../../../Screen/02_SecondTab/Customer/checkingMatchingScreen';

import CreateProposalScreen from '../../../Screen/02_SecondTab/Customer/waitMatching/createProposalScreen';
import SelectAfterImageScreen from '../../../Screen/02_SecondTab/Customer/waitMatching/selectAfterImage/selectAfterImageScreen';
import SelectFromAlbumScreen from '../../../Screen/02_SecondTab/Customer/waitMatching/selectAfterImage/selectFromAlbumScreen';
import SelectFromBidiScreen from '../../../Screen/02_SecondTab/Customer/waitMatching/selectAfterImage/selectFromBidiScreen';
import SelectFromScrapScreen from '../../../Screen/02_SecondTab/Customer/waitMatching/selectAfterImage/selectFromScrapScreen';

import UpdateProposalScreen from '../../../Screen/02_SecondTab/Customer/waitMatching/updateProposalScreen';
import UpdateAfterImageScreen from '../../../Screen/02_SecondTab/Customer/waitMatching/updateAfterImage/updateAfterImageScreen';
import UpdateFromAlbumScreen from '../../../Screen/02_SecondTab/Customer/waitMatching/updateAfterImage/updateFromAlbumScreen';
import UpdateFromBidiScreen from '../../../Screen/02_SecondTab/Customer/waitMatching/updateAfterImage/updateFromBidiScreen';
import UpdateFromScrapScreen from '../../../Screen/02_SecondTab/Customer/waitMatching/updateAfterImage/updateFromScrapScreen';

const bidStack = createStackNavigator();

function BidStackScreen() {
  return (
    <Stack.Navigator>
      <bidStack.Screen name="check" component={CheckingMatchingScreen} options={CommonHeader} />
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
      <bidStack.Screen
        name="UpdateAfterImage"
        component={UpdateAfterImageScreen}
        options={CommonHeader}
      />
      <bidStack.Screen
        name="UpdateFromAlbum"
        component={UpdateFromAlbumScreen}
        options={CommonHeader}
      />
      <bidStack.Screen
        name="UpdateFromScrap"
        component={UpdateFromScrapScreen}
        options={CommonHeader}
      />
      <bidStack.Screen
        name="UpdateFromBidi"
        component={UpdateFromBidiScreen}
        options={CommonHeader}
      />
    </Stack.Navigator>
  );
}

export default BidStackScreen;
