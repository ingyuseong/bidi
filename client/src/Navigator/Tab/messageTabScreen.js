import * as React from 'react';
import { Stack } from '../../../App';
import biidScreen from '../../Screen/BiidTab/biidScreen';
import detailsScreen from '../../Screen/detailScreen';
import { createStackNavigator } from '@react-navigation/stack';

const MessageStack = createStackNavigator();

function MessageTabScreen() {
  return (
    <Stack.Navigator>
      <MessageStack.Screen name="Profile" component={biidScreen} />
      <MessageStack.Screen name="ProfileEdit" component={detailsScreen} />
    </Stack.Navigator>
  );
}

export default MessageTabScreen;
