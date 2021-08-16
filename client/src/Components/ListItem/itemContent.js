import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Modal from 'react-native-modal';

function ItemContent({ info, screen, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const keywords = info.proposal ? info.proposal.keywords : info.keywords;
  const img_src = info.proposal ? info.proposal.after_src : info.user.img_src;
  const distance_limit = info.proposal ? info.proposal.distance_limit + 'km 이내' : info.position;
  const address = info.address ? info.address : info.user.address;
  const title = info.proposal ? info.user.name : info.title;
  const description = info.letter ? info.letter : info.description;

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

  return (
    <View style={styles.container}>
      <View style={styles.profileBox}>
        <Image source={{ uri: img_src }} style={styles.profileImg} />
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
            <Ionicons
              name={screen === 'branding' ? 'md-cut-outline' : 'location-outline'}
              size={15}
            />
            <Text style={styles.locationText}>{distance_limit}</Text>
          </View>
        </View>
        <View style={styles.tagArea}>
          {keywords &&
            keywords.length > 0 &&
            keywords.map((keyword, index) => (
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
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 0,
    marginBottom: 16,
    alignItems: 'center',
    flexDirection: 'row',
  },

  profileBox: {
    marginRight: 16,
  },
  profileImg: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
  },
  infoBox: {
    flex: 1,
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
    width: '60%',
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
});

export default ItemContent;
