import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import UserAPI from '../../../Api/user';
import { getUser } from '../../../Contexts/User/action';
import BidiStorage from '../../../Lib/storage';
import Line from '../../../Components/Common/line';
import { APP_VERSION, STORAGE_KEY } from '../../../Lib/constant';

function MyPageScreen({ navigation }) {
  const dispatch = useDispatch();
  const { data: userInfo } = useSelector((state) => state.user);

  const editHandler = () => {
    navigation.push('EditMypage');
  };

  const logoutHandler = async () => {
    await BidiStorage.clearData();
    navigation.reset({ routes: [{ name: 'Landing' }] });
  };
  const withdrawalHandler = async () => {
    const response = await UserAPI.deleteUser(userInfo.id);
    if (response) {
      Alert.alert('회원탈퇴가 완료되었습니다!');
      await BidiStorage.clearData();
      navigation.reset({ routes: [{ name: 'Landing' }] });
    }
  };

  // todo
  useEffect(() => {
    async function FetchMode() {
      const { token } = await BidiStorage.getData(STORAGE_KEY);
      const user = await UserAPI.checkToken(token);
      await dispatch(getUser(user));
    }
    FetchMode();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileBox}>
        <View style={styles.profileArea}>
          <Image source={{ uri: userInfo.img_src }} style={styles.profileImage} />
        </View>
        <View style={styles.infoArea}>
          <View style={styles.nameArea}>
            <Text style={styles.nameText}>{userInfo.nick_name}</Text>
            <TouchableOpacity style={styles.editBtn} onPress={editHandler}>
              <Text style={styles.editBtnText}>프로필 수정</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.nickNameArea}>
            <Text>디자이너</Text>
          </View>
        </View>
      </View>

      <Line />
      <View style={styles.matchingBox}>
        <Text style={styles.matchingText}>매칭 진행사항</Text>
        <View style={styles.matchingArea}>
          <View style={styles.matchingItem}>
            <View style={styles.iconArea}>
              <Icon name="pencil" size={30} style={styles.icon} />
            </View>
            <Text style={styles.itemText}>비드 작성</Text>
            <View style={styles.itemArea}>
              <Text>0</Text>
              <Text>건</Text>
            </View>
          </View>
          <View style={styles.matchingItem}>
            <View style={styles.iconArea}>
              <Icon name="send-o" size={30} style={styles.icon} />
            </View>
            <Text style={styles.itemText}>매칭 중</Text>
            <View style={styles.itemArea}>
              <Text>0</Text>
              <Text>건</Text>
            </View>
          </View>
          <View style={styles.matchingItem}>
            <View style={styles.iconArea}>
              <Icon name="scissors" size={30} style={styles.icon} />
            </View>
            <Text style={styles.itemText}>매칭 완료</Text>
            <View style={styles.itemArea}>
              <Text>0</Text>
              <Text>건</Text>
            </View>
          </View>
        </View>
      </View>
      <Line />
      <View style={styles.settingBox}>
        <TouchableOpacity>
          <View style={styles.settingArea}>
            <Text style={styles.settingText}>디자이너 인증하기</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ScheduleInfo')}>
          <View style={styles.settingArea}>
            <Text style={styles.settingText}>시술 스케줄 관리</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Line />
      <View style={styles.settingBox}>
        <TouchableOpacity>
          <View style={styles.settingArea}>
            <Text style={styles.settingText}>공지사항</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.settingArea}>
            <Text style={styles.settingText}>앱 리뷰쓰기</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.settingArea}>
            <Text style={styles.settingText}>이용약관</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.settingArea}>
            <Text style={styles.settingText}>1:1 문의하기</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Line />
      <View style={styles.settingBox}>
        <TouchableOpacity onPress={logoutHandler}>
          <View style={styles.settingArea}>
            <Text style={styles.settingText}>로그아웃</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={withdrawalHandler}>
          <View style={styles.settingArea}>
            <Text style={styles.settingText}>회원 탈퇴</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.versionArea}>
        <Text style={styles.versionText}>{APP_VERSION}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileBox: {
    margin: 16,
    flexDirection: 'row',
  },
  profileArea: {
    marginRight: 16,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 50,
  },
  infoArea: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  nameArea: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  editBtn: {
    borderWidth: 1,
    borderColor: '#e2e2e2',
    padding: 5,
    alignItems: 'center',
    width: 90,
    marginLeft: 16,
  },
  editBtnText: {
    color: 'gray',
  },
  settingBox: {
    flexDirection: 'column',
  },
  settingArea: {
    height: 50,
    justifyContent: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DBDBDB',
  },
  settingText: {
    color: '#111111',
  },
  versionArea: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  versionText: {
    color: '#878787',
  },
  matchingBox: {
    margin: 16,
  },
  matchingText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  matchingArea: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  iconArea: {
    backgroundColor: '#e2e2e2',
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#f4f4f4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  matchingItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    color: '#878787',
  },
  itemArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
});

export default MyPageScreen;
