import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import UserInfo from '../Profile/userInfo';
import Modal from 'react-native-modal';
import StyleModal from './styleModal';

function BidModal({ userInfo, bid, setModalVisible }) {
  const [styleModalVisible, setStyleModalVisible] = useState(false);
  const [showStyles, setShowStyles] = useState([]);
  const [styleIndex, setStyleIndex] = useState(0);

  const styleModalOpen = async (index, bidStyles) => {
    await setStyleIndex(index);
    await setShowStyles(bidStyles);
    setStyleModalVisible(true);
  };
  return (
    <View style={styles.container}>
      <View style={styles.bidBox}>
        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeBtnArea}>
          <Icon name="md-close" size={25} color="#8D8D8D" />
        </TouchableOpacity>
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
          <UserInfo
            info={userInfo}
            keywords={[bid.large_category, bid.small_category]}
            height={150}
          />
          <View>
            <View style={styles.letterArea}>
              <Text style={styles.letterText}>{bid.letter}</Text>
            </View>
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
                  onPress={() => styleModalOpen(index, bid.bidStyles)}>
                  <Image style={styles.styleImg} source={{ uri: item.img_src }} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
        <View style={{ marginBottom: 30 }}></View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        isVisible={styleModalVisible}
        style={{
          alignItems: 'center',
        }}
        backdropOpacity={0.3}>
        <StyleModal
          styleScraps={showStyles}
          index={styleIndex}
          setModalVisible={setStyleModalVisible}
          userInfo={userInfo}
          deleteIcon={false}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '80%',
    backgroundColor: 'white',
    borderColor: '#e2e2e2',
    borderRadius: 20,
    shadowColor: 'rgb(17, 17, 17)',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 15,
  },
  bidBox: {
    width: '100%',
    height: '100%',
  },
  closeBtnArea: {
    margin: 15,
    marginBottom: 5,
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

export default BidModal;
