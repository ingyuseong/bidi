import React, { useState, createRef } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { getProfile as getKakaoProfile, login } from '@react-native-seoul/kakao-login';
import BidiStorage from '../../Lib/storage';
import { STORAGE_KEY } from '../../Lib/constant';

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
    <View style={styles.container}>
      <View style={styles.topArea}>
        <View style={styles.titleArea}>
          <Image
            source={require('../../../public/img/logo.png')}
            style={{ width: wp(50), resizeMode: 'contain' }}
          />
        </View>
      </View>
      <View style={styles.btnArea}>
        <View style={styles.textArea}>
          <Text style={styles.text}>간단한 소셜 로그인을 통해</Text>
          <Text style={styles.text}>BiDi를 사용해보세요 ‍📘</Text>
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
    justifyContent: 'space-around',
    paddingLeft: wp(10),
    paddingRight: wp(10),
  },
  topArea: {
    flex: 3,
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
