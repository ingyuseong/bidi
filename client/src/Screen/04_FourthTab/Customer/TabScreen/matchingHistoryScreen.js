import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';

// Screen
import NoHistoryScreen from './noHistoryScreen';

// Components
import MatchingHistoryCard from '../../../../Components/MatchingHistory/MatchingHistoryCard';
import Loading from '../../../../Components/Common/loading';

// Redux Action
import { getMatchingHistoryListByCustomerId } from '../../../../Contexts/Customer/MatchingHistory/action';

function MatchingHistoryScreen() {
  const { data: user } = useSelector((state) => state.user);
  const {
    data: matchingHistoryList,
    loading,
    error,
  } = useSelector((state) => state.customerMatchingHistory);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMatchingHistoryListByCustomerId(user.id));
  }, [dispatch]);
  if (loading || error || !matchingHistoryList) return <Loading />;
  return (
    <>
      {matchingHistoryList && matchingHistoryList.length > 0 ? (
        <ScrollView style={styles.container}>
          {matchingHistoryList.map((history, index) => (
            <View key={index}>
              <MatchingHistoryCard
                index={index}
                matchingHistoryList={matchingHistoryList}
                isUser={true}
              />
              <View style={styles.line}></View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <NoHistoryScreen />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  line: {
    height: 10,
    backgroundColor: '#f4f4f4',
  },
});

export default MatchingHistoryScreen;
