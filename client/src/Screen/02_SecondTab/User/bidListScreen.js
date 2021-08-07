import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import UserInfo from '../../../Components/User/userInfo';
import RecommendStyle from '../../../Components/Card/recommendStyle';
import BottomButton from '../../../Components/Common/bottomButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Swiper from 'react-native-swiper';

function BidListScreen({ userInfo, bidList }) {
  const textLimiting = (description, count) => {
    if (description.length > count) {
      return description.substr(0, count) + '..';
    } else {
      return description;
    }
  };
  return (
    <Swiper style={styles.wrapper} loop={false} showsButtons={false} showsPagination={false}>
      {bidList.map((bid, index) => (
        <View style={styles.container} key={index}>
          <View style={styles.bidBox}>
            <UserInfo
              info={bid.user}
              keywords={[bid.large_category, bid.small_category]}
              height={150}
            />
            <View style={styles.letterArea}>
              <Text style={styles.letterText}>{textLimiting(bid.letter, 150)}</Text>
            </View>
            <RecommendStyle bidStyles={bid.bidStyles} />
            <BottomButton
              leftName="거절하기"
              rightName="수락하기"
              leftRatio={50}
              leftHandler={() => alert('refuse')}
              rightHandler={() => alert('accept')}
            />
          </View>
        </View>
      ))}
    </Swiper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
  },
  bidBox: {
    marginTop: 20,
    width: '90%',
    height: '92%',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 20,
    backgroundColor: 'white',
    borderColor: 'rgba(0,0,0,0.1)',
  },
  letterArea: {
    margin: 15,
    height: 160,
  },
  letterText: {
    lineHeight: 25,
  },
});

export default BidListScreen;
