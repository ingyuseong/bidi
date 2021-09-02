import React, { useState, createRef } from 'react';
import { registerUser } from '../../Contexts/User';
import { createFormData } from '../../Lib/utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import BidiStorage from '../../Lib/storage';
import { STORAGE_KEY } from '../../Lib/constant';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import Loading from '../../Components/Common/loading';

// Redux
import UserAPI from '../../Api/user';
import { useDispatch } from 'react-redux';
import { getUser } from '../../Contexts/User/action';

const RegisterScreen = ({ navigation, route }) => {
  const { profile } = route.params;
  const userKakaoToken = profile.id;
  const [userType, setUserType] = useState('');
  const [userGenderType, setUserGenderType] = useState('');
  const [userNickName, setUserNickName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const typeInputRef = createRef();
  const nickNameInputRef = createRef();

  const dispatch = useDispatch();
  const handleSubmitButton = async () => {
    if (photo) {
      const bodyData = createFormData(photo, {
        user_type: userType,
        name: profile.nickname,
        nick_name: userNickName,
        birth: profile.birthday,
        phone_number: profile.phoneNumber,
        gender_type: userGenderType,
        kakao_token: userKakaoToken,
      });
      setLoading(true);
      const response = await UserAPI.registerUser(bodyData);
      if (response) {
        setLoading(false);
        const { naver_token, kakao_token, apple_token } = response;
        dispatch(registerUser(response));
        // 1. API 호출
        const user = await UserAPI.registerUser(bodyData);
        if (user) {
          // 2. User 생성 성공시 AsyncStorage에는 토큰, Redux에는 유저 정보를 저장
          const { naver_token, kakao_token, apple_token } = user;
          await BidiStorage.storeData(STORAGE_KEY, {
            token: naver_token || kakao_token || apple_token,
          });
          await dispatch(getUser(user));
          Alert.alert('회원가입이 정상적으로 완료되었습니다!');
          navigation.replace('MainTab');
        }
      } else {
        Alert.alert('사진을 등록해주세요!');
      }
    }
  };
  const handleChoosePhoto = () => {
    launchImageLibrary({ nodata: true }, (response) => {
      if (response.didCancel) {
        Alert.alert('프로필 이미지는 꼭 선택해주세요!');
      } else {
        setPhoto(response.assets[0]);
      }
    });
  };
  if (loading) {
    return <Loading loading />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.topArea}>
        <Image source={require('../../../public/img/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.imageArea}>
        <View style={styles.profile}>
          {photo ? (
            <Image source={{ uri: photo.uri }} style={styles.profileImage} />
          ) : (
            <Image
              source={require('../../../public/img/profile.png')}
              style={styles.profileImage}
            />
          )}
          <View style={styles.cameraIconArea}>
            <TouchableOpacity onPress={handleChoosePhoto}>
              <Icon name="camerao" size={25} style={styles.cameraIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.formArea}>
        <View style={styles.inputForm}>
          <Text style={styles.inputLabel}>고객 유형</Text>
          <View style={styles.selectArea}>
            <TouchableOpacity
              style={[styles.selectBox, userType == 'designer' && styles.active]}
              onPress={() => setUserType('designer')}>
              <Text style={[styles.selectText, userType == 'designer' && styles.active]}>
                디자이너
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.selectBox, userType == 'customer' && styles.active]}
              onPress={() => setUserType('customer')}>
              <Text style={[styles.selectText, userType == 'customer' && styles.active]}>
                일반 사용자
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputForm}>
          <Text style={styles.inputLabel}>성별</Text>
          <View style={styles.selectArea}>
            <TouchableOpacity
              style={[styles.selectBox, userGenderType == 'female' && styles.active]}
              onPress={() => setUserGenderType('female')}>
              <Text style={[styles.selectText, userGenderType == 'female' && styles.active]}>
                여성
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.selectBox, userGenderType == 'male' && styles.active]}
              onPress={() => setUserGenderType('male')}>
              <Text style={[styles.selectText, userGenderType == 'male' && styles.active]}>
                남성
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
        {/* <View style={styles.inputForm}>
          <Text style={styles.inputLabel}>이름</Text>
          <TextInput
            style={styles.inputArea}
            placeholder={'김수현'}
            placeholderTextColor="gray"
            onChangeText={(input) => setUserName(input)}
            ref={nameInputRef}
            returnKeyType="next"
          />
        </View> */}

        {/* <View style={styles.inputForm}>
          <Text style={styles.inputLabel}>생년월일</Text>
          <TextInput
            style={styles.inputArea}
            placeholder={'2000년 5월 4일'}
            placeholderTextColor="gray"
            onChangeText={(input) => setUserBirth(input)}
            ref={birthInputRef}
            returnKeyType="next"
          />
        </View> */}
      </View>

      <TouchableOpacity onPress={handleSubmitButton} style={styles.btnArea}>
        <Text style={{ color: 'white', fontSize: wp('4%'), fontWeight: '700' }}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    flex: 1,
    marginTop: 30,
    paddingLeft: wp(7),
    paddingRight: wp(7),
  },
  imageArea: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(2),
    marginBottom: 30,
  },
  cameraIconArea: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 100,
    backgroundColor: 'black',
    position: 'absolute',
    bottom: -5,
    right: 0,
  },
  cameraIcon: {
    color: 'white',
    padding: 5,
  },
  logo: {
    width: wp(40),
    height: 70,
    resizeMode: 'contain',
  },
  profile: {
    width: 130,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderColor: 'rgb(243,243,243)',
    borderWidth: 1,
    borderRadius: 100,
  },
  btnArea: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    height: 70,
    width: '100%',
    backgroundColor: 'black',
  },
  inputForm: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
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
