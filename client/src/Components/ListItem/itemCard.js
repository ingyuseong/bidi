import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { convertDate } from '../../Lib/utils';

function ItemCard({ info, navigation }) {
  const moreBtnHandler = () => {
    navigation.replace('detailBid', { info });
  };
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
          navigation.replace('MainTab', {
            screen: 'Bid',
            params: {
              screen: 'ProcessBidList',
              params: {
                info,
              },
            },
          });
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
          <TouchableOpacity style={styles.moreBtn} onPress={moreBtnHandler}>
            <Text style={styles.moreBtnText}>더보기</Text>
            <Ionicons name="chevron-forward" size={15} />
          </TouchableOpacity>
        </View>
        <View style={styles.bidContentArea}>
          <View style={styles.bidProfileArea}>
            <Image source={{ uri: info.proposal.after_src }} style={styles.bidProfileImg} />
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
                <Text style={styles.locationText}>{info.proposal.distance_limit}</Text>
              </View>
            </View>
            <View style={styles.tagArea}>
              {info?.proposal?.keywords.length > 0 &&
                info.proposal.keywords.split(',').map((keyword, index) => (
                  <View style={styles.tagView} key={index}>
                    <Text style={styles.tagText}># {keyword}</Text>
                  </View>
                ))}
            </View>
            <View style={styles.descriptionArea}>
              <Text style={styles.descriptionText} numberOfLines={2}>
                {info.letter}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {info.status !== 'wait' && (
        <View style={styles.processBox}>
          <TouchableOpacity
            style={[styles.processArea, info.status === 'cancel' && styles.cancelBtn]}
            onPress={() => {
              cancelAlert(info.id);
            }}>
            <Text style={[styles.processAreaText, info.status === 'cancel' && styles.cancelBtn]}>
              취소됨
            </Text>
          </TouchableOpacity>
          {info.status === 'cancel' && (
            <TouchableOpacity style={[styles.processArea]}>
              <Text style={styles.processAreaText}>시술 완료</Text>
            </TouchableOpacity>
          )}
          {info.status === 'process' && (
            <TouchableOpacity
              style={[styles.processArea, styles.processBtn]}
              onPress={() => doneAlert(info.id)}>
              <Text>시술 진행중</Text>
            </TouchableOpacity>
          )}
          {info.status === 'done' && (
            <TouchableOpacity style={[styles.processArea, styles.doneBtn]}>
              <Text style={styles.doneBtn}>시술 완료</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <View style={styles.line}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  bidBox: {
    flex: 1,
    padding: 16,
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
  processBox: {
    flexDirection: 'row',
    margin: 16,
    marginTop: 0,
    justifyContent: 'space-between',
  },
  processArea: {
    width: '49%',
    height: 36,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  processAreaText: {
    color: '#8D8D8D',
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: -0.5,
  },
  processBtnText: {},
  processBtn: {
    borderColor: '#0A0A32',
  },
  cancelBtn: {
    backgroundColor: '#0A0A32',
    borderColor: '#0A0A32',
    color: '#FFFFFF',
  },
  doneBtn: {
    backgroundColor: '#0A0A32',
    borderColor: '#0A0A32',
    color: '#FFFFFF',
  },
});

export default ItemCard;
