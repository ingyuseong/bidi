import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BiidListScreen from './biidListScreen';
import MyBiidScreen from './myBiidScreen';
const Tab = createMaterialTopTabNavigator();

function BiidMainScreen() {
  return (
    <Tab.Navigator
      swipeEnabled={false}
      initialRouteName="ReceiveBiid"
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
        labelStyle: {
          fontSize: 17,
          fontWeight: 'bold',
        },
        tabStyle: {
          height: 50,
        },
      }}>
      <Tab.Screen name="MyBiid" options={{ title: '내 제안서' }} component={MyBiidScreen} />
      <Tab.Screen name="ReceiveBiid" options={{ title: '받은 비드' }} component={BiidListScreen} />
    </Tab.Navigator>
  );
}

export default BiidMainScreen;
