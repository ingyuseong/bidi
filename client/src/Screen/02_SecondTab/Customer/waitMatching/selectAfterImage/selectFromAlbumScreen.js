import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

function SelectAfterImageScreen({ navigation, route }) {
  const { setAlbumImage, setIsFromAlbum } = route.params;

  const handleChoosePhoto = () => {
    launchImageLibrary({ nodata: true }, (response) => {
      if (response.didCancel) {
        Alert.alert('프로필 이미지는 꼭 선택해주세요!');
      } else {
        setAlbumImage(response.assets[0]);
        setIsFromAlbum(true);
        navigation.navigate('CreateProposal');
      }
    });
  };

  const goBack = async (e) => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.cancelBox}>
        <TouchableOpacity activeOpacity={0.8} onPress={goBack}>
          <Ionicons name="close-outline" size={40} />
        </TouchableOpacity>
        <Text style={styles.header}>AFTER</Text>
      </View>
      <View style={styles.content}>
        <Image
          style={styles.image}
          source={require('../../../../../../public/img/afterImage.png')}
        />
      </View>
      <View style={styles.selectBox}>
        <View style={{ margin: 20, marginBottom: 0 }}>
          <Text style={styles.title}>앨범에서 After 헤어사진을</Text>
          <Text style={styles.title}>선택해주세요!</Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.keywordTextNormal}>👉 원하는 스타일이 담긴 사진을 선택해주세요</Text>
          <Text style={styles.keywordTextNormal}>🕶 정면에서 촬영한 사진이어야 해요!</Text>
        </View>
      </View>
      <View style={styles.backButtonBox}>
        <TouchableOpacity activeOpacity={0.8} onPress={handleChoosePhoto}>
          <Text style={styles.backButton}>
            <Ionicons name="camera-outline" size={17} /> 선택하기
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  cancelBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingTop: 0,
  },
  header: {
    fontSize: 23,
    fontWeight: '700',
  },
  content: {
    width: '100%',
  },
  image: {
    width: '100%',
    height: '90%',
  },
  selectBox: {
    alignContent: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '45%',
    borderRadius: 30,
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    marginBottom: 6,
  },
  backButtonBox: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    backgroundColor: '#FF533A',
  },
  backButton: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
    width: '50%',
  },
  keywordTextNormal: {
    marginLeft: 15,
    fontSize: 15,
    padding: 5,
  },
});

export default SelectAfterImageScreen;
