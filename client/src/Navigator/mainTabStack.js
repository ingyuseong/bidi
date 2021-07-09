import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ViidTabScreen from './Tab/viidTabScreen';
import SearchTabScreen from './Tab/searchTabScreen';
import MessageTabScreen from './Tab/messageTabScreen';
import AdminTabScreen from './Tab/AdminTabScreen';

const Tab = createBottomTabNavigator();

function mainTabStack() {
  return (
    <Tab.Navigator initialRouteName="Viid">
      <Tab.Screen name="Viid" component={ViidTabScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Search" component={SearchTabScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Message" component={MessageTabScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Admin" component={AdminTabScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export default mainTabStack;
