import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BidListScreen from './bidListScreen';
import MyBidScreen from './myBidScreen';
const Tab = createMaterialTopTabNavigator();

function BidMainScreen() {
  return (
    <Tab.Navigator
      swipeEnabled={false}
      initialRouteName="ReceiveBid"
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
      <Tab.Screen name="MyBid" options={{ title: '내 제안서' }} component={MyBidScreen} />
      <Tab.Screen name="ReceiveBid" options={{ title: '받은 비드' }} component={BidListScreen} />
    </Tab.Navigator>
  );
}

export default BidMainScreen;
