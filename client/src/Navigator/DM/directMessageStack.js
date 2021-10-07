import React, { useState, useEffect, createRef, useLayoutEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import DMListScreen from '../../Screen/DM/messageListScreen';
import DMScreen from '../../Screen/DM/directMessageScreen';

const Stack = createStackNavigator();

function DMStack({ navigation, route }) {
  return (
    <Stack.Navigator initialRouteName="MessageList">
      <Stack.Screen
        name="MessageList"
        component={DMListScreen}
        initialParams={{
          users: '',
          messages: '',
        }}
      />
      <Stack.Screen name="DirectMessage" component={DMScreen} />
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultText: {
    textAlign: 'center',
    padding: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
});
export default DMStack;
