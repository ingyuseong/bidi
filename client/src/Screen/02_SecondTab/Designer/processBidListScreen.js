import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import BidListItem from '../../../Components/Bid/bidListItem';

function ProcessBidListScreen({ navigation, bidList }) {
  const [waitBidList, setWaitBidList] = useState([]);
  useEffect(() => {
    const newBidList = bidList.filter(
      (bid) => bid.status === 'process' || bid.status === 'done' || bid.status === 'cancel',
    );
    setWaitBidList([...newBidList]);
  }, []);
  return (
    <ScrollView style={styles.container}>
      {waitBidList.map((bid, index) => (
        <BidListItem key={index} info={bid} navigation={navigation} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProcessBidListScreen;
