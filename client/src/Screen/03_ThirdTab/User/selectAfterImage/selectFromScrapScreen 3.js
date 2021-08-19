import React, { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, View, StyleSheet, Button, TouchableOpacity, Image, ScrollView } from 'react-native';

function SelectFromScrapScreen({ navigation, route }) {
  const { setAfterImageStyle, userInfo } = route.params;
  const [styleScraps, setStyleScraps] = useState([]);
  const goBack = async (e) => {
    navigation.goBack();
  };
  const submit = async (img_src) => {
    setAfterImageStyle(img_src);
    navigation.navigate('CreateProposal');
  };
  const getStyleScrapList = async () => {
    await fetch('http://127.0.0.1:3000' + `/api/styleScrap/${userInfo.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then(async (result) => {
        await setStyleScraps(result.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getStyleScrapList();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.selectBox}>
        <TouchableOpacity activeOpacity={0.8} onPress={goBack}>
          <Ionicons name="close-outline" size={40} />
        </TouchableOpacity>
        <Text style={styles.header}>AFTER</Text>
      </View>
      <ScrollView>
        <View style={styles.styleContainer}>
          {styleScraps &&
            styleScraps.map((item, index) => (
              <View style={styles.styleItem} key={index}>
                <View>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.imageAfter}
                    onPress={() => submit(item.img_src)}>
                    <Image
                      style={styles.styleImg}
                      source={{
                        uri: item.img_src,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  selectBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingTop: 0,
  },
  header: {
    fontSize: 23,
    fontWeight: '700',
  },
  styleContainer: {
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
});

export default SelectFromScrapScreen;
