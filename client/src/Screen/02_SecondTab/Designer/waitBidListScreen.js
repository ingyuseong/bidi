import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';

import { getBidListByDesignerId } from '../../../Contexts/Designer/Bid';

import NoProcessBidList from './noProcessBidList';
import Line from '../../../Components/Common/line';
import Loading from '../../../Components/Common/loading';
import ItemHeader from '../../../Components/ListItem/itemHeader';
import ItemContent from '../../../Components/ListItem/itemContent';

function WaitBidListScreen({ navigation }) {
  const dispatch = useDispatch();
  const { data: userInfo } = useSelector((state) => state.user);
  const {
    data: bidList,
    loading: bidLoading,
    error: bidError,
  } = useSelector((state) => state.designerBid);

  useEffect(() => {
    dispatch(getBidListByDesignerId(userInfo.id));
  }, [dispatch]);
  if (bidLoading || bidError || !bidList) return <Loading />;

  if (!bidList.length) {
    return <NoProcessBidList navigation={navigation} />;
  }
  return (
    <ScrollView style={styles.container}>
      {bidList.map((bid, index) => (
        <View style={styles.bidContainer} key={index}>
          <ItemHeader
            info={bid}
            screen="bid"
            clickHandler={() => {
              navigation.push('DetailBid', { info: bid, screen: 'bid' });
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
