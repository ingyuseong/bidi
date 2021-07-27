import * as React from 'react';
import { Stack } from '../../../App';
import BiidListScreen from '../../Screen/BiidTab/user/biidMainScreen';
import detailsScreen from '../../Screen/detailScreen';
import { createStackNavigator } from '@react-navigation/stack';

const ViidStack = createStackNavigator();

function ViidStackScreen() {
  return (
    <Stack.Navigator>
      <ViidStack.Screen
        name="Profile22"
        component={BiidListScreen}
        options={{
          title: 'Viidi22',
          headerShown: false,
          // headerBackImage: BackBtn,
        }}
      />
      <ViidStack.Screen name="ProfileEdit" component={detailsScreen} />
    </Stack.Navigator>
  );
}

export default ViidStackScreen;
