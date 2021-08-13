import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import ItemCard from '../../../Components/ListItem/itemCard';

function WaitBidListScreen({ navigation, bidList }) {
  const [waitBidList, setWaitBidList] = useState([]);
  useEffect(() => {
    const newBidList = bidList.filter((bid) => bid.status === 'wait');
    setWaitBidList([...newBidList]);
  }, []);
  return (
    <ScrollView style={styles.container}>
      {waitBidList.map((bid, index) => (
        <ItemCard key={index} info={bid} navigation={navigation} screen="bid" />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WaitBidListScreen;
