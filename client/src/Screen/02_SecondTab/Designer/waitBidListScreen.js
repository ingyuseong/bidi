import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';

import Line from '../../../Components/Common/line';
import ItemHeader from '../../../Components/ListItem/itemHeader';
import ItemContent from '../../../Components/ListItem/itemContent';

function WaitBidListScreen({ navigation, bidList }) {
  return (
    <ScrollView style={styles.container}>
      {bidList &&
        bidList.length > 0 &&
        bidList.map((bid, index) => (
          <View style={styles.bidContainer} key={index}>
            <ItemHeader
              info={bid}
              screen="bid"
              clickHandler={() => {
                navigation.navigate('DetailBid', { info: bid, screen: 'bid' });
              }}
            />
            <ItemContent info={bid} screen="bid" navigation={navigation} />
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
