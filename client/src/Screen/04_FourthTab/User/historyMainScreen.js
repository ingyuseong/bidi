import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import StyleScrapIntroScreen from './introStyleScrapScreen';
import StyleScrapScreen from './styleScrapScreen';

import BidiStorage from '../../../Lib/storage';
import { STORAGE_KEY } from '../../../Lib/constant';

const Tab = createMaterialTopTabNavigator();

function HistoryMainScreen({ navigation }) {
  const [userInfo, setUserInfo] = useState({});
  const [styleScraps, setStyleScraps] = useState([]);
  const getStyleScrapList = async (user) => {
    await fetch('http://127.0.0.1:3000' + `/api/styleScrap/${user.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then(async (result) => {
        await setStyleScraps(result.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    async function fetchMode() {
      const user = await BidiStorage.getData(STORAGE_KEY);
      setUserInfo(user);
      getStyleScrapList(user);
    }
    fetchMode();
  }, []);

  return (
    <Tab.Navigator
      swipeEnabled={false}
      initialRouteName="MyScrap"
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
      <Tab.Screen name="MyScrap" options={{ title: '내 스크랩' }}>
        {() =>
          styleScraps ? (
            <StyleScrapScreen
              styleScraps={styleScraps}
              userInfo={userInfo}
              navigation={navigation}
            />
          ) : (
            <StyleScrapIntroScreen />
          )
        }
      </Tab.Screen>
      <Tab.Screen name="MatchingHistory" options={{ title: '매칭내역' }}>
        {() => <Text></Text>}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default HistoryMainScreen;
