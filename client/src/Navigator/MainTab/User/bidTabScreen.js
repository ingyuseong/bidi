import * as React from 'react';
import { Stack } from '../../../../App';
import BidListScreen from '../../../Screen/BidTab/user/bidMainScreen';
import detailsScreen from '../../../Screen/detailScreen';
import { createStackNavigator } from '@react-navigation/stack';

const bidStack = createStackNavigator();

function BidStackScreen() {
  return (
    <Stack.Navigator>
      <bidStack.Screen
        name="Profile22"
        component={BidListScreen}
        options={{
          title: 'Viidi22',
          headerShown: false,
        }}
      />
      <bidStack.Screen name="ProfileEdit" component={detailsScreen} />
    </Stack.Navigator>
  );
}

export default BidStackScreen;
