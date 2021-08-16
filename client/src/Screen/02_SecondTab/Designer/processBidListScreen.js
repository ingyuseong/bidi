import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import ItemHeader from '../../../Components/ListItem/itemHeader';
import ItemContent from '../../../Components/ListItem/itemContent';
import ItemBottomBtn from '../../../Components/ListItem/itemBottomBtn';
import Line from '../../../Components/Common/line';

function ProcessBidListScreen({ navigation, bidList }) {
  const [waitBidList, setWaitBidList] = useState([]);
  useEffect(() => {
    const newBidList = bidList.filter((bid) => bid.status === 'process' || bid.status === 'cancel');
    setWaitBidList([...newBidList]);
  }, []);
  return (
    <ScrollView style={styles.container}>
      {waitBidList.map((bid, index) => (
        <View style={styles.bidContainer} key={index}>
          <ItemHeader navigation={navigation} info={bid} screen="bid" />
          <ItemContent navigation={navigation} info={bid} screen="bid" />
          <ItemBottomBtn
            navigation={navigation}
            info={bid}
            leftBtnText="취소됨"
            rightBtnText="대표 등록"
          />
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
});

export default ProcessBidListScreen;
