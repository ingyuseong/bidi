import React, { useState } from 'react';
import { CommonActions } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { convertDate } from '../../Lib/utils';
import BottomButton from './bottomButton';

function ItemCard({ info, screen, navigation }) {
  const keywords = info.proposal ? info.proposal.keywords : info.keywords;
  const img_src = info.proposal ? info.proposal.after_src : info.user.img_src;
  const distance_limit = info.proposal ? info.proposal.distance_limit : info.distance;
  const description = info.letter ? info.letter : info.description;

  // status : wait, process, done, cancel, default
  const status = info.status ? info.status : 'default';
  const leftBtnText = screen === 'branding' ? '더보기' : '취소됨';
  const rightBtnText = screen === 'branding' ? '대표 등록' : '시술 완료';

  const moreBtnHandler = () => {
    navigation.replace('detailBid', { info });
  };
  const deleteBtnHandler = () => {};
  const cancelAlert = (id) => {
    Alert.alert('정말 취소하시겠습니까?', '취소후에는 변경이 불가능합니다', [
      { text: '취소', style: 'cancel' },
      {
        text: '취소하기',
        onPress: () => {
          statusSubmitHandler(id, 'cancel');
        },
      },
    ]);
  };
  const doneAlert = (id) => {
    Alert.alert('시술이 완료되었습니까?', '완료후에는 변경이 불가능합니다', [
      { text: '취소', style: 'cancel' },
      {
        text: '완료하기',
        onPress: () => {
          statusSubmitHandler(id, 'done');
        },
      },
    ]);
  };

  const statusSubmitHandler = async (id, status) => {
    await fetch('http://127.0.0.1:3000' + `/api/bid/status/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        status,
      }),
    })
      .then((response) => response.json())
      .then(async (response) => {
        if (response) {
          Alert.alert('Bid 상태가 성공적으로 수정되었습니다!');
          navigation.dispatch(CommonActions.navigate('ProcessBidList'));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.bidContainer}>
      <View style={styles.bidBox}>
        <View style={styles.bidHeaderArea}>
          <View style={styles.dateView}>
            <Text style={styles.dateText}>{convertDate(info.created_at)}</Text>
          </View>
          {screen === 'branding' ? (
            <TouchableOpacity style={styles.moreBtn} onPress={deleteBtnHandler}>
              <Ionicons name="ellipsis-vertical" size={15} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.moreBtn} onPress={moreBtnHandler}>
              <Text style={styles.moreBtnText}>더보기</Text>
              <Ionicons name="chevron-forward" size={15} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.bidContentArea}>
          <View style={styles.bidProfileArea}>
            <Image source={{ uri: img_src }} style={styles.bidProfileImg} />
          </View>
          <View style={styles.bidInfoArea}>
            <View style={styles.nameArea}>
              <Text style={styles.nameText}>{info.user.name}</Text>
            </View>
            <View style={styles.locationArea}>
              <View style={styles.locationView}>
                <Text style={styles.locationText}>@ {info.user.address}</Text>
              </View>
              <View style={styles.locationView}>
                <Ionicons name="location-outline" size={15} />
                <Text style={styles.locationText}>{distance_limit}</Text>
              </View>
            </View>
            <View style={styles.tagArea}>
              {keywords.length > 0 &&
                keywords.split(',').map((keyword, index) => (
                  <View style={styles.tagView} key={index}>
                    <Text style={styles.tagText}># {keyword}</Text>
                  </View>
                ))}
            </View>
            <View style={styles.descriptionArea}>
              <Text style={styles.descriptionText} numberOfLines={2}>
                {description}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {status !== 'wait' && (
        <BottomButton
          info={info}
          navigation={navigation}
          btnDisable={status === 'cancel' || status == 'done' ? true : false}
          leftBtnText={leftBtnText}
          leftBtnHandler={() => {
            screen === 'branding' ? console.log('hi') : cancelAlert(info.id);
          }}
          rightBtnText={rightBtnText}
          rightBtnHandler={() => {
            screen === 'branding' ? console.log('hi') : doneAlert(info.id);
          }}
          status={status}
        />
      )}

      <View style={styles.line}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  bidBox: {
    flex: 1,
    padding: 16,
    paddingBottom: 0,
  },
  bidHeaderArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bidContentArea: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 16,
  },
  dateText: {
    color: '#878787',
    fontSize: 14,
    lineHeight: 17,
  },
  moreBtn: {
    flexDirection: 'row',
  },
  moreBtnText: {
    color: '#0A0A32',
    fontSize: 14,
    lineHeight: 17,
  },
  bidProfileArea: {
    marginRight: 16,
  },
  bidProfileImg: {
    width: 110,
    height: 110,
    resizeMode: 'cover',
  },
  nameArea: {
    marginBottom: 8,
  },
  nameText: {
    color: '#111111',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 19,
  },
  locationArea: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  locationView: {
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: '#111111',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14,
  },
  tagArea: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagView: {
    backgroundColor: '#EEEEEE',
    padding: 5,
    borderRadius: 3,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: '#8D8D8D',
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: -0.5,
    fontWeight: '400',
  },
  descriptionArea: {
    width: '80%',
  },
  descriptionText: {
    color: '#111111',
    fontSize: 10.5,
    lineHeight: 16,
  },

  line: {
    height: 10,
    backgroundColor: '#f4f4f4',
  },
});

export default ItemCard;
