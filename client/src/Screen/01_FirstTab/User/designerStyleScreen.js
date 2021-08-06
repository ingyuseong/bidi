import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BidiStorage from '../../../Lib/storage';
import { STORAGE_KEY } from '../../../Lib/constant';

function DesignerStyleScreen({ info }) {
  const [userInfo, setUserInfo] = useState({});
  const [styleScraps, setStyleScraps] = useState([]);
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
  useEffect(() => {
    async function fetchMode() {
      const user = await BidiStorage.getData(STORAGE_KEY);
      setUserInfo(user);
      getStyleScrapList(user);
    }
    fetchMode();
  }, []);
  return (
    <>
      <View style={styles.titleContainer}>
        <View style={styles.flex}>
          <Text style={styles.hasStyle}>이 디자이너의 스타일</Text>
          <Text style={[styles.hasStyle, styles.countStyle]}>{info.styles.length}</Text>
        </View>
        <View style={styles.genderContainer}>
          <View style={styles.gender}>
            <Text>남성</Text>
          </View>
          <View style={styles.gender}>
            <Text>여성</Text>
          </View>
        </View>
      </View>
      <View style={styles.styleContainer}>
        {info.styles.map((item, index) => (
          <View style={styles.styleItem} key={index}>
            <View>
              <Image
                style={styles.styleImg}
                source={{
                  uri: item.img_src_one,
                }}
              />
              <View style={styles.styleScrapIcon}>
                {styleScraps.some((style) => (style.id == item.id) & style.isScraped) ? (
                  <TouchableOpacity onPress={() => deleteStyleScrap(item.id)}>
                    <Icon name="heart" color="#FF533A" size={20} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => registerStyleScrap(item.id)}>
                    <Icon name="heart-o" color="#FF533A" size={20} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View>
              <Text style={styles.styleTitle}>{item.title}</Text>
            </View>
            <View style={styles.styleDescription}>
              <Text>{item.subtitle}</Text>
            </View>
            <View>
              <Text style={styles.stylePrice}>{item.price}</Text>
            </View>
          </View>
        ))}
      </View>
    </>
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
    borderColor: '#e2e2e2',
    padding: 10,
  },
  styleImg: {
    width: '100%',
    height: 150,
    resizeMode: 'center',
  },
  styleScrapIcon: {
    position: 'absolute',
    top: 10,
    right: 5,
  },
  styleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  styleItem: {
    width: '45%',
    height: 300,
  },
  styleTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
  },
  stylePrice: {
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default DesignerStyleScreen;
