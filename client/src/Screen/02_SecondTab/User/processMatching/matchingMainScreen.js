import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Screens
import MyProposalScreen from './myProposalScreen';
// import BidListScreen from './bidListScreen';
// import IntroProposalScreen from './staticScreen/introProposalScreen';
// import NoBidScreen from './staticScreen/noBidScreen';

// // Components & utils
// import { objectNullChecking, listNullChecking } from '../../../../Lib/utils';
// import Loading from '../../../../Components/Common/loading';

// // Redux Action
// import { getProposalAsync } from '../../../../Contexts/Proposal/action';
// import { getBidListByCustomerId } from '../../../../Contexts/Bid/action';

const Tab = createMaterialTopTabNavigator();
function MatchingMainScreen({ navigation }) {
  const { data: user } = useSelector((state) => state.user);
  const { data: matching } = useSelector((state) => state.matching);
  const dispatch = useDispatch();
  useEffect(() => {}, [dispatch]);
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
      <Tab.Screen name="MyProposal" options={{ title: '내 제안서' }}>
        {() => <MyProposalScreen navigation={navigation} />}
      </Tab.Screen>
      <Tab.Screen name="ReceiveBid" options={{ title: '받은 비드' }}>
        {() => <Text>asdf</Text>}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default MatchingMainScreen;
