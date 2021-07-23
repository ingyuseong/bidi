import React, { useState, useEffect } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Button, Text, View, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import BidiStorage from '../Lib/storage';
import { STORAGE_KEY } from '../Lib/constant';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

function MypageScreen({ navigation }) {
  const [userInfo, setUserInfo] = useState('');
  const getUserInfo = async (user) => {
    await fetch('http://127.0.0.1:3000' + `/api/user/${user.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((result) => setUserInfo(result.data))
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(async () => {
    const user = await BidiStorage.getData(STORAGE_KEY);
    getUserInfo(user);
  }, []);
  const logoutHandler = () => {
    BidiStorage.clearData().then(() => {
      navigation.replace('Landing');
    });
  };
  const handleChoosePhoto = () => {
    launchImageLibrary({}, (response) => {
      console.log('>>', response.assets[0].uri);
    });
  };
  if (!userInfo) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading</Text>
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.formArea}>
        <View style={styles.imageArea}>
          {userInfo.img_src ? (
            <Image source={{ uri: userInfo.img_src }} style={styles.profile} />
          ) : (
            <Image source={require('../../public/img/profile.png')} style={styles.profile} />
          )}
        </View>

        <Button title="Choose Photo" onPress={handleChoosePhoto} />

        <View style={styles.inputForm}>
          <Text style={styles.inputLabel}>고객 유형</Text>
          <View style={styles.selectArea}>
            <TouchableOpacity
              style={[styles.selectBox, userInfo.type == '디자이너' && styles.active]}>
              <Text style={[styles.selectText, userInfo.type == '디자이너' && styles.active]}>
                디자이너
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.selectBox, userInfo.type == '일반 사용자' && styles.active]}>
              <Text style={[styles.selectText, userInfo.type == '일반 사용자' && styles.active]}>
                일반 사용자
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputForm}>
          <Text style={styles.inputLabel}>닉네임</Text>
          <View style={styles.inputArea}>
            <Text>{userInfo.name}</Text>
          </View>
        </View>
        <View style={styles.inputForm}>
          <Text style={styles.inputLabel}>이름</Text>
          <View style={styles.inputArea}>
            <Text>{userInfo.name}</Text>
          </View>
        </View>
        <View style={styles.inputForm}>
          <Text style={styles.inputLabel}>성별</Text>
          <View style={styles.selectArea}>
            <TouchableOpacity
              style={[styles.selectBox, userInfo.gender == '여성' && styles.active]}>
              <Text style={[styles.selectText, userInfo.gender == '여성' && styles.active]}>
                여성
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.selectBox, userInfo.gender == '남성' && styles.active]}>
              <Text style={[styles.selectText, userInfo.gender == '남성' && styles.active]}>
                남성
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputForm}>
          <Text style={styles.inputLabel}>생년월일</Text>
          <View style={styles.inputArea}>
            <Text>{userInfo.birth}</Text>
          </View>
        </View>
        <View style={styles.inputForm}>
          <Text style={styles.inputLabel}>선호 지역</Text>
          <View style={styles.inputArea}>
            <Text>{userInfo.address}</Text>
          </View>
        </View>
        <View style={styles.inputForm}>
          <Text style={styles.inputLabel}>이메일</Text>
          <View style={styles.inputArea}>
            <Text>{userInfo.email}</Text>
          </View>
        </View>
        <View style={styles.inputForm}>
          <Text style={styles.inputLabel}>핸드폰 번호</Text>
          <View style={styles.inputArea}>
            <Text>{userInfo.phoneNumber}</Text>
          </View>
        </View>
        <Button title="logout handler" onPress={logoutHandler} />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingLeft: wp(7),
    paddingRight: wp(7),
  },
  topArea: {
    paddingTop: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextArea: {
    justifyContent: 'center',
  },
  Text: {
    fontSize: wp(4),
  },
  formArea: {
    justifyContent: 'center',
    marginBottom: hp(-5),
  },
  imageArea: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(2),
  },
  logo: {
    width: wp(40),
    height: 100,
    resizeMode: 'contain',
  },
  profile: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  btnArea: {
    height: 50,
    justifyContent: 'center',
    margin: 40,
    alignItems: 'center',
  },
  btn: {
    width: '100%',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
  },
  inputForm: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputLabel: {
    width: '20%',
    fontWeight: 'bold',
  },
  inputArea: {
    borderWidth: 2,
    flex: 1,
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderColor: '#fff',
  },
  selectArea: {
    flexDirection: 'row',
  },
  selectBox: {
    borderWidth: 1,
    padding: 7,
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: '#e2e2e2',
  },
  active: {
    borderColor: 'black',
    fontWeight: 'bold',
    color: 'black',
  },
  selectText: {
    color: 'gray',
  },
});
export default MypageScreen;
