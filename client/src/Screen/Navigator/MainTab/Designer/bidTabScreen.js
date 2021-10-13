import * as React from 'react';
import { Stack } from '../../../../App';
import { createStackNavigator } from '@react-navigation/stack';

import CommonHeader from '../../../Components/HeaderBar/commonHeader';
import DetailHeader from '../../../Components/HeaderBar/detailHeader';
import DetailBidScreen from '../../../Screen/02_SecondTab/Designer/detailBidScreen';
import BidMainScreen from '../../../Screen/02_SecondTab/Designer/bidMainScreen';

const bidStack = createStackNavigator();

function BidStackScreen() {
  return (
    <Stack.Navigator>
      <bidStack.Screen name="BidMain" component={BidMainScreen} options={CommonHeader} />
      <bidStack.Screen
        name="DetailBid"
        component={DetailBidScreen}
        options={{ ...DetailHeader, title: '비드 상세 페이지' }}
      />
    </Stack.Navigator>
  );
}

export default BidStackScreen;
