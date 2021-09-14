import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { getMatchingHistoryListByDesignerId } from '../../../Contexts/Designer/MatchingHistory/action';

import Loading from '../../../Components/Common/loading';
import HistroyListScreen from './histroyListScreen';
import NoHistoryListScreen from './noHistoryListScreen';
import ReviewListScreen from './reviewListScreen';
import NoReviewListScreen from './noReviewListScreen';

const Tab = createMaterialTopTabNavigator();

function HistoryMainScreen({ navigation }) {
  const dispatch = useDispatch();
  const { data: userInfo } = useSelector((state) => state.user);
  const {
    data: matchingHistoryList,
    loading,
    error,
  } = useSelector((state) => state.designerMatchingHistory);

  useEffect(() => {
    dispatch(getMatchingHistoryListByDesignerId(userInfo.id));
  }, [dispatch]);
  if (loading || error || !matchingHistoryList) {
    return <Loading />;
  }

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
      <Tab.Screen name="MatchingHistory" options={{ title: '매칭 내역' }}>
        {() =>
          matchingHistoryList && matchingHistoryList.length > 0 ? (
            <HistroyListScreen matchingHistoryList={matchingHistoryList} navigation={navigation} />
          ) : (
            <NoHistoryListScreen navigation={navigation} />
          )
        }
      </Tab.Screen>
      <Tab.Screen name="Review" options={{ title: `받은 후기 ${matchingHistoryList.length}` }}>
        {() =>
          matchingHistoryList && matchingHistoryList.length > 0 ? (
            <ReviewListScreen matchingHistoryList={matchingHistoryList} navigation={navigation} />
          ) : (
            <NoReviewListScreen navigation={navigation} />
          )
        }
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default HistoryMainScreen;
