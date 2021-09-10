import React, { useState, useEffect, createRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Text, TextInput, View, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

import UserAPI from '../../../Api/user';
import { getUser } from '../../../Contexts/User';
import BidiStorage from '../../../Lib/storage';
import { STORAGE_KEY } from '../../../Lib/constant';
import { createFormData } from '../../../Lib/utils';

function DetailMypageScreen({ navigation }) {
  const dispatch = useDispatch();
  const { data: userInfo } = useSelector((state) => state.user);

  const [userImage, setUserImage] = useState(userInfo.img_src);
  const [userNickName, setUserNickName] = useState(userInfo.nick_name);
  const [userGenderType, setUserGenderType] = useState(userInfo.gender_type);
  const [userPhoneNumber, setUserPhoneNumber] = useState(userInfo.phone_number);

  const nickNameInputRef = createRef();
  const addressInputRef = createRef();

  const handleChoosePhoto = () => {
    launchImageLibrary({ nodata: true }, (response) => {
      if (response.didCancel) {
        return Alert.alert('선택을 취소하였습니다');
      } else {
        setUserImage(response.assets[0]);
      }
    });
  };

  const editAler = (id) => {
    Alert.alert('프로필 정보를 수정하시겠습니까?', '', [
      { text: '취소', style: 'cancel' },
      {
        text: '수정하기',
        onPress: () => {
          editHandler();
        },
      },
    ]);
  };

  const editHandler = async () => {
    if (!userImage) {
      return Alert.alert('프로필 사진을 등록해주세요!');
    }
    if (!userNickName) {
      return Alert.alert('닉네임을 입력해주세요!');
    }
    const bodyData = createFormData(userImage, {
      user_id: userInfo.id,
      nick_name: userNickName,
      phone_number: userPhoneNumber,
      gender_type: userGenderType,
    });
    const response = await UserAPI.patchUser(userInfo.id, bodyData);
    if (response) {
      Alert.alert('스타일북 수정이 완료되었습니다!');

      const { token } = await BidiStorage.getData(STORAGE_KEY);
      const user = await UserAPI.checkToken(token);
      dispatch(getUser(user));
      navigation.push('Mypage');
    }
  };

  return (
    <View style={styles.formArea}>
      <View style={styles.headerContainer}>
        <View style={styles.imageArea}>
          <Image
            source={{ uri: userImage.uri ? userImage.uri : userImage }}
            style={styles.profile}
          />
          <TouchableOpacity style={styles.cameraIconArea} onPress={handleChoosePhoto}>
            <Icon name="camerao" size={30} style={styles.cameraIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputcontainer}>
        <View style={styles.inputForm}>
          <Text style={styles.inputLabel}>닉네임</Text>
          <TextInput
            style={styles.inputArea}
            value={userNickName}
            placeholder={userNickName}
            placeholderTextColor="gray"
            onChangeText={(input) => setUserNickName(input)}
            ref={nickNameInputRef}
            returnKeyType="next"
          />
        </View>

        <View style={styles.inputForm}>
          <Text style={styles.inputLabel}>이름</Text>
          <View style={styles.inputArea}>
            <Text style={{ color: '#878787' }}>{userInfo.name}</Text>
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
          <Text style={styles.inputLabel}>핸드폰 번호</Text>
          {userPhoneNumber ? (
            <View style={styles.inputArea}>
              <Text style={{ color: '#878787' }}>{userPhoneNumber}</Text>
            </View>
          ) : (
            <>
              <View style={styles.inputArea}>
                <Text style={{ color: '#878787' }}>미인증</Text>
              </View>
              <View style={styles.needAuthenticationArea}>
                <Text style={styles.needAuthenticationText}>인증하기</Text>
              </View>
            </>
          )}
        </View>
      </View>
      <TouchableOpacity activeOpacity={0.8} style={styles.submitBox} onPress={editAler}>
        <View style={styles.submitButton}>
          <Text style={styles.submitText}>수정하기</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 32,
    flex: 1,
  },
  imageArea: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 20,
  },
  countConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerRightContainer: {
    width: wp(55),
    marginLeft: 20,
  },
  inputcontainer: {
    flex: 2,
    marginLeft: 16,
    marginRight: 16,
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  flex: {
    flexDirection: 'row',
  },
  countArea: {
    alignItems: 'center',
    paddingRight: 20,
    borderRightWidth: 1,
    borderColor: '#ECEBEB',
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
    justifyContent: 'space-evenly',
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
    marginBottom: 16,
  },
  inputLabel: {
    marginRight: 16,
    width: '20%',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputArea: {
    borderWidth: 2,
    flex: 1,
    padding: 15,
    backgroundColor: '#F5F5F5',
    borderColor: '#fff',
    color: '#878787',
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
  editBtn: {
    borderWidth: 1,
    borderColor: '#e2e2e2',
    padding: 5,
    alignItems: 'center',
    width: 100,
  },
  editBtnText: {
    color: 'gray',
  },
  countText: {
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: hp(1),
  },
  countTitleText: {
    fontSize: 13,
    color: 'gray',
  },
  line: {
    borderWidth: 5,
    borderColor: '#e2e2e2',
    marginTop: hp(4),
    marginBottom: hp(4),
  },
  cameraIconArea: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 100,
    backgroundColor: 'black',
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  cameraIcon: {
    color: 'white',
    padding: 5,
  },
  editSubmitBtn: {
    backgroundColor: 'black',
  },
  editSubmitText: {
    color: 'white',
    textAlign: 'center',
    padding: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
  needAuthenticationArea: {
    borderWidth: 2,
    padding: 15,
    backgroundColor: '#0A0A32',
    borderColor: '#fff',
    marginLeft: 8,
  },
  needAuthenticationText: {
    color: '#FFFFFF',
  },
  submitBox: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 65,
  },
  submitButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#0A0A32',
    borderColor: '#ECEBEB',
    borderTopWidth: 1,
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '400',
  },
});
export default DetailMypageScreen;
