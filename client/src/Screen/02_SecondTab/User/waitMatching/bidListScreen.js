import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { textLimiting } from '../../../../Lib/utils';

// Components
import BidUserInfo from '../../../../Components/Bid/bidUserInfo';
import Icon from 'react-native-vector-icons/AntDesign';
import BottomButton from '../../../../Components/Common/bottomButton';
import Swiper from 'react-native-swiper';
import Modal from 'react-native-modal';
import StyleModal from '../../../../Components/Modal/styleModal';

// API
import BidAPI from '../../../../Api/bid';
import matchingAPI from '../../../../Api/matching';

// Redux Action
import { deleteBid, patchBid } from '../../../../Contexts/Bid/action';

function BidListScreen({ navigation, bidList }) {
  const [moreToggle, setMoreToggle] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showStyles, setShowStyles] = useState([]);
  const [styleIndex, setStyleIndex] = useState(0);
  const dispatch = useDispatch();
  const cancelBidAlert = (id) => {
    Alert.alert('정말 거절하시겠어요?', '거절한 비드는 다시 표시되지 않습니다!', [
      { text: '취소', style: 'cancel' },
      { text: '거절하기', onPress: () => cancelBid(id) },
    ]);
  };
  const cancelBid = async (id) => {
    const bid = await BidAPI.patchBidCanceled(id);
    if (bid) {
      Alert.alert('거절되었습니다');
      dispatch(deleteBid(id));
      navigation.replace('check');
    } else {
      Alert.alert('거절에 실패했습니다');
      navigation.replace('check');
    }
  };

  const matchingAlert = (bid) => {
    Alert.alert('정말 수락하시겠어요?', '수락하지 않은 나머지 비드는 다시 표시되지 않습니다!', [
      { text: '취소', style: 'cancel' },
      { text: '수락하기', onPress: () => matching(bid) },
    ]);
  };
  const matching = async (bid) => {
    const body = {
      bid_id: bid.id,
      proposal_id: bid.proposal_id,
      customer_id: bid.customer_id,
      designer_id: bid.designer_id,
      shop_name: '이너프헤어',
      address: '서울특별시 성북구 안암동',
    };
    const matching = await matchingAPI.registerMatching(body);
    if (matching) {
      navigation.replace('check');
    }
  };
  const modalOpen = (index, bidStyles) => {
    setStyleIndex(index);
    setShowStyles(bidStyles);
    setModalVisible(true);
  };
  return (
    <Swiper style={styles.wrapper} loop={false} showsButtons={false} showsPagination={false}>
      {bidList.map((bid, index) => (
        <View style={styles.container} key={index}>
          <View style={styles.bidBox}>
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
              <BidUserInfo bid={bid} height={150} />
              <View>
                {bid.letter.length > 200 ? (
                  moreToggle ? (
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
                    <View style={{ ...styles.letterArea, height: 200 }}>
                      <Text style={styles.letterText}>{textLimiting(bid.letter, 200)}</Text>
                      <View style={styles.moreBtnArea}>
                        <TouchableOpacity onPress={() => setMoreToggle(!moreToggle)}>
                          <View style={styles.moreBtn}>
                            <Text style={styles.moreBtnText}>더보기</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )
                ) : (
                  <View style={styles.letterArea}>
                    <Text style={styles.letterText}>{bid.letter}</Text>
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
                      <Image style={styles.styleImg} source={{ uri: item.img_src_array[0] }} />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </ScrollView>
            <BottomButton
              leftName="거절하기"
              rightName="수락하기"
              leftRatio={50}
              leftHandler={() => cancelBidAlert(bid.id)}
              rightHandler={() => matchingAlert(bid)}
            />
            <View style={{ marginBottom: 70 }}></View>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            isVisible={modalVisible}
            style={{
              alignItems: 'center',
            }}
            backdropOpacity={0.3}>
            <StyleModal
              styleList={showStyles}
              index={styleIndex}
              setModalVisible={setModalVisible}
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
