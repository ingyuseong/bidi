import * as React from 'react';
import { Stack } from '../../../App';
import biidScreen from '../../Screen/BiidTab/biidScreen';
import detailsScreen from '../../Screen/detailScreen';
import { createStackNavigator } from '@react-navigation/stack';

const HistoryStack = createStackNavigator();

function HistoryTabScreen() {
  return (
    <Stack.Navigator>
      <HistoryStack.Screen name="Profile" component={biidScreen} />
      <HistoryStack.Screen name="ProfileEdit" component={detailsScreen} />
    </Stack.Navigator>
  );
}

export default HistoryTabScreen;
