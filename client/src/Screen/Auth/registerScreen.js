import React, { useState, createRef } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { StyleSheet, View, Text, Button, Image, TouchableOpacity, TextInput } from 'react-native';
import BidiStorage from '../../Lib/storage';
import { STORAGE_KEY } from '../../Lib/constant';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { ScrollView } from 'react-native-gesture-handler';

const RegisterScreen = ({ navigation, route }) => {
  const { profile } = route.params;
  const userKakaoToken = profile.id;
  const [userType, setUserType] = useState('');
  const [userName, setUserName] = useState('');
  const [userGender, setUserGender] = useState('');
  const [userBirth, setUserBirth] = useState('');
  const [userNickName, setUserNickName] = useState('');
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [photo, setPhoto] = useState(null);

  const typeInputRef = createRef();
  const nickNameInputRef = createRef();
  const nameInputRef = createRef();
  const birthInputRef = createRef();
  const phoneNumberInputRef = createRef();
  const emailInputRef = createRef();
  const addressInputRef = createRef();

  const createFormData = (photo, body) => {
    const data = new FormData();

    data.append('userImage', {
      name: userNickName,
      type: photo.type,
      uri: photo.uri.replace('file://', ''),
    });

    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });

    return data;
  };

  const handleSubmitButton = async () => {
    await fetch('http://127.0.0.1:3000' + '/api/user/register', {
      method: 'POST',
      headers: {
        'content-type': 'multipart/form-data',
      },
      body: createFormData(photo, {
        userType,
        userName,
        userGender,
        userBirth,
        userNickName,
        userPhoneNumber,
        userEmail,
        userAddress,
        userKakaoToken,
      }),
    })
      .then((response) => response.json())
      .then(async (result) => {
        await BidiStorage.storeData(STORAGE_KEY, { id: result.data });
        navigation.replace('MainTab');
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleChoosePhoto = () => {
    launchImageLibrary({ noData: true }, (response) => {
      if (response) {
        setPhoto(response.assets[0]);
      }
    });
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.topArea}>
        <Image source={require('../../../public/img/logo.png')} style={styles.logo} />
        <View style={styles.TextArea}>
          <Text style={styles.Text}>Bidi 서비스를 이용하기 위해서</Text>
          <Text style={styles.Text}>간단한 개인정보를 추가로 등록해주세요!</Text>
        </View>
      </View>

      <View style={styles.formArea}>
        <View style={styles.imageArea}>
          {photo ? (
            <Image source={{ uri: photo.uri }} style={styles.profile} />
          ) : (
            <Image source={require('../../../public/img/profile.png')} style={styles.profile} />
          )}
        </View>

        <Button title="Choose Photo" onPress={handleChoosePhoto} />

        <View style={styles.inputForm}>
          <Text style={styles.inputLabel}>고객 유형</Text>
          <View style={styles.selectArea}>
            <TouchableOpacity
              style={[styles.selectBox, userType == '디자이너' && styles.active]}
              onPress={() => setUserType('디자이너')}>
              <Text style={[styles.selectText, userType == '디자이너' && styles.active]}>
                디자이너
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.selectBox, userType == '일반 사용자' && styles.active]}
              onPress={() => setUserType('일반 사용자')}>
              <Text style={[styles.selectText, userType == '일반 사용자' && styles.active]}>
                일반 사용자
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputForm}>
          <Text style={styles.inputLabel}>닉네임</Text>
          <TextInput
            style={styles.inputArea}
            placeholder={'하늘다람쥐'}
            placeholderTextColor="gray"
            onChangeText={(input) => setUserNickName(input)}
            ref={nickNameInputRef}
            returnKeyType="next"
          />
        </View>
        <View style={styles.inputForm}>
          <Text style={styles.inputLabel}>이름</Text>
          <TextInput
            style={styles.inputArea}
            placeholder={'김수현'}
            placeholderTextColor="gray"
            onChangeText={(input) => setUserName(input)}
            ref={nameInputRef}
            returnKeyType="next"
          />
        </View>
        <View style={styles.inputForm}>
          <Text style={styles.inputLabel}>성별</Text>
          <View style={styles.selectArea}>
            <TouchableOpacity
              style={[styles.selectBox, userGender == '여성' && styles.active]}
              onPress={() => setUserGender('여성')}>
              <Text style={[styles.selectText, userGender == '여성' && styles.active]}>여성</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.selectBox, userGender == '남성' && styles.active]}
              onPress={() => setUserGender('남성')}>
              <Text style={[styles.selectText, userGender == '남성' && styles.active]}>남성</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputForm}>
          <Text style={styles.inputLabel}>생년월일</Text>
          <TextInput
            style={styles.inputArea}
            placeholder={'2000년 5월 4일'}
            placeholderTextColor="gray"
            onChangeText={(input) => setUserBirth(input)}
            ref={birthInputRef}
            returnKeyType="next"
          />
        </View>
        <View style={styles.inputForm}>
          <Text style={styles.inputLabel}>선호 지역</Text>
          <TextInput
            style={styles.inputArea}
            placeholder={'서울특별시 성북구 안암동'}
            placeholderTextColor="gray"
            onChangeText={(input) => setUserAddress(input)}
            ref={addressInputRef}
            returnKeyType="next"
          />
        </View>
        <View style={styles.inputForm}>
          <Text style={styles.inputLabel}>이메일</Text>
          <TextInput
            style={styles.inputArea}
            placeholder={'123456@gmail.com'}
            placeholderTextColor="gray"
            onChangeText={(input) => setUserEmail(input)}
            ref={emailInputRef}
            returnKeyType="next"
          />
        </View>
        <View style={styles.inputForm}>
          <Text style={styles.inputLabel}>핸드폰 번호</Text>
          <TextInput
            style={styles.inputArea}
            placeholder={'010-1234-5678'}
            placeholderTextColor="gray"
            onChangeText={(input) => setUserPhoneNumber(input)}
            ref={phoneNumberInputRef}
            returnKeyType="next"
          />
        </View>
      </View>
      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.btn} onPress={handleSubmitButton}>
          <Text style={{ color: 'white', fontSize: wp('4%') }}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

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

export default RegisterScreen;
