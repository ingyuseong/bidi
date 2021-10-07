import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';

import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BrandingAPI from '../../Api/branding';
import ItemBottomBtn from './itemBottomBtn';
import { deleteBranding, patchBranding } from '../../Contexts/Designer/Branding';

function MainItemCard({ info, navigation }) {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const moveToDetailBranding = (info) => {
    navigation.navigate('DetailBranding', { info });
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
  const deleteSubmitHandler = async (id) => {
    const response = await BrandingAPI.deleteBranding(id);
    if (response) {
      dispatch(deleteBranding);
      Alert.alert('삭제되었습니다!');
      setModalVisible(false);
      navigation.push('BrandingMain');
    }
  };
  const cancelAlert = (id) => {
    Alert.alert('대표 등록을 취소하시겠습니까?', '', [
      { text: '취소', style: 'cancel' },
      {
        text: '등록 취소하기',
        onPress: () => {
          statusSubmitHandler(id);
        },
      },
    ]);
  };
  const statusSubmitHandler = async (id) => {
    const response = await BrandingAPI.patchBranding(id, { main: false });
    if (response) {
      dispatch(patchBranding(id, { main: false }));
      Alert.alert('대표 포트폴리오 설정이 취소되었습니다!');
      setModalVisible(false);
      navigation.push('BrandingMain');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.contentBox}>
          <View style={styles.profileArea}>
            <Image source={{ uri: info.user.img_src }} style={styles.profileImg} />
          </View>
          <View style={styles.infoArea}>
            <View style={styles.nameArea}>
              <Text style={styles.nameText}>{info.title}</Text>
            </View>
            <View style={styles.locationArea}>
              <View style={styles.locationView}>
                <Ionicons name="at" size={15} />
                <Text style={styles.locationText}>{info.shop_name}</Text>
              </View>
              <View style={styles.locationView}>
                <Ionicons name="md-cut-outline" size={15} />
                <Text style={styles.locationText}>{info.position}</Text>
              </View>
            </View>
            <View style={styles.tagArea}>
              {info.keyword_array.length > 0 &&
                info.keyword_array.map((keyword, index) => (
                  <View style={styles.tagView} key={index}>
                    <Text style={styles.tagText}># {keyword}</Text>
                  </View>
                ))}
            </View>
            <View style={styles.descriptionArea}>
              <Text style={styles.descriptionText} numberOfLines={2}>
                {info.description}
              </Text>
            </View>
            <TouchableOpacity style={styles.deleteIconArea} onPress={deleteBtnHandler}>
              <Ionicons name="ellipsis-vertical" size={15} />
            </TouchableOpacity>
          </View>
        </View>
        <ItemBottomBtn
          info={info}
          leftBtnText="더보기"
          leftBtnHandler={() => {
            moveToDetailBranding(info);
          }}
          rightBtnText="대표 취소"
          rightBtnHandler={() => {
            cancelAlert(info.id);
          }}
          isMain={true}
        />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F4F4F4',
  },
  mainContainer: {
    backgroundColor: '#fff',
  },
  contentBox: {
    flexDirection: 'row',
    padding: 14,
    alignItems: 'center',
  },
  bidHeaderArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  profileArea: {
    marginRight: 16,
  },
  profileImg: {
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
  deleteIconArea: {
    position: 'absolute',
    right: 0,
  },
  infoArea: {
    flex: 1,
  },
});

export default MainItemCard;
