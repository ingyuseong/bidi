import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BidListScreen from './bidListScreen';
import MyProposalScreen from './myProposalScreen';

import BidiStorage from '../../../Lib/storage';
import { STORAGE_KEY } from '../../../Lib/constant';

const Tab = createMaterialTopTabNavigator();

function BidMainScreen({ navigation }) {
  const [userInfo, setUserInfo] = useState({});
  const [proposal, setProposal] = useState();
  const getProposalInfo = async (user) => {
    await fetch('http://127.0.0.1:3000' + `/api/proposal/user/${user.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.data) {
          setProposal({
            ...result.data,
            keywords: result.data.keywords.split(','),
          });
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
      getProposalInfo(user);
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
      {proposal ? (
        <Tab.Screen name="MyBid" options={{ title: '내 제안서' }}>
          {() => (
            <MyProposalScreen navigation={navigation} proposal={proposal} userInfo={userInfo} />
          )}
        </Tab.Screen>
      ) : (
        <Tab.Screen name="MyBid" options={{ title: '내 제안서' }}>
          {() => <Text>아직 제안서 x</Text>}
        </Tab.Screen>
      )}
      {proposal ? (
        <Tab.Screen name="ReceiveBid" options={{ title: '받은 비드' }} component={BidListScreen} />
      ) : (
        <Tab.Screen name="ReceiveBid" options={{ title: '받은 비드' }}>
          {() => <Text></Text>}
        </Tab.Screen>
      )}
    </Tab.Navigator>
  );
}

export default BidMainScreen;