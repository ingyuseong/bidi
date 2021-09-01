import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';

import HistoryCard from '../../../Components/MatchingHistory/MatchingCard';

function ReviewListScreen({ matchingHistoryList }) {
  return (
    <ScrollView style={styles.container}>
      {matchingHistoryList.map((history, index) => (
        <View key={index}>
          <HistoryCard history={history} />
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
