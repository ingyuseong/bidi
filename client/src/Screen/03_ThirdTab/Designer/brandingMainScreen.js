import React, { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import BrandingListScreen from './brandingListScreen';
import BrandingScreen from './brandingScreen';
import StyleBookListScreen from './styleBookListScreen';

const Tab = createMaterialTopTabNavigator();

function BidMainScreen({ navigation }) {
  return (
    <Tab.Navigator
      swipeEnabled={false}
      initialRouteName="Branding"
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
      <Tab.Screen name="Branding" options={{ title: '포트폴리오' }} component={BrandingScreen} />
      <Tab.Screen
        name="StyleBook"
        options={{ title: '스타일북' }}
        component={StyleBookListScreen}
      />
    </Tab.Navigator>
  );
}

export default BidMainScreen;
