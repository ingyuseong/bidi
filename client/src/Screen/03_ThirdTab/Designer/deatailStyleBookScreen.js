import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';

import Modal from 'react-native-modal';
import Swiper from 'react-native-swiper';

import Icon from 'react-native-vector-icons/AntDesign';
import StyleAPI from '../../../Api/style';
import { deleteStyle } from '../../../Contexts/Style/';
import { convertDate, priceFormating } from '../../../Lib/utils';

function DetailStyleBookScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const { styleItem } = route.params;
  const [toggle, setToggle] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const editHandler = () => {
    navigation.push('EditStyleBook', { styleItem });
  };
  const modalHandler = () => {
    setModalVisible(true);
  };
  const deleteStyleHandler = () => {
    setModalVisible(false);
    const response = StyleAPI.deleteStyle(styleItem.id);
    if (response) {
      dispatch(deleteStyle(styleItem.id));
      navigation.push('BrandingMain', { styleItem, screen: 'StyleBook' });
    }
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.styleListBox}>
          <Swiper
            style={styles.wrapper}
            showsButtons={true}
            showsPagination={false}
            loop={false}
            nextButton={<Icon name="right" size={30} color="white"></Icon>}
            prevButton={<Icon name="left" size={30} color="white"></Icon>}>
            {/* {[styleItem.front_img_src, styleItem.side_img_src, styleItem.back_img_src].length > 0 &&
              [styleItem.front_img_src, styleItem.side_img_src, styleItem.back_img_src].map(
                (item, index) => {
                  if (item) {
                    <View style={styles.styleContainer} key={index}>
                      <Image
                        style={styles.styleImg}
                        source={{
                          uri: item,
                        }}
                      />
                    </View>;
                  }
                },
              )} */}
          </Swiper>
        </View>
        <View style={styles.contentBox}>
          <View style={styles.headerBox}>
            <View style={styles.titleArea}>
              <Text style={styles.titleText}>{styleItem.title}</Text>
            </View>
            <View style={styles.dateArea}>
              <Text style={styles.dateText}>{convertDate(styleItem.created_at)}</Text>
            </View>
          </View>
          <View style={styles.descriptionArea}>
            <Text style={styles.descriptionText} numberOfLines={toggle ? 10 : 3}>
              {styleItem.description}
            </Text>
            {!toggle && (
              <TouchableOpacity style={styles.moreDescriptionArea} onPress={() => setToggle(true)}>
                <Icon name="down" size={20} color="gray" />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.priceArea}>
            <Text style={styles.priceText}>가격</Text>
            <Text style={styles.priceText}>{priceFormating(styleItem.price)}원</Text>
          </View>
          <View style={styles.bottomBox}>
            <TouchableOpacity onPress={editHandler}>
              <View style={styles.changeArea}>
                <Icon name="form" size={20} color="gray" style={styles.changeIcon} />
                <Text style={styles.changeText}>수정하기</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={modalHandler}>
              <View style={styles.changeArea}>
                <Icon name="delete" size={20} color="gray" style={styles.changeIcon} />
                <Text style={styles.changeText}>삭제하기</Text>
              </View>
            </TouchableOpacity>
          </View>
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
            onPress={deleteStyleHandler}>
            <Text style={styles.modalDeleteText}>스타일북 삭제</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalBox} onPress={() => setModalVisible(false)}>
            <Text style={styles.modalCancelText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  styleListBox: {
    height: 400,
  },
  styleImg: {
    resizeMode: 'cover',
    width: '100%',
    height: 400,
  },
  contentBox: {
    margin: 16,
  },
  headerBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  titleArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    color: '#111111',
    fontWeight: 'bold',
    fontSize: 22,
    lineHeight: 25,
  },
  dateText: {
    color: '#878787',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
  },
  descriptionArea: {
    marginTop: 32,
  },
  descriptionText: {
    color: '#878787',
    fontSize: 14,
    lineHeight: 21,
  },
  moreDescriptionArea: {
    alignItems: 'center',
    marginTop: 16,
  },
  priceArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
    alignItems: 'center',
  },
  priceText: {
    color: '#111111',
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 25,
  },
  bottomBox: {
    marginTop: 32,
    marginBottom: 32,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  changeArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    color: '#8D8D8D',
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: -0.5,
    fontWeight: '500',
  },
  changeIcon: {
    marginRight: 4,
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

export default DetailStyleBookScreen;
