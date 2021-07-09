import * as React from 'react';
import { Stack } from '../../../App';
import biidScreen from '../../Screen/biidScreen';
import detailsScreen from '../../Screen/detailScreen';
import { createStackNavigator } from '@react-navigation/stack';

const AdminStack = createStackNavigator();

function AdminStackScreen() {
  return (
    <Stack.Navigator>
      <AdminStack.Screen name="admin1" component={biidScreen} options={{ headerShown: false }} />
      <AdminStack.Screen name="admin2" component={detailsScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default AdminStackScreen;
