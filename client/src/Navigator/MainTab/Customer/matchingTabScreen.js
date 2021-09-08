import * as React from 'react';
import { Stack } from '../../../../App';
import { createStackNavigator } from '@react-navigation/stack';
import CommonHeader from '../../../Components/HeaderBar/commonHeader';

import MainScreen from '../../../Screen/02_SecondTab/Customer/mainScreen';
import ReservationScreen from '../../../Screen/02_SecondTab/Customer/matching/matchingMainScreen';
import ReservedMatchingScreen from '../../../Screen/02_SecondTab/Customer/reserved/reservedMainScreen';

import WaitMainScreen from '../../../Screen/02_SecondTab/Customer/wait/waitMainScreen';
import MyProposalScreen from '../../../Screen/02_SecondTab/Customer/wait/TabScreen/myProposalScreen';
import BidListScreen from '../../../Screen/02_SecondTab/Customer/wait/TabScreen/bidListScreen';

import CreateProposalScreen from '../../../Screen/02_SecondTab/Customer/wait/proposalEditScreen/createProposalScreen';
import UpdateProposalScreen from '../../../Screen/02_SecondTab/Customer/wait/proposalEditScreen/updateProposalScreen';

import SelectAfterImageScreen from '../../../Screen/02_SecondTab/Customer/wait/selectAfterImage/selectAfterImageScreen';
import SelectFromAlbumScreen from '../../../Screen/02_SecondTab/Customer/wait/selectAfterImage/selectFromAlbumScreen';
import SelectFromBidiScreen from '../../../Screen/02_SecondTab/Customer/wait/selectAfterImage/selectFromBidiScreen';
import SelectFromScrapScreen from '../../../Screen/02_SecondTab/Customer/wait/selectAfterImage/selectFromScrapScreen';

const matchingStack = createStackNavigator();
function MatchingStackScreen() {
  return (
    <Stack.Navigator>
      <matchingStack.Screen name="Main" component={MainScreen} options={CommonHeader} />
      <matchingStack.Screen name="Matching" component={ReservationScreen} options={CommonHeader} />
      <matchingStack.Screen
        name="Reserved"
        component={ReservedMatchingScreen}
        options={CommonHeader}
      />
      {/* Wait Screen */}
      <matchingStack.Screen name="Wait" component={WaitMainScreen} options={CommonHeader} />
      <matchingStack.Screen name="MyProposal" component={MyProposalScreen} options={CommonHeader} />
      <matchingStack.Screen name="BidList" component={BidListScreen} options={CommonHeader} />
      <matchingStack.Screen
        name="CreateProposal"
        component={CreateProposalScreen}
        options={CommonHeader}
      />
      <matchingStack.Screen
        name="UpdateProposal"
        component={UpdateProposalScreen}
        options={CommonHeader}
      />
      <matchingStack.Screen
        name="SelectAfterImage"
        component={SelectAfterImageScreen}
        options={CommonHeader}
      />
      <matchingStack.Screen
        name="SelectFromAlbum"
        component={SelectFromAlbumScreen}
        options={CommonHeader}
      />
      <matchingStack.Screen
        name="SelectFromScrap"
        component={SelectFromScrapScreen}
        options={CommonHeader}
      />
      <matchingStack.Screen
        name="SelectFromBidi"
        component={SelectFromBidiScreen}
        options={CommonHeader}
      />

      {/* Matching Screen */}
    </Stack.Navigator>
  );
}

export default MatchingStackScreen;
