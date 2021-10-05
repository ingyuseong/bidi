import React, { useState, createRef } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import { ImageBackground, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { getProfile as getKakaoProfile, login } from '@react-native-seoul/kakao-login';
import BidiStorage from '../../Lib/storage';
import { STORAGE_KEY } from '../../Lib/constant';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { appleAuth } from '@invertase/react-native-apple-authentication';

import { useDispatch } from 'react-redux';
import { getUser } from '../../Contexts/User/action';
import UserAPI from '../../Api/user';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const kakaoLoginHandler = async () => {
    try {
      if (token) {
        const user = await UserAPI.checkToken(token);
        if (user) {
          // token이 이미 server에 저장되어 있는 경우(회원가입 완료)
          // 1. token 만을 asyncStorage에 저장하여 추후 자동로그인
          const { naver_token, kakao_token, apple_token } = user;
          await BidiStorage.storeData(STORAGE_KEY, {
            token: naver_token || kakao_token || apple_token,
          });

          // 2. user 정보를 redux에 저장하여 관리
          await dispatch(getUser(user));

          // 3. MainTab으로 이동
          navigation.replace('MainTab');
        } else {
          // token이 없는 경우(회원가입 필요)
          navigation.replace('Register', {
            type: 'kakao',
            token,
            name,
            birthDay,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
    const { id: token, nickname: name, birthDay } = await getKakaoProfile();
  };
  const appleLoginHandler = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );
      if (credentialState === appleAuth.State.AUTHORIZED) {
        let { identityToken: token } = appleAuthRequestResponse;
        token = token.substring(0, 10);
        if (token) {
          const user = await UserAPI.checkToken(token);
          console.log('user', user);
          if (user) {
            const { naver_token, kakao_token, apple_token } = user;
            await BidiStorage.storeData(STORAGE_KEY, {
              token: naver_token || kakao_token || apple_token,
            });
            await dispatch(getUser(user));
            navigation.replace('MainTab');
          } else {
            navigation.replace('Register', {
              type: 'apple',
              name: '',
              token,
            });
          }
        }
      }
    } catch (error) {
      if (error.code === appleAuth.Error.CANCELED) {
        console.log('error1');
        // login canceled
      } else {
        // login error
        console.log('error12', error);
      }
    }
  };

  const naverLoginHandler = async () => {
    const token = '12341234';
    const user = await UserAPI.checkToken(token);
    await BidiStorage.storeData(STORAGE_KEY, {
      token,
    });
    await dispatch(getUser(user));
    navigation.replace('MainTab');
  };
  // const token = '1806772812'
  // await BidiStorage.storeData(STORAGE_KEY, {
  //   id: 5,
  //   type: '일반 사용자',
  //   token,
  //   nick_name: '쭈빈',
  //   name: '이주빈',
  //   gender: 'female',
  //   address: '서울특별시 성북구 안암동',
  //   img_src: 'https://bidi-s3.s3.ap-northeast-2.amazonaws.com/image/profiles/65d7f922-75791049-4cf6fc7f',
  //   ai_status: 'using',
  // });

  return (
    <ImageBackground
      source={require('../../../public/img/loginSplash.png')}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.topArea}>
          <View style={styles.textArea}>
            <Text style={styles.textLogo}>BiDi</Text>
            <Text style={styles.text}>나만의 새로운 헤어스타일 찾기, 비디</Text>
          </View>
        </View>
        <View style={styles.btnArea}>
          <TouchableOpacity style={styles.naverBtn} onPress={naverLoginHandler}>
            <Text style={{ fontSize: 20, color: 'white', fontWeight: '900' }}>N</Text>
            <Text style={styles.btnNaverText}>네이버 아이디로 로그인</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.kakaoBtn} onPress={kakaoLoginHandler}>
            <Ionicons name="md-chatbubble-sharp" size={20} />
            <Text style={styles.btnKakaoText}>카카오 아이디로 로그인</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.appleBtn} onPress={appleLoginHandler}>
            <AntDesign name="apple1" size={20} />
            <Text style={styles.btnAppleText}>Sign in with Apple</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-around',
    paddingLeft: wp(10),
    paddingRight: wp(10),
    backgroundColor: '#FF533A',
    opacity: 0.9,
  },
  topArea: {
    marginTop: 100,
  },
  titleArea: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: wp(3),
  },
  textArea: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLogo: {
    fontSize: 60,
    fontWeight: '800',
    letterSpacing: 2,
    color: 'white',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  btnArea: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  naverBtn: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2DB400',
    marginBottom: 10,
  },
  kakaoBtn: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEE500',
    marginBottom: 10,
  },
  appleBtn: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  btnAppleText: {
    marginLeft: 10,
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  btnKakaoText: {
    marginLeft: 10,
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  btnNaverText: {
    marginLeft: 10,
    color: 'white',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
});
export default LoginScreen;
