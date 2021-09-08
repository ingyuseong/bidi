import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Screens
import MyProposalScreen from './TabScreen/myProposalScreen';
import BidListScreen from './TabScreen/bidListScreen';

const Tab = createMaterialTopTabNavigator();
function WaitMainScreen({ navigation }) {
  return (
    <Tab.Navigator
      swipeEnabled={false}
      initialRouteName="MyProposal"
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
      <Tab.Screen name="MyProposal" options={{ title: '내 제안서' }} component={MyProposalScreen} />
      <Tab.Screen name="ReceiveBid" options={{ title: '받은 비드' }} component={BidListScreen} />
    </Tab.Navigator>
  );
}

export default WaitMainScreen;
