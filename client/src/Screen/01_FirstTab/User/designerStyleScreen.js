import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BidiStorage from '../../../Lib/storage';
import { STORAGE_KEY } from '../../../Lib/constant';

import Modal from 'react-native-modal';
import StyleModal from '../../../Components/Modal/styleModal';

function DesignerStyleScreen({ navigation, info }) {
  const [userInfo, setUserInfo] = useState({});
  const [styleScraps, setStyleScraps] = useState([]);
  const [moreToggle, setMoreToggle] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [styleIndex, setStyleIndex] = useState(0);

  const getStyleScrapList = async (user) => {
    await fetch('http://127.0.0.1:3000' + `/api/styleScrap/${user.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then(async (result) => {
        await setStyleScraps(
          result.data.map((style) => {
            return { id: style.id, isScraped: true };
          }),
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const registerStyleScrap = async (style_id) => {
    await fetch('http://127.0.0.1:3000' + `/api/styleScrap/${userInfo.id}/${style_id}`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((result) => {
        setStyleScraps([
          ...styleScraps,
          {
            id: result.data.styleId,
            isScraped: true,
          },
        ]);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const deleteStyleScrap = async (style_id) => {
    await fetch('http://127.0.0.1:3000' + `/api/styleScrap/${userInfo.id}/${style_id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        setStyleScraps(
          styleScraps.map((item) => {
            if (item.id == style_id) {
              return {
                ...item,
                isScraped: false,
              };
            } else return item;
          }),
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const modalOpen = (index) => {
    setModalVisible(true);
    setStyleIndex(index);
  };
  const priceFormating = (price) =>
    new Intl.NumberFormat('ko-KR', { currency: 'KRW' }).format(price);
  const textLimiting = (description) => {
    if (description.length > 32) {
      return description.substr(0, 32) + '..';
    } else {
      return description;
    }
  };
  useEffect(() => {
    async function fetchMode() {
      const user = await BidiStorage.getData(STORAGE_KEY);
      setUserInfo(user);
      getStyleScrapList(user);
    }
    fetchMode();
  }, []);
  return (
    <View style={{ marginLeft: 20, marginRight: 20 }}>
      <View style={styles.titleContainer}>
        <View style={styles.flex}>
          <Text style={styles.hasStyle}>이 디자이너의 스타일</Text>
          <Text style={[styles.hasStyle, styles.countStyle]}>{info.styles.length}</Text>
        </View>
        <View style={styles.genderContainer}>
          <View style={styles.gender}>
            <Text style={{ color: '#8D8D8D' }}>여성</Text>
          </View>
          <View style={{ ...styles.gender, borderLeftWidth: 0 }}>
            <Text style={{ color: '#8D8D8D' }}>남성</Text>
          </View>
        </View>
      </View>
      <View style={styles.styleContainer}>
        {info.styles.map((item, index) => (
          <View style={{ width: '48%' }} key={index}>
            {moreToggle || index < 4 ? (
              <View style={{ width: '100%', height: 300 }}>
                <View style={{ width: '100%' }}>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => modalOpen(index)}>
                    <Image
                      style={styles.styleImg}
                      source={{
                        uri: item.img_src,
                      }}
                    />
                  </TouchableOpacity>
                  <View style={styles.styleScrapIcon}>
                    {styleScraps.some((style) => (style.id == item.id) & style.isScraped) ? (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => deleteStyleScrap(item.id)}>
                        <Icon name="heart" color="#FF533A" size={20} />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={() => registerStyleScrap(item.id)}>
                        <Icon name="heart-o" color="white" size={20} />
                      </TouchableOpacity>
                    )}
                  </View>
                  {index < 3 ? (
                    <View style={styles.rankLabel}>
                      <Text style={styles.rankLabelText}>{index + 1}위</Text>
                    </View>
                  ) : (
                    <View></View>
                  )}
                </View>
                <TouchableOpacity activeOpacity={0.8} onPress={() => modalOpen(index)}>
                  <View>
                    <Text style={styles.styleTitle}>{item.title}</Text>
                  </View>
                  <View style={styles.styleDescription}>
                    <Text style={styles.styleDescriptionText}>{textLimiting(item.subtitle)}</Text>
                  </View>
                  <View>
                    <Text style={styles.stylePrice}>{priceFormating(item.price)}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View></View>
            )}
          </View>
        ))}
      </View>
      {moreToggle ? (
        <TouchableOpacity onPress={() => setMoreToggle(!moreToggle)}>
          <View style={styles.moreBtn}>
            <Text style={styles.moreBtnText}>대표 스타일만 보기</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => setMoreToggle(!moreToggle)}>
          <View style={styles.moreBtn}>
            <Text style={styles.moreBtnText}>스타일 더보기</Text>
          </View>
        </TouchableOpacity>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        isVisible={modalVisible}
        style={{
          alignItems: 'center',
        }}
        backdropOpacity={0.3}>
        <StyleModal
          styleScraps={info.styles}
          index={styleIndex}
          setModalVisible={setModalVisible}
          setStyleScrapList={setStyleScraps}
          userInfo={userInfo}
          navigation={navigation}
          deleteIcon={false}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 30,
  },
  flex: {
    flexDirection: 'row',
  },
  hasStyle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
  },
  countStyle: {
    marginLeft: 10,
    color: '#FF3F00',
  },
  genderContainer: {
    flexDirection: 'row',
  },
  gender: {
    borderWidth: 1,
    borderColor: '#DBDBDB',
    marginTop: 5,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  styleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  styleItem: {
    width: '48%',
    height: 300,
  },
  styleImg: {
    width: '100%',
    height: 170,
  },
  styleScrapIcon: {
    position: 'absolute',
    top: 8,
    right: 10,
  },
  styleTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
  },
  styleDescription: {
    height: 40,
    overflow: 'hidden',
  },
  stylePrice: {
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
  },
  rankLabel: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 30,
    height: 30,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankLabelText: {
    fontSize: 13,
    color: 'white',
    fontWeight: 'bold',
  },
  moreBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DBDBDB',
    width: '95%',
    height: 40,
    marginBottom: 40,
  },
  moreBtnText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8D8D8D',
  },
});

export default DesignerStyleScreen;
