import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Screens
import MyProposalScreen from './TabScreen/myProposalScreen';
import BidListScreen from './TabScreen/bidListScreen';
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
    return () => {};
  }, [dispatch]);
  if (proposalLoading || bidLoading || proposalError || bidError) return <Loading />;
  if (!proposal || !bidList) return null;
  return (
    <Tab.Navigator
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
      <Tab.Screen name="MyBid" options={{ title: '내 제안서' }}>
        {() => {
          if (listNullChecking(proposal)) {
            return <MyProposalScreen navigation={navigation} proposal={proposal[0]} />;
          } else {
            return <IntroProposalScreen navigation={navigation} />;
          }
        }}
      </Tab.Screen>
      <Tab.Screen name="ReceiveBid" options={{ title: '받은 비드' }}>
        {() => {
          if (listNullChecking(bidList)) {
            return <BidListScreen navigation={navigation} bidList={bidList} />;
          } else {
            return <NoBidScreen navigation={navigation} />;
          }
        }}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default WaitMainScreen;
