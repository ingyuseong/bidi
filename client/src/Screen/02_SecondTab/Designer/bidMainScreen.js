import React, { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import WaitBidListScreen from './waitBidListScreen';
import ProcessBidListScreen from './processBidListScreen';
import NoBidListScreen from './noBidListScreen';
import BidiStorage from '../../../Lib/storage';
import { STORAGE_KEY } from '../../../Lib/constant';

const Tab = createMaterialTopTabNavigator();

function BidMainScreen({ navigation }) {
  const [bid, setBid] = useState();
  const [userInfo, setUserInfo] = useState();

  const getBidInfo = async (user) => {
    await fetch('http://127.0.0.1:3000' + `/api/bid/user/${user.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.data) {
          setBid([...result.data.bidList]);
        } else {
          navigation.replace('MainTab', { screen: 'Proposal' });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    async function fetchMode() {
      const user = await BidiStorage.getData(STORAGE_KEY);
      setUserInfo(user);
      getBidInfo(user);
    }
    fetchMode();
  }, []);
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
      {bid ? (
        <Tab.Screen name="WaitBidList" options={{ title: '대기 중' }}>
          {() => <WaitBidListScreen navigation={navigation} bidList={bid} userInfo={userInfo} />}
        </Tab.Screen>
      ) : (
        <Tab.Screen
          name="NoWaitBidList"
          options={{ title: '대기 중' }}
          component={NoBidListScreen}
        />
      )}
      {bid ? (
        <Tab.Screen name="ProcessBidList" options={{ title: '매칭 중' }}>
          {() => <ProcessBidListScreen navigation={navigation} bidList={bid} userInfo={userInfo} />}
        </Tab.Screen>
      ) : (
        <Tab.Screen
          name="NoProcessBidList"
          options={{ title: '대기 중' }}
          component={NoBidListScreen}
        />
      )}
    </Tab.Navigator>
  );
}

export default BidMainScreen;
