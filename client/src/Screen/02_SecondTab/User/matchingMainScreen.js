import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Screens
import BidListScreen from './bidListScreen';
import BidProgressScreen from './bidProgressScreen';
import MyProposalScreen from './myProposalScreen';
import NoBidScreen from './noBidScreen';

// Components
import Loading from '../../../Components/Common/loading';

// API
import ProposalAPI from '../../../Api/proposal';

// Redux Action
import { getProposal } from '../../../Contexts/Proposal/action';
import { getBidListByCustomerId } from '../../../Contexts/Bid/action';

const Tab = createMaterialTopTabNavigator();

function MatchingMainScreen({ navigation }) {
  const [progress, setProgress] = useState(false);
  const { data: user } = useSelector((state) => state.user);
  const {
    data: proposal,
    loading: proposalLoading,
    error: proposalError,
  } = useSelector((state) => state.proposal);
  const { data: bidList, loading: bidLoading, error: bidError } = useSelector((state) => state.bid);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchMode() {
      const proposal = await ProposalAPI.getProposalByUserId(user.id);
      if (proposal && Object.keys(proposal).length !== 0) {
        await dispatch(getProposal(proposal));
      }
      await dispatch(getBidListByCustomerId(user.id));
    }
    fetchMode();
  }, [dispatch]);
  if (proposalLoading || bidLoading || proposalError || bidError) {
    return <Loading loading />;
  }
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
            <MyProposalScreen
              navigation={navigation}
              proposal={proposal}
              userInfo={user}
              progress={progress}
            />
          )}
        </Tab.Screen>
      ) : (
        <Tab.Screen name="MyBid" options={{ title: '내 제안서' }}>
          {() => <Text>아직 제안서 x</Text>}
        </Tab.Screen>
      )}
      {bidList && bidList.length > 0 ? (
        <Tab.Screen
          name="ReceiveBid"
          options={progress ? { title: '진행중인 매칭' } : { title: '받은 비드' }}>
          {progress
            ? () => <BidProgressScreen userInfo={user} bidList={bidList} navigation={navigation} />
            : () => <BidListScreen userInfo={user} bidList={bidList} navigation={navigation} />}
        </Tab.Screen>
      ) : (
        <Tab.Screen name="ReceiveBid" options={{ title: '받은 비드' }}>
          {() => <NoBidScreen navigation={navigation}></NoBidScreen>}
        </Tab.Screen>
      )}
    </Tab.Navigator>
  );
}

export default MatchingMainScreen;
