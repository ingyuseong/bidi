import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  TouchableHighlight,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';

function StyleModal({ styleScraps, index, setModalVisible, userInfo, navigation, deleteIcon }) {
  const deleteStyleScrap = async (style_id) => {
    await fetch('http://127.0.0.1:3000' + `/api/styleScrap/${userInfo.id}/${style_id}`, {
      method: 'DELETE',
    })
      .then(() => {
        Alert.alert('삭제 되었습니다!');
        navigation.replace('MainTab', { screen: 'History' });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const deleteStyleScrapAlert = (style_id) => {
    Alert.alert('스크랩을 지우시겠어요?', '내 스크랩에서 사라집니다!', [
      { text: '취소', style: 'cancel' },
      {
        text: '삭제하기',
        onPress: () => {
          deleteStyleScrap(style_id);
          setModalVisible(false);
        },
      },
    ]);
  };
  const priceFormating = (price) =>
    new Intl.NumberFormat('ko-KR', { currency: 'KRW' }).format(price);
  const dateFormating = (date) => {
    const update = new Date(date);
    return `${update.getFullYear()}.${
      update.getMonth('mm') < 10 ? '0' + update.getMonth('mm') : update.getMonth('mm')
    }.${update.getDate('dd') < 10 ? '0' + update.getDate('dd') : update.getDate('dd')}`;
  };
  return (
    <View style={styles.container}>
      {styleScraps ? (
        <View
          style={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          vertical={true}
          automaticallyAdjustContentInsets={true}>
          <View style={{ height: '55%' }}>
            <Swiper
              showsButtons={true}
              showsPagination={false}
              loop={false}
              nextButton={<Icon name="right" size={30} color="white"></Icon>}
              prevButton={<Icon name="left" size={30} color="white"></Icon>}>
              <View style={styles.styleBox}>
                <Image
                  style={styles.styleImg}
                  source={{
                    uri: styleScraps[index].img_src,
                  }}
                />
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.closeBtnArea}>
                  <Ionicons name="md-close" size={25} color="#8D8D8D" />
                </TouchableOpacity>
                {deleteIcon ? (
                  <View style={styles.styleScrapIcon}>
                    <TouchableOpacity onPress={() => deleteStyleScrapAlert(styleScraps[index].id)}>
                      <Icon name="heart" color="#FF533A" size={25} />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <></>
                )}
              </View>
            </Swiper>
          </View>
          <View style={styles.contentBox}>
            <View style={styles.infoArea}>
              <Text style={styles.titleText}>{styleScraps[index].title}</Text>
              <Text style={styles.update}>{dateFormating(styleScraps[index].updated_at)}</Text>
            </View>
            <View style={styles.tagArea}>
              <View style={styles.tag}>
                <Text style={{ color: '#8D8D8D' }}># 카테고리 1</Text>
              </View>
              <View style={styles.tag}>
                <Text style={{ color: '#8D8D8D' }}># 카테고리 2</Text>
              </View>
            </View>
            <View style={styles.subtitleArea}>
              <Text style={styles.subtitleText}>{styleScraps[index].subtitle}</Text>
            </View>
            <View style={styles.priceArea}>
              <Text style={styles.priceText}>가격</Text>
              <Text style={styles.priceText}>{priceFormating(styleScraps[index].price)} 원</Text>
            </View>
          </View>
          {deleteIcon ? (
            <TouchableOpacity onPress={() => deleteStyleScrapAlert()} style={styles.deleteArea}>
              <Ionicons name="md-trash-outline" size={20} color="#8D8D8D" />
              <Text style={styles.deleteText}> 삭제하기</Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
      ) : (
        <View></View>
      )}
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
  contentContainer: { flex: 1 },
  wrapper: { height: '55%' },
  styleImg: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  closeBtnArea: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
  styleScrapIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  contentBox: {
    marginTop: 10,
  },
  infoArea: {
    margin: 15,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  update: {
    fontSize: 12,
    color: '#878787',
  },
  tagArea: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 15,
    marginTop: 0,
  },
  tag: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#EEEEEE',
    borderRadius: 2,
    marginTop: 10,
    marginRight: 10,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagText: {
    color: '#323274',
    fontWeight: '500',
    lineHeight: 16,
    letterSpacing: -0.5,
    fontSize: 13,
  },
  subtitleArea: {
    margin: 15,
    marginTop: 5,
  },
  subtitleText: {
    color: '#8D8D8D',
  },
  priceArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 15,
  },
  priceText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  deleteArea: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 15,
  },
  deleteText: {
    color: '#8D8D8D',
    fontSize: 13,
    fontWeight: '500',
  },
});

export default StyleModal;
