import React, { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import WaitBidListScreen from './waitBidListScreen';
import ProcessBidListScreen from './processBidListScreen';
const Tab = createMaterialTopTabNavigator();

function BidMainScreen({ navigation }) {
  return (
    <Tab.Navigator
      swipeEnabled={false}
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: '#DADADA',
        indicatorStyle: {
          backgroundColor: 'black',
        },
        labelStyle: {
          fontSize: 17,
          fontWeight: 'bold',
        },
        tabStyle: {
          height: 50,
          borderColor: 'black',
        },
      }}>
      <Tab.Screen name="WaitBidList" options={{ title: '대기 중' }} component={WaitBidListScreen} />
      <Tab.Screen
        name="ProcessBidList"
        options={{ title: '매창 중' }}
        component={ProcessBidListScreen}
      />
    </Tab.Navigator>
  );
}

export default BidMainScreen;
