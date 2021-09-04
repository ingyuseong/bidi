import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Screens
import MyProposalScreen from './myProposalScreen';
import BidListScreen from './bidListScreen';
import IntroProposalScreen from './staticScreen/introProposalScreen';
import NoBidScreen from './staticScreen/noBidScreen';

// Components & utils
import { objectNullChecking, listNullChecking } from '../../../../Lib/utils';
import Loading from '../../../../Components/Common/loading';

// Redux Action
import { getProposalAsync } from '../../../../Contexts/Proposal/action';
import { getBidListByCustomerId } from '../../../../Contexts/Bid/action';

const Tab = createMaterialTopTabNavigator();
function WaitMainScreen({ navigation }) {
  const { data: user } = useSelector((state) => state.user);
  const {
    data: proposal,
    loading: proposalLoading,
    error: proposalError,
  } = useSelector((state) => state.proposal);
  const { data: bidList, loading: bidLoading, error: bidError } = useSelector((state) => state.bid);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProposalAsync(user.id));
    dispatch(getBidListByCustomerId(user.id));
  }, [dispatch]);
  if (proposalLoading || bidLoading || proposalError || bidError) return <Loading loading />;
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
      {proposal && proposal.length > 0 ? (
        <Tab.Screen name="MyBid" options={{ title: '내 제안서' }}>
          {() => <MyProposalScreen navigation={navigation} />}
        </Tab.Screen>
      ) : (
        <Tab.Screen name="MyBid" options={{ title: '내 제안서' }}>
          {() => <IntroProposalScreen navigation={navigation} />}
        </Tab.Screen>
      )}
      {listNullChecking(bidList) ? (
        <Tab.Screen name="ReceiveBid" options={{ title: '받은 비드' }}>
          {() => <BidListScreen navigation={navigation} />}
        </Tab.Screen>
      ) : (
        <Tab.Screen name="ReceiveBid" options={{ title: '받은 비드' }}>
          {() => <NoBidScreen navigation={navigation}></NoBidScreen>}
        </Tab.Screen>
      )}
    </Tab.Navigator>
  );
}

export default WaitMainScreen;
