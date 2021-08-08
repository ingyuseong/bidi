import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import UserInfo from '../../../Components/Profile/userInfo';
import Icon from 'react-native-vector-icons/AntDesign';
import BottomButton from '../../../Components/Common/bottomButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Swiper from 'react-native-swiper';

function BidListScreen({ userInfo, bidList }) {
  const [moreToggle, setMoreToggle] = useState(false);

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
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
              <UserInfo
                info={bid.user}
                keywords={[bid.large_category, bid.small_category]}
                height={150}
              />
              <View>
                {moreToggle ? (
                  <View style={{ ...styles.letterArea, height: 160 }}>
                    <Text style={styles.letterText}>{textLimiting(bid.letter, 150)}</Text>
                    <View style={styles.moreBtnArea}>
                      <TouchableOpacity onPress={() => setMoreToggle(!moreToggle)}>
                        <View style={styles.moreBtn}>
                          <Text style={styles.moreBtnText}>더보기</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View style={styles.letterArea}>
                    <Text style={styles.letterText}>{bid.letter}</Text>
                    <View style={{ ...styles.moreBtnArea, alignItems: 'center' }}>
                      <TouchableOpacity onPress={() => setMoreToggle(!moreToggle)}>
                        <View style={{ ...styles.moreBtn, borderWidth: 0 }}>
                          <Icon name="up" size={17} color="#8D8D8D"></Icon>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
              <View style={styles.styleListContainer}>
                <Text style={styles.titleText}>추천 스타일</Text>
                <ScrollView
                  horizontal={true}
                  style={styles.styleArea}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}>
                  {bid.bidStyles.map((item, index) => (
                    <View key={index}>
                      <Image style={styles.styleImg} source={{ uri: item.img_src_one }} />
                    </View>
                  ))}
                </ScrollView>
              </View>
            </ScrollView>
            <BottomButton
              leftName="거절하기"
              rightName="수락하기"
              leftRatio={50}
              leftHandler={() => alert('refuse')}
              rightHandler={() => alert('accept')}
            />
            <View style={{ marginBottom: 70 }}></View>
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
    height: '93%',
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
  },
  letterText: {
    lineHeight: 25,
  },
  styleListContainer: {
    margin: 15,
    height: 120,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  styleArea: {
    height: 90,
    flexDirection: 'row',
    marginTop: 10,
  },
  styleImg: {
    width: 80,
    height: 80,
    resizeMode: 'center',
    marginRight: 10,
  },
  moreBtnArea: {
    marginTop: 5,
    alignItems: 'flex-end',
  },
  moreBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DBDBDB',
    width: 50,
    height: 25,
  },
  moreBtnText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#8D8D8D',
  },
});

export default BidListScreen;
