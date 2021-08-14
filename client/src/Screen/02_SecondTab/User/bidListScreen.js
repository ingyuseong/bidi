import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';

import UserInfo from '../../../Components/Profile/userInfo';
import Icon from 'react-native-vector-icons/AntDesign';
import BottomButton from '../../../Components/Common/bottomButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Swiper from 'react-native-swiper';
import Modal from 'react-native-modal';
import StyleModal from '../../../Components/Modal/styleModal';

function BidListScreen({ navigation, userInfo, bidList, progress }) {
  const [moreToggle, setMoreToggle] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showStyles, setShowStyles] = useState([]);
  const [styleIndex, setStyleIndex] = useState(0);

  const refuseBidAlert = async (bidId) => {
    Alert.alert('정말 거절하시겠어요?', '거절한 비드는 다시 표시되지 않습니다!', [
      { text: '취소', style: 'cancel' },
      { text: '거절하기', onPress: () => refuseBid(bidId) },
    ]);
  };
  const refuseBid = async (bidId) => {
    await fetch('http://127.0.0.1:3000' + `/api/bid/status/${bidId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        status: 'cancel',
      }),
    })
      .then(() => {
        navigation.replace('bid');
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const progressBidAlert = async (bidId) => {
    Alert.alert('정말 수락하시겠어요?', '수락하지 않은 나머지 비드는 다시 표시되지 않습니다!', [
      { text: '취소', style: 'cancel' },
      { text: '수락하기', onPress: () => progressBid(bidId) },
    ]);
  };
  const progressBid = async (bidId) => {
    await fetch('http://127.0.0.1:3000' + `/api/bid/status/${bidId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        status: 'process',
      }),
    })
      .then(() => {
        navigation.replace('bid');
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const textLimiting = (description, count) => {
    if (description.length > count) {
      return description.substr(0, count) + '..';
    } else {
      return description;
    }
  };
  const modalOpen = async (index, bidStyles) => {
    await setStyleIndex(index);
    await setShowStyles(bidStyles);
    setModalVisible(true);
  };
  return (
    <Swiper style={styles.wrapper} loop={false} showsButtons={false} showsPagination={false}>
      {bidList &&
        bidList.map((bid, index) => (
          <View style={styles.container} key={index}>
            <View style={styles.bidBox}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                <UserInfo
                  info={bid.user}
                  keywords={[bid.large_category, bid.small_category]}
                  height={150}
                />
                <View>
                  {moreToggle ? (
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
                  ) : (
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
                      <TouchableOpacity
                        key={index}
                        activeOpacity={0.8}
                        style={styles.imageAfter}
                        onPress={() => modalOpen(index, bid.bidStyles)}>
                        <Image style={styles.styleImg} source={{ uri: item.img_src }} />
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </ScrollView>
              <BottomButton
                leftName="거절하기"
                rightName="수락하기"
                leftRatio={50}
                leftHandler={() => refuseBidAlert(bid.id)}
                rightHandler={() => progressBidAlert(bid.id)}
              />
              <View style={{ marginBottom: 70 }}></View>
            </View>
            <Modal
              animationType="fade"
              transparent={true}
              isVisible={modalVisible}
              style={{
                alignItems: 'center',
              }}
              backdropOpacity={0.3}>
              <StyleModal
                styleScraps={showStyles}
                index={styleIndex}
                setModalVisible={setModalVisible}
                setStyleScrapList={bid.bidStyles}
                userInfo={userInfo}
                navigation={navigation}
                deleteIcon={false}
              />
            </Modal>
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
