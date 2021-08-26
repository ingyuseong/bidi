import * as React from 'react';
import { Stack } from '../../../../App';
import ProposalListScreen from '../../../Screen/01_FirstTab/Designer/proposalListScreen';
import ProposalDetailScreen from '../../../Screen/01_FirstTab/Designer/proposalDetailScreen';
import CreateBidScreen from '../../../Screen/01_FirstTab/Designer/createBidScreen';
import RegisteredBidScreen from '../../../Screen/01_FirstTab/Designer/registeredBidScreen';
import { createStackNavigator } from '@react-navigation/stack';
import CommonHeader from '../../../Components/HeaderBar/commonHeader';
import DetailHeader from '../../../Components/HeaderBar/detailHeader';
const SearchStack = createStackNavigator();

function SearchTabScreen() {
  return (
    <Stack.Navigator>
      <SearchStack.Screen
        name="ProposalList"
        component={ProposalListScreen}
        options={CommonHeader}
      />
      <SearchStack.Screen
        name="ProposalDetail"
        component={ProposalDetailScreen}
        options={CommonHeader}
      />
      <SearchStack.Screen name="CreateBid" component={CreateBidScreen} options={DetailHeader} />
      <SearchStack.Screen
        name="BidRegistered"
        component={RegisteredBidScreen}
        options={CommonHeader}
      />
    </Stack.Navigator>
  );
}

export default SearchTabScreen;
