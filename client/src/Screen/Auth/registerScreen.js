import React, { useState, createRef } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import BidiStorage from '../../Lib/storage';
import { STORAGE_KEY } from '../../Lib/constant';

const RegisterScreen = ({ navigation, route }) => {
  const { profile } = route.params;
  const [userType, setUserType] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAddress, setUserAddress] = useState('');

  const typeInputRef = createRef();
  const nameInputRef = createRef();
  const emailInputRef = createRef();
  const addressInputRef = createRef();

  const handleSubmitButton = async () => {
    await fetch('http://127.0.0.1:3000' + '/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        type: userType,
        kakao_token: profile?.id,
        name: userName,
        email: userEmail,
        address: userAddress,
      }),
    })
      .then((response) => response.json())
      .then(async (result) => {
        await BidiStorage.storeData(STORAGE_KEY, result.data);
        navigation.replace('MainTab');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topArea}>
        <View style={styles.titleArea}>
          <Image
            source={require('../../../public/img/logo.png')}
            style={{ width: wp(40), resizeMode: 'contain' }}
          />
        </View>
        <View style={styles.TextArea}>
          <Text style={styles.Text}>Bidi 서비스를 이용하기 위해서</Text>
          <Text style={styles.Text}>간단한 개인정보를 추가로 등록해주세요!</Text>
        </View>
      </View>

      <View style={styles.formArea}>
        <TextInput
          style={styles.textFormTop}
          placeholder={'디자이너 / 유저'}
          onChangeText={(userType) => setUserType(userType)}
          ref={typeInputRef}
          returnKeyType="next"
        />
        <TextInput
          style={styles.textFormMiddle}
          placeholder={'이름'}
          onChangeText={(userName) => setUserName(userName)}
          ref={nameInputRef}
          returnKeyType="next"
        />
        <TextInput
          style={styles.textFormTop}
          placeholder={'이메일 주소'}
          onChangeText={(userEmail) => setUserEmail(userEmail)}
          ref={nameInputRef}
          returnKeyType="next"
        />
        <TextInput
          style={styles.textFormTop}
          placeholder={'주소'}
          onChangeText={(userAddress) => setUserAddress(userAddress)}
          ref={nameInputRef}
          returnKeyType="next"
        />
      </View>
      <View style={{ flex: 0.75 }}>
        <View style={styles.btnArea}>
          <TouchableOpacity style={styles.btn} onPress={handleSubmitButton}>
            <Text style={{ color: 'white', fontSize: wp('4%') }}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 3 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, //전체의 공간을 차지한다는 의미
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingLeft: wp(7),
    paddingRight: wp(7),
  },
  topArea: {
    flex: 1.5,
    paddingTop: wp(2),
  },
  titleArea: {
    flex: 0.7,
    justifyContent: 'center',
    paddingTop: wp(3),
  },
  TextArea: {
    flex: 0.3,
    justifyContent: 'center',
    paddingTop: hp(3),
  },
  Text: {
    fontSize: wp(4),
  },
  formArea: {
    flex: 4,
    justifyContent: 'center',
    marginBottom: hp(-5),
  },
  textFormTop: {
    borderWidth: 2,
    borderBottomWidth: 1,
    borderColor: 'black',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    width: '100%',
    height: hp(6),
    paddingLeft: 10,
    paddingRight: 10,
  },
  textFormMiddle: {
    borderWidth: 2,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'black',
    width: '100%',
    height: hp(6),
    paddingLeft: 10,
    paddingRight: 10,
  },
  btnArea: {
    height: hp(8),
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: hp(1.5),
  },
  btn: {
    flex: 1,
    width: '100%',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});

export default RegisterScreen;
