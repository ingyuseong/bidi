import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';

// Components
import HistoryCard from '../../../Components/MatchingHistory/MatchingCard';
import Loading from '../../../Components/Common/loading';

// Redux Action
import { getMatchingListByCustomerId } from '../../../Contexts/Matching/action';

function MatchingHistoryScreen() {
  const { data: user } = useSelector((state) => state.user);
  const { data: matchingList, loading, error } = useSelector((state) => state.matching);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMatchingListByCustomerId(user.id));
  }, [dispatch]);
  if (loading || error) return <Loading loading />;
  if (!matchingList) return null;
  return (
    <ScrollView style={styles.container}>
      {matchingList.map((matching, index) => (
        <View key={index}>
          <HistoryCard matching={matching} />
          <View style={styles.line}></View>
        </View>
      ))}
    </ScrollView>
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
