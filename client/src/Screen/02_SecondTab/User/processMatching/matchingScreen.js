import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import UserInfo from '../../../../Components/Profile/userInfo';
import Icon from 'react-native-vector-icons/AntDesign';
import BottomButton from '../../../../Components/Common/bottomButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Swiper from 'react-native-swiper';
import Modal from 'react-native-modal';
import StyleModal from '../../../../Components/Modal/styleModal';

function BidProgressScreen({ navigation, matching }) {
  const [moreToggle, setMoreToggle] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showStyles, setShowStyles] = useState([]);
  const [styleIndex, setStyleIndex] = useState(0);
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
              <UserInfo
                info={bid.user}
                keywords={[bid.large_category, bid.small_category]}
                height={150}
              />
              <View>
                {moreToggle ? (
                  <View style={styles.letterArea}>
                    <Text style={styles.letterText}>{bid.letter}</Text>
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
                  </View>
                ) : (
                  <View style={{ ...styles.letterArea, height: 80 }}>
                    <View style={styles.bidProposalBtnArea}>
                      <TouchableOpacity onPress={() => navigation.navigate('MyBid')}>
                        <View style={styles.bidProposalBtn}>
                          <Text style={styles.moreBtnText}>제안서 보기</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setMoreToggle(!moreToggle)}>
                        <View style={{ ...styles.bidProposalBtn, borderColor: '#FF533A' }}>
                          <Text style={{ ...styles.moreBtnText, color: '#FF533A' }}>비드 보기</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            </ScrollView>
            {/* <View style={{ marginBottom: 10 }}></View> */}
            {moreToggle ? (
              <View style={styles.moreBtnArea}>
                <TouchableOpacity onPress={() => setMoreToggle(!moreToggle)}>
                  <View style={styles.moreBtn}>
                    <Icon name="up" size={25} color="#FF533A"></Icon>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <></>
            )}
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
    maxHeight: '93%',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 3,
    backgroundColor: 'white',
    borderColor: 'rgba(0,0,0,0.1)',
  },
  letterArea: {
    margin: 15,
    marginTop: 0,
    marginBottom: 0,
  },
  letterText: {
    width: '100%',
    lineHeight: 25,
  },
  styleListContainer: {
    marginTop: 25,
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
    alignItems: 'center',
  },
  moreBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    borderRadius: 3,
    borderColor: '#DBDBDB',
    height: 50,
  },
  moreBtnText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#8D8D8D',
  },
  bidProposalBtnArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    width: '100%',
  },
  bidProposalBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#DBDBDB',
    height: 50,
    width: 150,
  },
});

export default BidProgressScreen;
