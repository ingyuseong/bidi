import React, { useState } from 'react';
import { CommonActions } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { convertDate } from '../../Lib/utils';
import BottomButton from './bottomButton';
import Modal from 'react-native-modal';

function ItemCard({ info, screen, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  const keywords = info.proposal ? info.proposal.keywords : info.keywords;
  const img_src = info.proposal ? info.proposal.after_src : info.user.img_src;
  const distance_limit = info.proposal ? info.proposal.distance_limit : info.position;
  const address = info.address ? info.address : info.user.address;
  const title = info.proposal ? info.user.name : info.title;
  const description = info.letter ? info.letter : info.description;

  // status : wait, process, done, cancel, default
  const status = info.status ? info.status : 'default';
  const leftBtnText = screen === 'branding' ? '더보기' : '취소됨';
  const rightBtnText = screen === 'branding' ? '대표 등록' : '시술 완료';

  const moreBtnHandler = () => {
    navigation.replace('detailBid', { info });
  };
  const deleteBtnHandler = () => {
    setModalVisible(true);
  };
  const deleteAlert = (id) => {
    Alert.alert('정말 삭제하시겠습니까?', '삭제후에는 변경이 불가능합니다', [
      { text: '취소', style: 'cancel' },
      {
        text: '삭제하기',
        onPress: () => {
          deleteSubmitHandler(id);
        },
      },
    ]);
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
  const doneAlert = (bid) => {
    Alert.alert('시술이 완료되었습니까?', '완료후에는 변경이 불가능합니다', [
      { text: '취소', style: 'cancel' },
      {
        text: '완료하기',
        onPress: () => {
          matchingHistoryHandler(bid);
        },
      },
    ]);
  };
  const moveToDetailBranding = (info) => {
    navigation.navigate('DetailBranding', { info });
  };
  const registerAlert = (id) => {
    Alert.alert('대표 포트폴리오로 등록하시겠습니까?', '', [
      { text: '취소', style: 'cancel' },
      {
        text: '등록하기',
        onPress: () => {
          registerSubmitHandler(id);
        },
      },
    ]);
  };

  const deleteSubmitHandler = async (id) => {
    await fetch('http://127.0.0.1:3000' + `/api/branding/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        main: 1,
      }),
    })
      .then((response) => response.json())
      .then(async (response) => {
        if (response) {
          Alert.alert('삭제되었습니다!');
          setModalVisible(false);
          navigation.push('BrandingMain');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const registerSubmitHandler = async (id) => {
    await fetch('http://127.0.0.1:3000' + `/api/branding/main`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        id: id,
        user_id: info.user_id,
      }),
    })
      .then((response) => response.json())
      .then(async (response) => {
        if (response) {
          Alert.alert('대표 포트폴리오 설정되었습니다!');
          navigation.push('BrandingMain');
        }
      })
      .catch((error) => {
        console.error(error);
      });
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
  const matchingHistoryHandler = async (bid) => {
    const { id, customer_id, designer_id, proposal_id } = bid;
    await fetch('http://127.0.0.1:3000' + `/api/matchingHistory/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        bid_id: id,
        customer_id,
        designer_id,
        proposal_id,
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
              <Text style={styles.nameText}>{title}</Text>
            </View>
            <View style={styles.locationArea}>
              <View style={styles.locationView}>
                <Ionicons name="at" size={15} />
                <Text style={styles.locationText}>{address}</Text>
              </View>
              <View style={styles.locationView}>
                <Ionicons name={screen === 'branding' ? 'md-cut-outline' : 'location'} size={15} />
                <Text style={styles.locationText}>{distance_limit}</Text>
              </View>
            </View>
            <View style={styles.tagArea}>
              {keywords &&
                keywords.length > 0 &&
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
            screen === 'branding' ? moveToDetailBranding(info) : cancelAlert(info.id);
          }}
          rightBtnText={rightBtnText}
          rightBtnHandler={() => {
            screen === 'branding' ? registerAlert(info.id) : doneAlert(info);
          }}
          status={status}
        />
      )}

      <View style={styles.line}></View>
      <Modal
        animationType="slide"
        transparent={true}
        isVisible={modalVisible}
        style={{
          alignItems: 'center',
        }}
        backdropOpacity={0.3}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={{ ...styles.modalBox, borderBottomWidth: 1, borderBottomColor: '#DDDDDD' }}
            onPress={() => deleteAlert(info.id)}>
            <Text style={styles.modalDeleteText}>포트폴리오 삭제</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalBox} onPress={() => setModalVisible(false)}>
            <Text style={styles.modalCancelText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
    alignItems: 'center',
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
    marginLeft: 2,
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
  modalContainer: {
    width: '100%',
    height: '15%',
    backgroundColor: 'white',
    borderColor: '#e2e2e2',
    borderRadius: 10,
    shadowColor: 'rgb(17, 17, 17)',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalDeleteText: {
    color: '#FF533A',
    fontSize: 16,
    lineHeight: 20,
  },
  modalCancelText: {
    color: '#111111',
    fontSize: 16,
    lineHeight: 20,
  },
  bidInfoArea: {
    flex: 1,
  },
});

export default ItemCard;
