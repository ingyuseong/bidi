import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BiidTabScreen from './Tab/biidTabScreen';
import SearchTabScreen from './Tab/searchTabScreen';
import HistoryTabScreen from './Tab/historyTabScreen';
import MyPageTabScreen from './Tab/myPageTabScreen';
import ProposalTabScreen from './Tab/proposalTabScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function mainTabStack() {
  return (
    <Tab.Navigator
      initialRouteName="Viid"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === 'Search') {
            iconName = 'search-outline';
          } else if (route.name === 'Biid') {
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
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        tabStyle: {
          backgroundColor: 'white',
          height: 70,
          borderTopWidth: 0.2,
          borderTopColor: 'gray',
        },
      }}
      >
      <Tab.Screen
        name="Search"
        component={SearchTabScreen}
        options={{ headerShown: false, title: '' }}
      />
      <Tab.Screen
        name="Biid"
        component={BiidTabScreen}
        options={{ headerShown: false, title: '' }}
      />
      <Tab.Screen
        name="Proposal"
        component={ProposalTabScreen}
        options={{ headerShown: false, title: '' , tabBarVisible: false}}
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

export default mainTabStack;
