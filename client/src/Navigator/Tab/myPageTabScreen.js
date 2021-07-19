import * as React from 'react';
import { Stack } from '../../../App';
import biidScreen from '../../Screen/BiidTab/biidScreen';
import detailsScreen from '../../Screen/detailScreen';
import { createStackNavigator } from '@react-navigation/stack';

const MypageStack = createStackNavigator();

function MyPageStackScreen() {
  return (
    <Stack.Navigator>
      <MypageStack.Screen name="admin1" component={biidScreen} options={{ headerShown: false }} />
      <MypageStack.Screen
        name="admin2"
        component={detailsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default MyPageStackScreen;
