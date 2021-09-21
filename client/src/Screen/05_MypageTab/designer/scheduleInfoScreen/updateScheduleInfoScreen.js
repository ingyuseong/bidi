import React, { useState, useEffect, createRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, TextInput, View, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';

// Component
import RNPickerSelect from 'react-native-picker-select';
import { START_TIME_LIST, END_TIME_LIST } from '../../../../Lib/constant';

// API
import ScheduleInfoAPI from '../../../../Api/scheduleInfo';

function RegisterScheduleInfoScreen({ navigation, route }) {
  const { scheduleInfo } = route.params;
  const [SunStart, setSunStart] = useState(scheduleInfo.weeklySchedule[0].timeArray[0]);
  const [SunEnd, setSunEnd] = useState(scheduleInfo.weeklySchedule[0].timeArray[1]);
  const [MonStart, setMonStart] = useState(scheduleInfo.weeklySchedule[1].timeArray[0]);
  const [MonEnd, setMonEnd] = useState(scheduleInfo.weeklySchedule[1].timeArray[1]);
  const [TueStart, setTueStart] = useState(scheduleInfo.weeklySchedule[2].timeArray[0]);
  const [TueEnd, setTueEnd] = useState(scheduleInfo.weeklySchedule[2].timeArray[1]);
  const [WedStart, setWedStart] = useState(scheduleInfo.weeklySchedule[3].timeArray[0]);
  const [WedEnd, setWedEnd] = useState(scheduleInfo.weeklySchedule[3].timeArray[1]);
  const [ThuStart, setThuStart] = useState(scheduleInfo.weeklySchedule[4].timeArray[0]);
  const [ThuEnd, setThuEnd] = useState(scheduleInfo.weeklySchedule[4].timeArray[1]);
  const [FriStart, setFriStart] = useState(scheduleInfo.weeklySchedule[5].timeArray[0]);
  const [FriEnd, setFriEnd] = useState(scheduleInfo.weeklySchedule[5].timeArray[1]);
  const [SatStart, setSatStart] = useState(scheduleInfo.weeklySchedule[6].timeArray[0]);
  const [SatEnd, setSatEnd] = useState(scheduleInfo.weeklySchedule[6].timeArray[1]);
  const initialize = () => {
    setMonStart(null);
    setMonEnd(null);
    setTueStart(null);
    setTueEnd(null);
    setWedStart(null);
    setWedEnd(null);
    setThuStart(null);
    setThuEnd(null);
    setFriStart(null);
    setFriEnd(null);
    setSatStart(null);
    setSatEnd(null);
    setSunStart(null);
    setSunEnd(null);
  };
  const updateAlert = () => {
    Alert.alert('정말 업데이트 하시겠어요?', '예약은 계속해서 유지됩니다!', [
      { text: '취소', style: 'cancel' },
      { text: '업데이트', onPress: () => update() },
    ]);
  };
  const update = async () => {
    // 시간을 하나만 입력한 경우 필터링
    if (
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
      (!SatStart && SatEnd) ||
      (SunStart && !SunEnd) ||
      (!SunStart && SunEnd)
    ) {
      Alert.alert(
        '휴무일을 정확히 설정해 주세요!',
        '휴무가 아닐경우, 시작시간 & 종료시간을 모두 입력하셔야 해요!',
      );
    } else {
      const body = {
        mon: MonStart ? `${MonStart},${MonEnd}` : null,
        tue: TueStart ? `${TueStart},${TueEnd}` : null,
        wed: WedStart ? `${WedStart},${WedEnd}` : null,
        thu: ThuStart ? `${ThuStart},${ThuEnd}` : null,
        fri: FriStart ? `${FriStart},${FriEnd}` : null,
        sat: SatStart ? `${SatStart},${SatEnd}` : null,
        sun: SunStart ? `${SunStart},${SunEnd}` : null,
      };
      const result = await ScheduleInfoAPI.patchScheduleInfo(scheduleInfo.id, body);
      if (result) {
        navigation.reset({ routes: [{ name: 'MyPage' }] });
      } else {
        Alert.alert('내용을 업데이트 해주세요!');
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.textBox}>
        <Text style={styles.title}>주간 시술 스케줄 업데이트</Text>
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
              value={SunStart}
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
              value={SunEnd}
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
              value={MonStart}
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
              value={MonEnd}
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
              value={TueStart}
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
              value={TueEnd}
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
              value={WedStart}
              items={START_TIME_LIST}></RNPickerSelect>
          </View>
          <View style={styles.timeTag}>
            <Text style={{ color: '#8D8D8D' }}>종료시간:</Text>
          </View>
          <View style={styles.tag}>
            <RNPickerSelect
              onValueChange={(value) => setWedEnd(value)}
              placeholder={{ label: '휴무' }}
              value={WedEnd}
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
              value={ThuStart}
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
              value={ThuEnd}
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
              value={FriStart}
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
              value={FriEnd}
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
              value={SatStart}
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
              value={SatEnd}
              style={pickerSelectStyles}
              items={END_TIME_LIST}></RNPickerSelect>
          </View>
        </View>
      </View>
      <View style={styles.buttonBox}>
        <TouchableOpacity
          style={{ ...styles.button, backgroundColor: '#e2e2e2' }}
          onPress={initialize}>
          <Text style={{ ...styles.buttonText, color: '#8D8D8D' }}>초기화하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={updateAlert}>
          <Text style={styles.buttonText}>업데이트</Text>
        </TouchableOpacity>
      </View>
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
  buttonBox: {
    marginTop: 30,
    flexDirection: 'row',
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
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 10,
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
