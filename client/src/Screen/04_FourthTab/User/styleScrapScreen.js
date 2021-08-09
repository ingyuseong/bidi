import React, { useState, useEffect } from 'react';
import {
  Alert,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  Image,
  RefreshControl,
} from 'react-native';

function StyleScrapIntroScreen({ navigation, styleScraps, userInfo }) {
  const deleteStyleScrapAlert = (style_id) => {
    Alert.alert('스크랩을 지우시겠어요?', '', [
      { text: '취소', style: 'cancel' },
      { text: '삭제하기', onPress: () => deleteStyleScrap(style_id) },
    ]);
  };
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
  return (
    <ScrollView>
      <View style={styles.styleContainer}>
        {styleScraps.map((item, index) => (
          <View style={styles.styleItem} key={index}>
            <View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.imageAfter}
                onPress={() => deleteStyleScrapAlert(item.id)}>
                <Image
                  style={styles.styleImg}
                  source={{
                    uri: item.img_src_one,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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

export default StyleScrapIntroScreen;
