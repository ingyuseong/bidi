import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import ItemHeader from '../../../Components/ListItem/itemHeader';
import ItemContent from '../../../Components/ListItem/itemContent';
import Line from '../../../Components/Common/line';

function WaitBidListScreen({ navigation, bidList }) {
  const [waitBidList, setWaitBidList] = useState([]);
  useEffect(() => {
    const newBidList = bidList.filter((bid) => bid.status === 'wait');
    setWaitBidList([...newBidList]);
  }, []);
  return (
    <ScrollView style={styles.container}>
      {waitBidList.map((bid, index) => (
        <View style={styles.bidContainer} key={index}>
          <ItemHeader
            info={bid}
            screen="bid"
            clickHandler={() => {
              navigation.navigate('DetailBid', { bid });
            }}
          />
          <ItemContent info={bid} navigation={navigation} screen="bid" />
          <Line />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bidContainer: {},
});

export default WaitBidListScreen;
