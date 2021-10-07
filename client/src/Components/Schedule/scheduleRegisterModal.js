import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomButton from '../Common/bottomButton';

import ScheduleAPI from '../../Api/schedule';

function ScheduleRegisterModal({ navigation, setModalVisible, submitTime }) {
  // state
  const { data: user } = useSelector((state) => state.user);
  const [description, setDescription] = useState('');
  const timeFormating = (time) => {
    return {
      date: `${
        (time.getMonth() + 1).length == 2 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1)
      }월 ${time.getDate()}일`,
      time: `${time.getHours()}:${time.getMinutes() ? time.getMinutes() : '00'}`,
    };
  };
  const submitAlert = () => {
    Alert.alert('정말 등록하시겠어요?', '관리 기능은 준비중입니다!', [
      { text: '취소', style: 'cancel' },
      { text: '등록하기', onPress: () => submit() },
    ]);
  };
  const submit = async () => {
    const body = {
      designer_id: user.id,
      schedule_type: 'schedule',
      description: description,
      time: submitTime,
    };
    const schdeule = await ScheduleAPI.registerSchedule(body);
    setModalVisible(false);
    navigation.navigate('MyPage');
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeBtnArea}>
        <Ionicons name="md-close" size={25} color="#8D8D8D" />
      </TouchableOpacity>
      <View style={styles.content}>
        <View style={styles.tagBox}>
          <View style={styles.nameTag}>
            <Text style={{ color: '#8D8D8D', fontWeight: 'bold' }}>날짜</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{timeFormating(submitTime).date}</Text>
          </View>
        </View>
        <View style={styles.tagBox}>
          <View style={styles.nameTag}>
            <Text style={{ color: '#8D8D8D', fontWeight: 'bold' }}>시간</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{timeFormating(submitTime).time}</Text>
          </View>
        </View>
        <View style={styles.tagBox}>
          <View style={styles.nameTag}>
            <Text style={{ color: '#8D8D8D', fontWeight: 'bold' }}>스케줄</Text>
          </View>
          <View style={styles.input}>
            <TextInput
              style={styles.tagText}
              onChangeText={setDescription}
              value={description}
              placeholder="스케줄 이름을 입력해 주세요!"></TextInput>
          </View>
        </View>
      </View>
      <View style={{ width: '90%', margin: 10, alignItems: 'flex-end' }}>
        <TouchableOpacity style={styles.button} onPress={() => submitAlert()}>
          <Text style={styles.buttonText}>등록하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '25%',
    backgroundColor: 'white',
    borderColor: '#e2e2e2',
    borderRadius: 20,
    shadowColor: 'rgb(17, 17, 17)',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 15,
  },
  closeBtnArea: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
  content: {
    marginTop: 40,
    marginLeft: 10,
  },
  textBox: {
    width: '100%',
    margin: 15,
    marginTop: 30,
    marginBottom: 5,
    zIndex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tagBox: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  nameTag: {
    marginTop: 10,
    marginRight: 5,
    width: 60,
    height: 25,
    justifyContent: 'center',
  },
  tag: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#e2e2e2',
    borderRadius: 2,
    marginTop: 10,
    // marginLeft: 12,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 170,
    paddingRight: 10,
    borderRadius: 2,
    marginTop: 10,
    // marginLeft: 12,
    height: 25,
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 30,
    borderRadius: 5,
    backgroundColor: '#0a0a32',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
});

export default ScheduleRegisterModal;
