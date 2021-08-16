import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import ItemContent from '../../../Components/ListItem/itemContent';

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
        <ItemContent key={index} info={bid} navigation={navigation} screen="bid" />
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
