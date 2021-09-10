import React, { useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MatchingTabScreen from './Customer/matchingTabScreen';
import SearchTabScreen from './Customer/searchTabScreen';
import HistoryTabScreen from './Customer/historyTabScreen';
import MyPageTabScreen from './Customer/myPageTabScreen';
import ProposalTabScreen from './Customer/proposalTabScreen';

const Tab = createBottomTabNavigator();
function CustomerTabStack() {
  return (
    <Tab.Navigator
      initialRouteName="Search"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === 'Search') {
            iconName = 'search-outline';
          } else if (route.name === 'Bid') {
            iconName = 'document-text-outline';
          } else if (route.name === 'Proposal') {
            iconName = 'add-outline';
          } else if (route.name === 'History') {
            iconName = 'md-timer-outline';
          } else if (route.name === 'Mypage') {
            iconName = 'md-person-circle-outline';
          }

          return <Ionicons name={iconName} size={30} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#FF533A',
        inactiveTintColor: 'gray',
        tabStyle: {
          backgroundColor: 'white',
          height: 70,
          borderTopWidth: 0.2,
          borderTopColor: 'gray',
        },
      }}>
      <Tab.Screen
        name="Search"
        component={SearchTabScreen}
        options={{ headerShown: false, title: '' }}
      />
      <Tab.Screen
        name="Bid"
        component={MatchingTabScreen}
        options={{ headerShown: false, title: '' }}
      />
      <Tab.Screen
        name="Proposal"
        component={ProposalTabScreen}
        options={{ headerShown: false, title: '', tabBarVisible: false }}
      />
      <Tab.Screen
        name="History"
        component={HistoryTabScreen}
        options={{ headerShown: false, title: '' }}
      />
      <Tab.Screen
        name="Mypage"
        component={MyPageTabScreen}
        options={{ headerShown: false, title: '' }}
      />
    </Tab.Navigator>
  );
}

export default CustomerTabStack;
