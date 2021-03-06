import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';

import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Loading from '../../../Components/Common/loading';
import StyleModal from '../../../Components/Bid/styleModal';
import { getStyleListByDesignerId } from '../../../Contexts/Designer/Style';

function styleListScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const { styleMenuList, setStyleMenuList, nextTo } = route.params;
  const { data: userInfo } = useSelector((state) => state.user);
  const { data: styleList, loading, error } = useSelector((state) => state.designerStyle);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [checkStyleList, setCheckStyleList] = useState(styleMenuList);
  useEffect(() => {
    dispatch(getStyleListByDesignerId(userInfo.id));
  }, [dispatch]);

  const detailStyleHandler = (index) => {
    setModalVisible(true);
    setModalIndex(index);
  };

  const checkHandler = (styleItem) => {
    setCheckStyleList([...checkStyleList, styleItem]);
  };
  const checkedHandler = (styleItem) => {
    const filteredList = checkStyleList.filter((style) => {
      return style.id !== styleItem.id;
    });
    setCheckStyleList(filteredList);
  };

  const addHandler = () => {
    setStyleMenuList(checkStyleList);
    navigation.navigate(nextTo);
  };

  if (loading || error || !styleList) {
    return <Loading />;
  }
  if (!styleList.length) {
    return (
      <View>
        <Text>hi</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.styleBox}>
          {styleList.map((styleItem, index) => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.styleItem}
              key={index}
              onPress={() => detailStyleHandler(index)}>
              <Image
                style={styles.styleImg}
                source={{
                  uri: styleItem.front_img_src,
                }}
              />
              {checkStyleList.some((checkedStyle) => checkedStyle.id == styleItem.id) ? (
                <TouchableOpacity
                  style={styles.checkedIconArea}
                  onPress={() => checkedHandler(styleItem)}>
                  <AntDesign name="check" size={25} style={styles.checkIcon} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.checkIconArea}
                  onPress={() => checkHandler(styleItem)}>
                  <AntDesign name="check" size={25} style={styles.checkIcon} />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        isVisible={modalVisible}
        style={{
          alignItems: 'center',
        }}
        backdropOpacity={0.3}>
        <StyleModal
          styleList={styleList}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          navigation={navigation}
          index={modalIndex}
        />
      </Modal>
      <TouchableOpacity style={styles.bottomBtnArea} onPress={addHandler}>
        <Text style={styles.bottomBtnText}>????????????</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  styleBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 2,
  },
  styleItem: {
    width: '50%',
    height: 200,
    resizeMode: 'center',
    padding: 2,
  },
  styleImg: {
    width: '100%',
    height: 196,
  },
  addBtn: {
    position: 'absolute',
    width: 65,
    height: 65,
    backgroundColor: '#0A0A32',
    borderRadius: 50,
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000', //????????????
    shadowOpacity: 0.3, //????????? ?????????
    shadowOffset: { width: 2, height: 2 }, //????????? ??????
  },
  addIcon: {
    color: 'white',
  },
  checkIconArea: {
    position: 'absolute',
    right: 8,
    top: 8,
    backgroundColor: 'gray',
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedIconArea: {
    position: 'absolute',
    right: 8,
    top: 8,
    backgroundColor: '#0A0A32',
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  bottomBtnArea: {
    backgroundColor: '#0A0A32',
    width: '100%',
    height: 60,
    position: 'absolute',
    bottom: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBtnText: {
    color: 'white',
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: -0.5,
  },
});

export default styleListScreen;
