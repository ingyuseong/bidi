import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';

import MatchingHistoryCard from '../../../Components/MatchingHistory/MatchingHistoryCard';

function ReviewListScreen({ matchingHistoryList }) {
  return (
    <ScrollView style={styles.container}>
      {matchingHistoryList.map((history, index) => (
        <View key={index}>
          <MatchingHistoryCard history={history} />
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

export default ReviewListScreen;
