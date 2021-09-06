import React, { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import MatchingHistoryScreen from './TabScreen/matchingHistoryScreen';
import StyleScrapScreen from './TabScreen/styleScrapScreen';

const Tab = createMaterialTopTabNavigator();

function HistoryMainScreen({ navigation }) {
  return (
    <Tab.Navigator
      swipeEnabled={false}
      initialRouteName="MatchingHistory"
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
      <Tab.Screen name="MatchingHistory" options={{ title: '매칭내역' }}>
        {() => <MatchingHistoryScreen />}
      </Tab.Screen>
      <Tab.Screen name="MyScrap" options={{ title: '내 스크랩' }}>
        {() => <StyleScrapScreen navigation={navigation} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default HistoryMainScreen;
