import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { getBidListByDesignerId } from '../../../Contexts/Bid';

import Loading from '../../../Components/Common/loading';
import NoProcessBidList from './noProcessBidList';
import WaitBidListScreen from './waitBidListScreen';
import NoWaitBidListScreen from './noWaitBidListScreen';
import ProcessBidListScreen from './processBidListScreen';
const Tab = createMaterialTopTabNavigator();
import { StyleSheet, View, Text } from 'react-native';

function BidMainScreen({ navigation }) {
  const dispatch = useDispatch();
  const {
    data: userInfo,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.user);
  const {
    data: bidList,
    loading: bidLoading,
    error: bidError,
  } = useSelector((state) => state.bid) || {
    data: [],
    loading: false,
    error: null,
  };

  useEffect(() => {
    dispatch(getBidListByDesignerId(userInfo.id));
  }, [dispatch]);

  if (bidLoading || userLoading || bidError || userError) return <Loading loading />;
  if (!bidList) return null;

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
      {bidList.length === 0 ? (
        <Tab.Screen
          name="NoWaitBidList"
          options={{ title: '대기 중' }}
          component={NoWaitBidListScreen}
        />
      ) : (
        <Tab.Screen name="WaitBidList" options={{ title: '대기 중' }}>
          {() => (
            <WaitBidListScreen navigation={navigation} bidList={bidList} userInfo={userInfo} />
          )}
        </Tab.Screen>
      )}
      {bidList.length === 0 ? (
        <Tab.Screen
          name="NoProcessBidList"
          options={{ title: '대기 중' }}
          component={NoProcessBidList}
        />
      ) : (
        <Tab.Screen name="ProcessBidList" options={{ title: '매칭 중' }}>
          {() => (
            <ProcessBidListScreen navigation={navigation} bidList={bidList} userInfo={userInfo} />
          )}
        </Tab.Screen>
      )}
    </Tab.Navigator>
  );
}

export default BidMainScreen;
