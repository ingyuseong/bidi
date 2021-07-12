import React, { useState, createRef } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { getProfile as getKakaoProfile, login } from '@react-native-seoul/kakao-login';

const LoginScreen = ({ navigation }) => {
  const [user, setUser] = useState('');
  const kakaoLoginHandler = async () => {
    const token = await login();
    const profile = await getKakaoProfile();

    setUser({ ...user, token, profile });
    navigation.replace('Register', {
      token,
      profile,
    });
  };

  const naverLoginHandler = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.topArea}>
        <View style={styles.titleArea}>
          <Image
            source={require('../../../public/img/logo.png')}
            style={{ width: wp(30), resizeMode: 'contain' }}
          />
        </View>
      </View>
      <View style={styles.btnArea}>
        <View style={styles.textArea}>
          <Text style={styles.text}>간단한 소셜 로그인을 통해</Text>
          <Text style={styles.text}>biidi를 사용해보세요 ‍📘</Text>
        </View>
        <TouchableOpacity style={styles.kakaoBtn} onPress={kakaoLoginHandler}>
          <Text style={styles.btnKakaoText}>카카오 로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.naverBtn} onPress={naverLoginHandler}>
          <Text style={styles.btnNaverText}>네이버 로그인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingLeft: wp(7),
    paddingRight: wp(7),
  },
  topArea: {
    flex: 4,
    paddingTop: wp(2),
  },
  titleArea: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: wp(3),
  },
  textArea: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: wp('4%'),
    paddingBottom: wp('1%'),
  },
  btnArea: {
    flex: 4,
    height: hp(8),
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: hp(1.5),
  },
  kakaoBtn: {
    width: '100%',
    height: 50,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEE500',
    marginBottom: 20,
  },
  naverBtn: {
    width: '100%',
    height: 50,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2DB400',
  },
  btnKakaoText: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  btnNaverText: {
    color: 'white',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
});
export default LoginScreen;
