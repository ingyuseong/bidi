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
import Icon from 'react-native-vector-icons/Ionicons';

const LoginScreen = ({ navigation }) => {
  const [user, setUser] = useState('');

  const kakaoLoginHandler = async () => {
    const token = await login();
    const profile = await getKakaoProfile();
    await checkUser(profile);
  };

  const naverLoginHandler = async () => {
    const token = '1234';
    await BidiStorage.storeData(STORAGE_KEY, {
      id: 2,
      type: '디자이너',
      token,
      nick_name: '수현',
      name: '김수현',
      gender: 'male',
      address: '서울특별시 강북구 미아동',
      img_src: 'https://bidi-s3.s3.ap-northeast-2.amazonaws.com/test/profile_designer.png',
      ai_status: 'wait',
    });
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

  const checkUser = async (profile) => {
    await fetch('http://127.0.0.1:3000' + '/api/user/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        token: profile.id,
      }),
    })
      .then((response) => response.json())
      .then(async ({ data }) => {
        if (data) {
          const { id, type, kakao_token, nick_name, name, gender, address, img_src, ai_status } =
            data;
          await BidiStorage.storeData(STORAGE_KEY, {
            id,
            type,
            token: kakao_token,
            nick_name,
            name,
            gender,
            address,
            img_src,
            ai_status,
          });
          navigation.replace('MainTab');
        }
        navigation.replace('Register', {
          profile,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
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
            <Icon name="md-chatbubble-sharp" size={20} />
            <Text style={styles.btnKakaoText}>카카오 아이디로 로그인</Text>
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
