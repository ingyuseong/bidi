import React, { useState, useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import BidiStorage from '../Lib/storage';
import { STORAGE_KEY } from '../Lib/constant';

function MypageScreen({}) {
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
  if (!userInfo) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading</Text>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{userInfo.name}</Text>
      <Text>{userInfo.address}</Text>
      <Text>{userInfo.email}</Text>
      <Text>{userInfo.kakao_token}</Text>
    </View>
  );
}

export default MypageScreen;
