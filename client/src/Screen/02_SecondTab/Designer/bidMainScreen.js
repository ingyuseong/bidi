import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import WaitBidListScreen from './waitBidListScreen';
import ProcessBidListScreen from './processBidListScreen';
import NoWaitBidListScreen from './noWaitBidListScreen';
import NoProcessBidList from './noProcessBidList';
import BidiStorage from '../../../Lib/storage';
import { STORAGE_KEY } from '../../../Lib/constant';

const Tab = createMaterialTopTabNavigator();

function BidMainScreen({ navigation }) {
  const [bid, setBid] = useState([]);
  const [loader, setLoader] = useState(true);
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
          setLoader(false);
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

  if (loader) {
    return <ActivityIndicator animating={loader} color="" size="large" style={{ flex: 1 }} />;
  }
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
      {bid.length === 0 ? (
        <Tab.Screen
          name="NoWaitBidList"
          options={{ title: '대기 중' }}
          component={NoWaitBidListScreen}
        />
      ) : (
        <Tab.Screen name="WaitBidList" options={{ title: '대기 중' }}>
          {() => <WaitBidListScreen navigation={navigation} bidList={bid} userInfo={userInfo} />}
        </Tab.Screen>
      )}
      {bid.length === 0 ? (
        <Tab.Screen
          name="NoProcessBidList"
          options={{ title: '대기 중' }}
          component={NoProcessBidList}
        />
      ) : (
        <Tab.Screen name="ProcessBidList" options={{ title: '매칭 중' }}>
          {() => <ProcessBidListScreen navigation={navigation} bidList={bid} userInfo={userInfo} />}
        </Tab.Screen>
      )}
    </Tab.Navigator>
  );
}

export default BidMainScreen;
