import React, { useState, useEffect, createRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, TextInput, View, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';

// Component
import RNPickerSelect from 'react-native-picker-select';
import { START_TIME_LIST, END_TIME_LIST } from '../../../../Lib/constant';

// API
import ScheduleInfoAPI from '../../../../Api/scheduleInfo';

function RegisterScheduleInfoScreen({ navigation }) {
  const dispatch = useDispatch();
  const { data: user } = useSelector((state) => state.user);
  const [SunStart, setSunStart] = useState('');
  const [SunEnd, setSunEnd] = useState('');
  const [MonStart, setMonStart] = useState('');
  const [MonEnd, setMonEnd] = useState('');
  const [TueStart, setTueStart] = useState('');
  const [TueEnd, setTueEnd] = useState('');
  const [WedStart, setWedStart] = useState('');
  const [WedEnd, setWedEnd] = useState('');
  const [ThuStart, setThuStart] = useState('');
  const [ThuEnd, setThuEnd] = useState('');
  const [FriStart, setFriStart] = useState('');
  const [FriEnd, setFriEnd] = useState('');
  const [SatStart, setSatStart] = useState('');
  const [SatEnd, setSatEnd] = useState('');
  const registerAlert = () => {
    Alert.alert('정말 등록 하시겠어요?', '시간을 정확히 입력했는지 다시 확인해보세요!', [
      { text: '취소', style: 'cancel' },
      { text: '등록하기', onPress: () => register() },
    ]);
  };
  const register = async () => {
    // 시간을 하나만 입력한 경우 필터링
    if (
      (SunStart && !SunEnd) ||
      (!SunStart && SunEnd) ||
      (MonStart && !MonEnd) ||
      (!MonStart && MonEnd) ||
      (TueStart && !TueEnd) ||
      (!TueStart && TueEnd) ||
      (WedStart && !WedEnd) ||
      (!WedStart && WedEnd) ||
      (ThuStart && !ThuEnd) ||
      (!ThuStart && ThuEnd) ||
      (FriStart && !FriEnd) ||
      (!FriStart && FriEnd) ||
      (SatStart && !SatEnd) ||
      (!SatStart && SatEnd)
    ) {
      Alert.alert(
        '휴무일을 정확히 설정해 주세요!',
        '휴무가 아닐경우, 시작시간 & 종료시간을 모두 입력하셔야 해요!',
      );
    } else {
      const scheduleInfo = {
        designer_id: user.id,
        sun: SunStart ? `${SunStart},${SunEnd}` : null,
        mon: MonStart ? `${MonStart},${MonEnd}` : null,
        tue: TueStart ? `${TueStart},${TueEnd}` : null,
        wed: WedStart ? `${WedStart},${WedEnd}` : null,
        thu: ThuStart ? `${ThuStart},${ThuEnd}` : null,
        fri: FriStart ? `${FriStart},${FriEnd}` : null,
        sat: SatStart ? `${SatStart},${SatEnd}` : null,
      };
      const result = await ScheduleInfoAPI.registerScheduleInfo(scheduleInfo);
      if (result) {
        navigation.reset({ routes: [{ name: 'MyPage' }] });
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.textBox}>
        <Text style={styles.title}>주간 시술 스케줄 설정하기</Text>
        <Text style={styles.subTitle}>설정하지 않으면 휴무일로 지정됩니다!</Text>
      </View>
      <View>
        <View style={styles.tagBox}>
          <View style={{ ...styles.dayTag, backgroundColor: '#FF533A' }}>
            <Text style={{ color: 'white' }}>일</Text>
          </View>
          <View style={styles.timeTag}>
            <Text style={{ color: '#8D8D8D' }}>시작시간:</Text>
          </View>
          <View style={styles.tag}>
            <RNPickerSelect
              onValueChange={(value) => setSunStart(value)}
              placeholder={{ label: '휴무' }}
              style={pickerSelectStyles}
              items={START_TIME_LIST}></RNPickerSelect>
          </View>
          <View style={styles.timeTag}>
            <Text style={{ color: '#8D8D8D' }}>종료시간:</Text>
          </View>
          <View style={styles.tag}>
            <RNPickerSelect
              onValueChange={(value) => setSunEnd(value)}
              placeholder={{ label: '휴무' }}
              style={pickerSelectStyles}
              items={END_TIME_LIST}></RNPickerSelect>
          </View>
        </View>
        <View style={styles.tagBox}>
          <View style={styles.dayTag}>
            <Text style={{ color: 'white' }}>월</Text>
          </View>
          <View style={styles.timeTag}>
            <Text style={{ color: '#8D8D8D' }}>시작시간:</Text>
          </View>
          <View style={styles.tag}>
            <RNPickerSelect
              onValueChange={(value) => setMonStart(value)}
              placeholder={{ label: '휴무' }}
              style={pickerSelectStyles}
              items={START_TIME_LIST}></RNPickerSelect>
          </View>
          <View style={styles.timeTag}>
            <Text style={{ color: '#8D8D8D' }}>종료시간:</Text>
          </View>
          <View style={styles.tag}>
            <RNPickerSelect
              onValueChange={(value) => setMonEnd(value)}
              placeholder={{ label: '휴무' }}
              style={pickerSelectStyles}
              items={END_TIME_LIST}></RNPickerSelect>
          </View>
        </View>
        <View style={styles.tagBox}>
          <View style={styles.dayTag}>
            <Text style={{ color: 'white' }}>화</Text>
          </View>
          <View style={styles.timeTag}>
            <Text style={{ color: '#8D8D8D' }}>시작시간:</Text>
          </View>
          <View style={styles.tag}>
            <RNPickerSelect
              onValueChange={(value) => setTueStart(value)}
              placeholder={{ label: '휴무' }}
              style={pickerSelectStyles}
              items={START_TIME_LIST}></RNPickerSelect>
          </View>
          <View style={styles.timeTag}>
            <Text style={{ color: '#8D8D8D' }}>종료시간:</Text>
          </View>
          <View style={styles.tag}>
            <RNPickerSelect
              onValueChange={(value) => setTueEnd(value)}
              placeholder={{ label: '휴무' }}
              style={pickerSelectStyles}
              items={END_TIME_LIST}></RNPickerSelect>
          </View>
        </View>
        <View style={styles.tagBox}>
          <View style={styles.dayTag}>
            <Text style={{ color: 'white' }}>수</Text>
          </View>
          <View style={styles.timeTag}>
            <Text style={{ color: '#8D8D8D' }}>시작시간:</Text>
          </View>
          <View style={styles.tag}>
            <RNPickerSelect
              onValueChange={(value) => setWedStart(value)}
              placeholder={{ label: '휴무' }}
              style={pickerSelectStyles}
              items={START_TIME_LIST}></RNPickerSelect>
          </View>
          <View style={styles.timeTag}>
            <Text style={{ color: '#8D8D8D' }}>종료시간:</Text>
          </View>
          <View style={styles.tag}>
            <RNPickerSelect
              onValueChange={(value) => setWedEnd(value)}
              placeholder={{ label: '휴무' }}
              style={pickerSelectStyles}
              items={END_TIME_LIST}></RNPickerSelect>
          </View>
        </View>
        <View style={styles.tagBox}>
          <View style={styles.dayTag}>
            <Text style={{ color: 'white' }}>목</Text>
          </View>
          <View style={styles.timeTag}>
            <Text style={{ color: '#8D8D8D' }}>시작시간:</Text>
          </View>
          <View style={styles.tag}>
            <RNPickerSelect
              onValueChange={(value) => setThuStart(value)}
              placeholder={{ label: '휴무' }}
              style={pickerSelectStyles}
              items={START_TIME_LIST}></RNPickerSelect>
          </View>
          <View style={styles.timeTag}>
            <Text style={{ color: '#8D8D8D' }}>종료시간:</Text>
          </View>
          <View style={styles.tag}>
            <RNPickerSelect
              onValueChange={(value) => setThuEnd(value)}
              placeholder={{ label: '휴무' }}
              style={pickerSelectStyles}
              items={END_TIME_LIST}></RNPickerSelect>
          </View>
        </View>
        <View style={styles.tagBox}>
          <View style={styles.dayTag}>
            <Text style={{ color: 'white' }}>금</Text>
          </View>
          <View style={styles.timeTag}>
            <Text style={{ color: '#8D8D8D' }}>시작시간:</Text>
          </View>
          <View style={styles.tag}>
            <RNPickerSelect
              onValueChange={(value) => setFriStart(value)}
              placeholder={{ label: '휴무' }}
              style={pickerSelectStyles}
              items={START_TIME_LIST}></RNPickerSelect>
          </View>
          <View style={styles.timeTag}>
            <Text style={{ color: '#8D8D8D' }}>종료시간:</Text>
          </View>
          <View style={styles.tag}>
            <RNPickerSelect
              onValueChange={(value) => setFriEnd(value)}
              placeholder={{ label: '휴무' }}
              style={pickerSelectStyles}
              items={END_TIME_LIST}></RNPickerSelect>
          </View>
        </View>
        <View style={styles.tagBox}>
          <View style={styles.dayTag}>
            <Text style={{ color: 'white' }}>토</Text>
          </View>
          <View style={styles.timeTag}>
            <Text style={{ color: '#8D8D8D' }}>시작시간:</Text>
          </View>
          <View style={styles.tag}>
            <RNPickerSelect
              onValueChange={(value) => setSatStart(value)}
              placeholder={{ label: '휴무' }}
              style={pickerSelectStyles}
              items={START_TIME_LIST}></RNPickerSelect>
          </View>
          <View style={styles.timeTag}>
            <Text style={{ color: '#8D8D8D' }}>종료시간:</Text>
          </View>
          <View style={styles.tag}>
            <RNPickerSelect
              onValueChange={(value) => setSatEnd(value)}
              placeholder={{ label: '휴무' }}
              style={pickerSelectStyles}
              items={END_TIME_LIST}></RNPickerSelect>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={registerAlert}>
        <Text style={styles.buttonText}>등록하기</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBox: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 13,
    marginTop: 10,
    color: '#8D8D8D',
  },
  tagBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#e2e2e2',
    borderRadius: 2,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayTag: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#0A0A32',
    borderRadius: 2,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeTag: {
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 2,
    marginTop: 10,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 55,
    borderRadius: 55,
    backgroundColor: '#0a0a32',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 50,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
    color: 'white',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    height: 30,
    width: 45,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000000',
  },
  inputAndroid: {
    fontSize: 14,
    height: 30,
    width: 45,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000000',
  },
});
export default RegisterScheduleInfoScreen;
